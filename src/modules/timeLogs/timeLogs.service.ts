import { type Prisma, type time_logs } from "@prisma/client";
import prisma from "@/lib/prisma";
import LogMessage from "@/decorators/log-message.decorator";

import { HttpInternalServerError, HttpNotFoundError } from "@/lib/errors";
import { GeneratorProvider } from "@/lib/bcrypt";
import { CreateTimeDto } from "@/dto/timeLogs.dto";
import { isUUID } from "class-validator";

export default class TimeLogsService {
  //   public async getTimeLogs(
  //     data: Prisma.time_logsWhereInput,
  //     select?: Prisma.time_logsSelect
  //   ) {
  //     return await prisma.time_logs.findFirst({
  //       where: data,
  //       select,
  //     });
  //   }

  public async getLogs(id: string) {
    return await prisma.time_logs.findFirst({
      where: {
        id,
      },
    });
  }

  public async createTimeIn(data: time_logs) {
    try {
      return await prisma.time_logs.create({
        data: {
          userTimeLogId: data.userTimeLogId,

          time_in: new Date(),
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occured while adding work experience",
      );
    }
  }

  public async createTimeOut(data: time_logs) {
    try {
      return await prisma.time_logs.create({
        data: {
          userTimeLogId: data.userTimeLogId,

          time_out: new Date(),
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occured while adding work experience",
      );
    }
  }

  public async getLogsByUserId(userTimeLogId: string) {
    const logs = await prisma.time_logs.findMany({
      where: { userTimeLogId },
    });
    return logs;
  }

  // public async getAdminInfo(data: Users) {
  //   return prisma.users.findFirst({
  //     where: {
  //       email_address: data.email_address,
  //     },
  //   });
  // }

  // public async getUsers(data: Users) {
  //   return await prisma.users.findMany({
  //     where: {
  //       userType: {
  //         equals: "USER" || "ADMIN",
  //       },
  //     },
  //   });
  // }

  // @LogMessage<[Users]>({ message: "User Updated" })
  // public async updateUser(data: Users) {
  //   const { id, ...updateData } = data;
  //   console.log(data);
  //   return await prisma.users.update({
  //     where: {
  //       id: id,
  //     },
  //     data: updateData,
  //   });
  // }

  // public async getUserInterns() {
  //   return await prisma.users.findMany({
  //     where: {
  //       roleType: {
  //         equals: "INTERN",
  //       },
  //     },
  //   });
  // }

  // public async getUserMentors() {
  //   return await prisma.users.findMany({
  //     where: {
  //       roleType: {
  //         equals: "MENTOR",
  //       },
  //     },
  //   });
  // }

  // public async getUserById(id: string) {
  //   return await prisma.users.findFirst({
  //     where: { id: id },
  //   });
  // }
}
