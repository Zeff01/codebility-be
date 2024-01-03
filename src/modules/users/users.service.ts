import {
  type Prisma,
  UserTypeEnum,
  RoleTypeEnum,
  type Users,
  $Enums,
} from "@prisma/client";
import prisma from "@/lib/prisma";
import LogMessage from "@/decorators/log-message.decorator";
import { CreateUserDto, LoginAdminDto, UpdateUserDto } from "@/dto/user.dto";
import {
  HttpBadRequestError,
  HttpInternalServerError,
  HttpNotFoundError,
} from "@/lib/errors";
import { GeneratorProvider } from "@/lib/bcrypt";
import JwtUtil from "@/lib/jwt";
import { JwtPayload } from "@/types/common.type";

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
    console.log(data);
    return await prisma.users.create({
      data: {
        name: data.name,
        address: data.address,
        email_address: data.email_address,
        github_link: data.github_link,
        portfolio_website: data.portfolio_website,
        tech_stacks: [],
        password: GeneratorProvider.generateHash(data.password),
        schedule: [],
        position: [],
        roleType: RoleTypeEnum.MENTOR,
        userType: UserTypeEnum.ADMIN,
      },
    });
  }

  public async getAdminInfo(data: Users) {
    return prisma.users.findFirst({
      where: {
        email_address: data.email_address,
      },
    });
  }

  public async getUsers(data: Users) {
    return await prisma.users.findMany({
      where: {
        userType: {
          equals: "USER" || "ADMIN",
        },
      },
    });
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
  public async updateUser(data: Users) {
    const { id, ...updateData } = data;
    console.log(data);
    return await prisma.users.update({
      where: {
        id: id,
      },
      data: updateData,
    });
  }

  public async getUserInterns() {
    return await prisma.users.findMany({
      where: {
        roleType: {
          equals: "INTERN",
        },
      },
    });
  }

  public async getUserMentors() {
    return await prisma.users.findMany({
      where: {
        roleType: {
          equals: "MENTOR",
        },
      },
    });
  }

  public async getUserById(id: string) {
    return await prisma.users.findFirst({
      where: { id: id },
    });
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
