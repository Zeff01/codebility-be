import {
  type Prisma,
  UserTypeEnum,
  RoleTypeEnum,
  type Users,
  $Enums,
} from "@prisma/client";
import prisma from "@/lib/prisma";
import LogMessage from "@/decorators/log-message.decorator";
import {
  CreateUserDto,
  EmailDto,
  LoginAdminDto,
  UpdateUserDto,
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
  public async getUser(
    data: Prisma.UsersWhereInput,
    select?: Prisma.UsersSelect
  ) {
    return await prisma.users.findFirst({
      where: data,
      select,
    });
  }

  @LogMessage<[Users]>({ message: "User Created" })
  public async createUser(data: CreateUserDto) {
    try {
      return await prisma.users.create({
        data: {
          name: data.name,
          address: data.address,
          email_address: data.email_address,
          github_link: data.github_link,
          portfolio_website: data.portfolio_website,
          tech_stacks: data.tech_stacks,
          password: GeneratorProvider.generateHash(data.password),
          schedule: data.schedule,
          position: data.position,
          roleType: RoleTypeEnum.MENTOR,
          userType: UserTypeEnum.ADMIN,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while creating the user"
      );
    }
  }
  // @LogMessage<[Users]>({ message: "Work Experience added" })
  public async addWorkExp(data: WorkExpDto) {
    try {
      return await prisma.work_Experience.create({
        data: {
          user_id: data.user_id,
          position: data.position,
          company: data.company,
          date: data.date,
          short_desc: data.short_desc,
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

  public async getWorkExpPerUser(userid: string) {
    return await prisma.work_Experience.findMany({
      where: {
        user_id: userid,
      },
    });
  }
  public async getUsers(data: Users) {
    return await prisma.users.findMany({
      where: {
        userType: {
          in: ["USER", "ADMIN"],
        },
      },
    });
  }
  public async updateWorkExp(id: string, data: WorkExpDto) {
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

  public async deleteWorkExp(id: string) {
    try {
      return await prisma.work_Experience.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occured while deleting user work experince"
      );
    }
  }
  public async login(data: LoginAdminDto) {
    console.log(data);
    try {
      const isExist = await prisma.users.findFirst({
        where: {
          email_address: {
            contains: data.email_address,
          },
          userType: {
            in: [UserTypeEnum.ADMIN, UserTypeEnum.USER],
          },
        },
      });

      if (!isExist) {
        throw new HttpNotFoundError("Invalid login");
      }

      const matchPassword = GeneratorProvider.validateHash(
        data.password,
        isExist.password!
      );

      if (!matchPassword) {
        throw new HttpNotFoundError("Invalid login");
      }

      let payload: JwtPayload;

      if (isExist.userType === UserTypeEnum.ADMIN) {
        // If user is an ADMIN
        payload = {
          id: isExist.id,
          email: isExist.email_address!,
          userType: isExist.userType,
        };
      } else if (isExist.userType === UserTypeEnum.USER) {
        // If user is not an ADMIN
        payload = {
          id: isExist.id,
          email: isExist.email_address!,
          userType: isExist.userType,
          // Add additional properties or customize as needed
        };
      }

      return {
        user: isExist,
        token: JwtUtil.generateToken(payload),
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @LogMessage<[Users]>({ message: "User Updated" })
  public async updateUser(id: string, data: UpdateUserDto) {
    try {
      return await prisma.users.update({
        where: {
          id: id,
        },
        data: data,
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
        include: { work_experience: true },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while retrieving the user by ID"
      );
    }
  }

  public async getUserByTeam(position: string) {
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
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while changing the password"
      );
    }
  }
}
