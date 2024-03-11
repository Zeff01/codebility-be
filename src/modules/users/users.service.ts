import {
  type Prisma,
  UserTypeEnum,
  RoleTypeEnum,
  type Users,
  $Enums,
  Work_Experience,
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
    select?: Prisma.UsersSelect
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
          // schedule: data.schedule,
          position: data.position,
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
        Team Codebility`
      );
      return { user, message: "Sign-up confirmation has been sent to the email." };
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while creating the user"
      );
    }
  }
  // @LogMessage<[Users]>({ message: "Work Experience added" })
  public async addWorkExp({ user_id, position, company, date, short_desc }) {
    try {
      if (!user_id) {
        throw new HttpInternalServerError("user_id should not be empty");
      }

      const user = await prisma.users.findUnique({
        // Added 'await' here
        where: {
          id: user_id,
        },
      });

      if (!user?.id) {
        throw new HttpInternalServerError("user_id should not be empty");
      }

      return await prisma.work_Experience.create({
        data: {
          userWorkExpId: user.id,
          position,
          company,
          date,
          short_desc,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occured while adding work experience"
      );
    }
  }

  public async getAdminInfo(data: Users) {
    return prisma.users.findFirst({
      where: {
        email_address: data.email_address,
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
      // include: {
      //   time_logs: {
      //     select: { time_in: true, time_out:true },
      //   },
    });
  }

  public async updateWorkExp(id: string, data: UpdateWorkExpDto) {
    try {
      return await prisma.work_Experience.update({
        where: {
          id: id,
        },
        data: data,
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occured whilte updating user work experince"
      );
    }
  }

  public async deleteWorkExp(id: string, data: Work_Experience) {
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
        "An error occured while deleting user work experince"
      );
    }
  }

  public async login(data: LoginAdminDto) {
    try {
      // Find the user based on the provided email address and userType
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
        user.password
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
      const { ...updateData } = data;

      return await prisma.users.update({
        where: {
          id: id,
        },
        data: {
          ...updateData,
          updated_at: new Date(),
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while updating the user"
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
      return await prisma.users.findFirst({
        where: { id: id },
        include: {
          work_experience: true,
          org_chart: true,
          time_logs: true,
          todo_list: true,
          // projects: true,
          clients: true,
          notes: true,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while retrieving the user by ID"
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
        "An error occurred while retrieving the Users by Team"
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
        `Here is your temporary password: ${tempPassword}`
      );

      return { message: "Temporary password has been sent to your email." };
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while processing the forgot password request"
      );
    }
  }

  public async changeUserPassword(
    id: string,
    oldPassword: string,
    newPassword: string
  ) {
    try {
      // Get the user
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
            []
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
        "An error occurred while changing the password"
      );
    }
  }

  public async getuserbyusertypeapplicant() {
    try {
      // Get the user
      return await prisma.users.findMany({
        where: {
          userType: "APPLICANT",
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occured getting applicant user list"
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
        "An error occured getting applicant user by id"
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
        "An error occured while accepting applicant user by id"
      );
    }
  }
}
