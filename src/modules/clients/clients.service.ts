import { Clients, time_logs, type Prisma, type Projects } from "@prisma/client";
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
import { CreateProjectDto, UpdateProjectDto } from "@/dto/project.dto";
import { isDataURI } from "class-validator";
import { CreateClientDto, UpdateClientDto } from "@/dto/client.dto";

export default class ClientsService {
  //   public async getUser(
  //     data: Prisma.UsersWhereInput,
  //     select?: Prisma.UsersSelect
  //   ) {
  //     return await prisma.users.findFirst({
  //       where: data,
  //       select,
  //     });
  //   }

  public async getClients(id: string) {
    return await prisma.clients.findMany({
      where: {
        id: id,
      },
      include: { UserClients: true },
    });
  }

  public async createClient({ company_name, users_Id, clientId }) {
    try {
      return await prisma.clients.create({
        data: {
          company_name: company_name,
          users: {
            connect: {
              id: users_Id,
            },
          },
          UserClients: {
            create: { id: clientId },
          },
        },

        include: { UserClients: true },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while creating the user"
      );
    }
  }
  // @LogMessage<[Users]>({ message: "Work Experience added" })
  // public async addWorkExp({ user_id, position, company, date, short_desc }) {
  //   try {
  //     return await prisma.work_Experience.create({
  //       data: {
  //         position,
  //         company,
  //         date,
  //         short_desc,
  //         users: {
  //           connect: {
  //             id: user_id,
  //           },
  //         },
  //       },
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     throw new HttpInternalServerError(
  //       "An error occured while adding work experience"
  //     );
  //   }
  // }

  // public async getAdminInfo(data: Users) {
  //   return prisma.users.findFirst({
  //     where: {
  //       email_address: data.email_address,
  //     },
  //   });
  // }

  // public async getWorkExpPerUser(userid: string) {
  //   return await prisma.work_Experience.findMany({
  //     where: {
  //       user_id: userid,
  //     },
  //   });
  // }
  // public async getUsers(id: string) {
  //   return await prisma.users.findMany({
  //     where: {
  //       id: id,
  //       userType: {
  //         in: [UserTypeEnum.USER, UserTypeEnum.ADMIN],
  //       },
  //     },
  //     include: {
  //       work_experience: true,
  //       org_chart: true,
  //       time_logs: true,
  //       todo_list: true,
  //       UserProjects: true,
  //       clients: true,
  //       Notes: true,
  //     },
  //   });
  // }

  // public async updateWorkExp(id: string, data: UpdateWorkExpDto) {
  //   try {
  //     return await prisma.work_Experience.update({
  //       where: {
  //         id: id,
  //       },
  //       data: data,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     throw new HttpInternalServerError(
  //       "An error occured whilte updating user work experince"
  //     );
  //   }
  // }

  // public async deleteWorkExp(id: string, data: Work_Experience) {
  //   try {
  //     return await prisma.work_Experience.delete({
  //       where: {
  //         id,
  //       },
  //       select: { id: true },
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     throw new HttpInternalServerError(
  //       "An error occured while deleting user work experince"
  //     );
  //   }
  // }
  // public async login(data: LoginAdminDto) {
  //   console.log(data);
  //   try {
  //     const isExist = await prisma.users.findFirst({
  //       where: {
  //         email_address: {
  //           contains: data.email_address,
  //         },
  //         userType: {
  //           in: [UserTypeEnum.ADMIN, UserTypeEnum.USER],
  //         },
  //       },
  //       include: { work_experience: true },
  //     });

  //     if (!isExist) {
  //       throw new HttpNotFoundError("Invalid login");
  //     }

  //     const matchPassword = GeneratorProvider.validateHash(
  //       data.password,
  //       isExist.password!
  //     );

  //     if (!matchPassword) {
  //       throw new HttpNotFoundError("Invalid login");
  //     }

  //     let payload: JwtPayload;

  //     if (isExist.userType === UserTypeEnum.ADMIN) {
  //       // If user is an ADMIN
  //       payload = {
  //         id: isExist.id,
  //         email: isExist.email_address!,
  //         userType: isExist.userType,
  //       };
  //     } else if (isExist.userType === UserTypeEnum.USER) {
  //       // If user is not an ADMIN
  //       payload = {
  //         id: isExist.id,
  //         email: isExist.email_address!,
  //         userType: isExist.userType,
  //         // Add additional properties or customize as needed
  //       };
  //     }

  //     return {
  //       user: isExist,
  //       token: JwtUtil.generateToken(payload),
  //     };
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // }

  public async updateClient(
    id: string,
    users_Id: string,
    data: UpdateClientDto
  ) {
    try {
      return await prisma.clients.update({
        where: {
          id,
        },
        data: {
          UserClients: { update: { users_Id: users_Id } },
          company_name: data.company_name,
        },

        include: { UserClients: true },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while updating the user"
      );
    }
  }

  // public async getUserInterns() {
  //   return await prisma.users.findMany({
  //     where: {
  //       roleType: {
  //         equals: RoleTypeEnum.INTERN,
  //       },
  //     },
  //   });
  // }

  // public async getUserMentors() {
  //   return await prisma.users.findMany({
  //     where: {
  //       roleType: {
  //         equals: RoleTypeEnum.MENTOR,
  //       },
  //     },
  //   });
  // }

  // public async getUserById(id: string) {
  //   try {
  //     return await prisma.users.findFirst({
  //       where: { id: id },
  //       include: { work_experience: true },
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     throw new HttpInternalServerError(
  //       "An error occurred while retrieving the user by ID"
  //     );
  //   }
  // }

  // public async getUserByTeam(position: string) {
  //   try {
  //     return await prisma.users.findMany({
  //       where: {
  //         position: {
  //           equals: position,
  //         },
  //       },
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     throw new HttpInternalServerError(
  //       "An error occurred while retrieving the Users by Team"
  //     );
  //   }
  // }

  // public async forgotPassword(email_address: string) {
  //   try {
  //     const user = await prisma.users.findFirst({
  //       where: {
  //         email_address: email_address,
  //       },
  //     });

  //     if (!user) {
  //       throw new HttpNotFoundError("User not found");
  //     }

  //     const tempPassword = GeneratorProvider.generateRandomString();
  //     const hashedPassword = GeneratorProvider.generateHash(tempPassword);

  //     await prisma.users.update({
  //       where: {
  //         id: user.id,
  //       },
  //       data: {
  //         password: hashedPassword,
  //       },
  //     });

  //     await sendEmail(
  //       user.email_address,
  //       "Your temporary password",
  //       `Here is your temporary password: ${tempPassword}`
  //     );

  //     return { message: "Temporary password has been sent to your email." };
  //   } catch (error) {
  //     console.error(error);
  //     throw new HttpInternalServerError(
  //       "An error occurred while processing the forgot password request"
  //     );
  //   }
  // }

  // public async changeUserPassword(
  //   id: string,
  //   oldPassword: string,
  //   newPassword: string
  // ) {
  //   try {
  //     // Get the user
  //     const user = await prisma.users.findUnique({
  //       where: {
  //         id: id,
  //       },
  //     });

  //     // Check if the old password matches the current password
  //     if (!GeneratorProvider.validateHash(oldPassword, user.password)) {
  //       throw new HttpBadRequestError("Old password does not match", []);
  //     }

  //     if (oldPassword === newPassword) {
  //       throw new HttpBadRequestError(
  //         "New password cannot be the same as the old password",
  //         []
  //       );
  //     }

  //     // Update the password
  //     return await prisma.users.update({
  //       where: {
  //         id: id,
  //       },
  //       data: {
  //         password: GeneratorProvider.generateHash(newPassword),
  //       },
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     throw new HttpInternalServerError(
  //       "An error occurred while changing the password"
  //     );
  //   }
  // }
}
