import {
  type Prisma,
  UserTypeEnum,
  RoleTypeEnum,
  type Users,
  $Enums,
  Work_Experience,
  UserJobStatusTypeEnum,
} from "@prisma/client";
import prisma from "@/lib/prisma";
import LogMessage from "@/decorators/log-message.decorator";
import {
  AddWorkExpDto,
  CreateUserDto,
  EmailDto,
  LoginAdminDto,
  UpdateUserDto,
  UpdateWorkExpDto,
  UserJobStatusTypeExpDto,
  WorkExpDto,
} from "@/dto/user.dto";
import {
  HttpBadRequestError,
  HttpInternalServerError,
  HttpNotFoundError,
} from "@/lib/errors";
import { GeneratorProvider } from "@/lib/bcrypt";
import JwtUtil from "@/lib/jwt";
import { JwtPayload } from "@/types/common.type";
import { sendEmail } from "@/utils/mailer";

export default class UserService {
  private readonly DEFAULT_PRIO_SORT: number = 10;
  public async getUser(
    data: Prisma.UsersWhereInput,
    select?: Prisma.UsersSelect,
  ) {
    return await prisma.users.findFirst({
      where: data,
      select,
    });
  }

  public async createUser(data: CreateUserDto) {
    try {
      const user = await prisma.users.create({
        data: {
          name: data.name,
          address: data.address,
          email_address: data.email_address,
          github_link: data.github_link,
          portfolio_website: data.portfolio_website,
          tech_stacks: data.tech_stacks,
          password: GeneratorProvider.generateHash(data.password),
          position: data.position,
          start_time: data.start_time,
          end_time: data.end_time,
          roleType: RoleTypeEnum.MENTOR,
          prio: this.DEFAULT_PRIO_SORT,
          // userType: UserTypeEnum.ADMIN,
        },
      });
      await sendEmail(
        user.email_address,
        "Welcome to Codebility - Your Sign-up Confirmation",
        `Dear ${user.name},

        Thank you for signing up at Codebility! We're thrilled to have you join our community.
        
        Your account is now in the process of approval. Our team is reviewing your information to ensure a secure and positive experience for all members. This process usually takes a short amount of time, and you will receive another email once your account is approved.
        
        In the meantime, please explore our website (https://www.codebility.tech/ ) to learn more about what Codebility has to offer. Additionally, stay connected with us and be part of our community discussions by following our Facebook page at https://www.facebook.com/people/Codebility/61556597237211/ .
        
        Should you have any questions or need assistance, don't hesitate to reach out to our support team at codebility@gmail.com.
        
        We appreciate your patience and look forward to having you as an active member of the Codebility community.
        
        Thank you for choosing Codebility!
        
        Best regards,
        Team Codebility`,
      );
      return {
        user,
        message: "Sign-up confirmation has been sent to the email.",
      };
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while creating the user",
      );
    }
  }

  public async addWorkExp(data: AddWorkExpDto) {
    try {
      return await prisma.work_Experience.create({
        data: {
          userWorkExpId: data.userWorkExpId,
          position: data.position,
          company: data.company,
          dateFrom: data.dateFrom,
          dateTo: data.dateTo,
          location: data.location,
          task: data.task,
          short_desc: data.short_desc,
        },
        include: { userWorkExp: true },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occured while adding work experience",
      );
    }
  }

  public async getAdminInfo() {
    return prisma.users.findMany({
      where: {
        userType: {
          equals: UserTypeEnum.ADMIN,
        },
      },
    });
  }

  public async getWorkExpPerUser(id: string) {
    return await prisma.work_Experience.findMany({
      where: {
        userWorkExpId: id,
      },
    });
  }
  public async getAllUsers(id: string) {
    return await prisma.users.findMany({
      where: {
        id,
      },
      orderBy: {
        prio: "asc",
      },
    });
  }

  public async updateWorkExp(workExpId: string, data: UpdateWorkExpDto) {
    const { ...updateData } = data;
    try {
      return await prisma.work_Experience.update({
        where: {
          id: workExpId,
        },
        data: { ...updateData },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occured whilte updating user work experince",
      );
    }
  }

  public async deleteWorkExp(id: string) {
    try {
      return await prisma.work_Experience.delete({
        where: {
          id,
        },
        select: { id: true },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occured while deleting user work experince",
      );
    }
  }

  public async login(data: LoginAdminDto) {
    try {
      const user = await prisma.users.findFirst({
        where: {
          email_address: data.email_address,
          userType: {
            in: [UserTypeEnum.ADMIN, UserTypeEnum.USER],
          },
        },
      });

      // If no user is found, throw an error
      if (!user) {
        throw new HttpNotFoundError("Invalid login");
      }

      // Validate the password
      const isPasswordMatch = GeneratorProvider.validateHash(
        data.password,
        user.password,
      );

      // If the password doesn't match, throw an error
      if (!isPasswordMatch) {
        throw new HttpNotFoundError("Invalid login");
      }
      let payload: JwtPayload = {
        id: user.id,
        email: user.email_address!,
        userType: user.userType,
      };
      if (user.userType === UserTypeEnum.USER) {
      }
      const token = JwtUtil.generateToken(payload);
      return {
        user: user,
        token: token,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async updateUser(id: string, data: Users) {
    try {
      return await prisma.users.update({
        where: {
          id: id,
        },
        data: {
          name: data.name,
          pronoun: data.pronoun,
          image_url: data.image_url,
          address: data.address,
          phone_no: data.phone_no,
          github_link: data.github_link,
          fb_link: data.fb_link,
          linkedin_link: data.linkedin_link,
          whatsapp_link: data.whatsapp_link,
          skype_link: data.skype_link,
          telegram_link: data.telegram_link,
          portfolio_website: data.portfolio_website,
          tech_stacks: data.tech_stacks,
          about_me: data.about_me,
          education: data.education,
          position: data.position,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while updating the user",
      );
    }
  }

  public async getUserInterns() {
    return await prisma.users.findMany({
      where: {
        roleType: {
          equals: RoleTypeEnum.INTERN,
        },
      },
    });
  }

  public async getUserMentors() {
    return await prisma.users.findMany({
      where: {
        roleType: {
          equals: RoleTypeEnum.MENTOR,
        },
      },
    });
  }

  public async getUserById(id: string) {
    try {
      return await prisma.users.findUniqueOrThrow({
        where: { id: id },
        include: {
          Work_Experience: true,
          // org_chart: true,
          // time_logs: true,
          // todo_list: true,
          projects: true,
          // clients: true,
          // notes: true,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while retrieving the user by ID",
      );
    }
  }

  public async getUserByTeam(position: string[]) {
    try {
      return await prisma.users.findMany({
        where: {
          position: {
            equals: position,
          },
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while retrieving the Users by Team",
      );
    }
  }

  public async forgotPassword(email_address: string) {
    try {
      const user = await prisma.users.findFirst({
        where: {
          email_address: email_address,
        },
      });

      if (!user) {
        throw new HttpNotFoundError("User not found");
      }

      const tempPassword = GeneratorProvider.generateRandomString();
      const hashedPassword = GeneratorProvider.generateHash(tempPassword);

      await prisma.users.update({
        where: {
          id: user.id,
        },
        data: {
          password: hashedPassword,
        },
      });

      await sendEmail(
        user.email_address,
        "Your temporary password",
        `Here is your temporary password: ${tempPassword}`,
      );

      return { message: "Temporary password has been sent to your email." };
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while processing the forgot password request",
      );
    }
  }

  public async updateUserTypeApplicantToUser(email_address: string) {
    try {
      const user = await prisma.users.findFirst({
        where: {
          email_address: email_address,
        },
      });

      if (!user) {
        throw new HttpNotFoundError("User not found");
      }

      const tempPassword = GeneratorProvider.generateRandomString();
      const hashedPassword = GeneratorProvider.generateHash(tempPassword);

      await prisma.users.update({
        where: {
          id: user.id,
        },
        data: {
          password: hashedPassword,
          roleType: RoleTypeEnum.INTERN,
          userType: UserTypeEnum.USER,
        },
      });

      await sendEmail(
        user.email_address,
        "Congratulations! Your Codebility Account is Approved",
        `Dear ${user.name},

        We are excited to inform you that your Codebility account has been successfully approved! Welcome to our community.
        
        To get started, you can log in using the following link: https://www.codebility.tech/auth/signin
        
        Feel free to explore our platform, engage with the community, and take advantage of the resources available. For the latest updates, news, and community discussions, we invite you to follow our Facebook page at https://www.facebook.com/people/Codebility/61556597237211.
        
        If you have any questions or need assistance, our support team is here to help at codebility.dev@gmail.com.
        
        Thank you for choosing Codebility, and we look forward to seeing you online!
        
        Best regards,
        Team Codebility
        
        Here is your temporary password: ${tempPassword}`,
      );

      return {
        user,
        message: "Temporary password has been sent to your email.",
      };
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while processing the forgot password request",
      );
    }
  }

  public async changeUserPassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ) {
    try {
      const user = await prisma.users.findUnique({
        where: {
          id: id,
        },
      });
      if (user) {
        // Check if the old password matches the current password
        if (!GeneratorProvider.validateHash(oldPassword, user.password)) {
          throw new HttpBadRequestError("Old password does not match", []);
        }

        if (oldPassword === newPassword) {
          throw new HttpBadRequestError(
            "New password cannot be the same as the old password",
            [],
          );
        }

        // Update the password
        return await prisma.users.update({
          where: {
            id: id,
          },
          data: {
            password: GeneratorProvider.generateHash(newPassword),
          },
        });
      }
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while changing the password",
      );
    }
  }

  public async changeUserJobStatusType(data: UserJobStatusTypeExpDto) {
    try {
      const user = await prisma.users.findFirst({
        where: {
          id: data.id,
          userType: {
            in: [UserTypeEnum.ADMIN, UserTypeEnum.USER],
          },
        },
      });
      if (!user) {
        throw new HttpNotFoundError("User Type not valid");
      }

      return await prisma.users.update({
        where: {
          id: data.id,
        },
        data: {
          jobStatusType: UserJobStatusTypeEnum[data.jobStatusType],
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while changing the password",
      );
    }
  }

  public async getuserbyusertypeapplicant() {
    try {
      return await prisma.users.findMany({
        where: {
          userType: "APPLICANT",
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occured getting applicant user list",
      );
    }
  }

  public async getuserapplicantPerUser(id: string) {
    try {
      return await prisma.users.findUnique({
        where: {
          id: id,
          userType: "APPLICANT",
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occured getting applicant user by id",
      );
    }
  }

  public async updateuserapplicantPerUser(id, data) {
    try {
      // Get the user
      const user = await prisma.users.findUnique({
        where: {
          id: id,
          userType: "APPLICANT",
        },
      });

      if (!user || !user.email_address) {
        throw new HttpBadRequestError("user id not found", []);
      }

      // await prisma.users.update({
      //   where: {
      //     id: user.id,
      //   },
      //   data: {
      //     : data,D
      //   },
      // });

      this.forgotPassword(user.email_address);
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occured while accepting applicant user by id",
      );
    }
  }

  public async deleteUserByEmail(email_address: string) {
    try {
      return await prisma.users.delete({
        where: {
          email_address,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while updating the user",
      );
    }
  }

  public async denyUserTypeApplicantToUser(emailAddress: string) {
    try {
      const user = await prisma.users.findFirst({
        where: {
          email_address: emailAddress,
        },
      });

      if (!user) {
        throw new HttpNotFoundError("User not found");
      }

      await prisma.users.update({
        where: {
          id: user.id,
        },
        data: {
          userType: UserTypeEnum.DENIED,
        },
      });

      await sendEmail(
        user.email_address,
        "Codebility Account Registration - Application Denied",
        `Dear ${user.name},

        We regret to inform you that your application for a Codebility account has been denied. We appreciate your interest in joining our community.

Your data remains secure with us, and you have the option to request its deletion. If you would like to proceed with data deletion, please click the following link:

[Data Deletion Link]

By clicking the link above, you will be redirected to a secure page where you can confirm the deletion of your data. If you have any questions or concerns, please feel free to contact our support team at codebility@gmail.com.

For the latest updates, news, and community discussions, we invite you to follow our Facebook page at https://www.facebook.com/people/Codebility/61556597237211.

If you believe this decision is in error or would like more information about the denial, please don't hesitate to contact us. We're here to assist you.

Thank you for considering Codebility, and we wish you the best in your endeavors.

Best regards,
Team Codebility`,
      );

      return {
        user,
        message:
          "This applicant has been denied and a confirmation has been sent to their email.",
      };
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while processing the denied application request",
      );
    }
  }
}
