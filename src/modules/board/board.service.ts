import { type Prisma, type time_logs } from "@prisma/client";
import prisma from "@/lib/prisma";
import LogMessage from "@/decorators/log-message.decorator";

import { HttpInternalServerError, HttpNotFoundError } from "@/lib/errors";

import { CreateTimeDto } from "@/dto/timeLogs.dto";
import {
  AddUsersToBoardDto,
  CreateBoardDto,
  CreateListToBoardDto,
} from "@/dto/boards.dto";

export default class BoardService {
  //   public async getTimeLogs(
  //     data: Prisma.time_logsWhereInput,
  //     select?: Prisma.time_logsSelect
  //   ) {
  //     return await prisma.time_logs.findFirst({
  //       where: data,
  //       select,
  //     });
  //   }

  public async getAllBoards() {
    return await prisma.board.findMany({
      include: {
        boardOnUsers: {
          include: {
            usersBoard: {
              select: { name: true },
            },
          },
        },
        boardProjects: {
          include: { project: { select: { project_name: true } } },
        },
        lists: { select: { id: true, name: true } },
      },
    });
  }

  public async createBoard(data: CreateBoardDto) {
    try {
      return await prisma.board.create({
        data: {
          name: data.name,
          boardProjects: {
            create: data.projects.map((projectsId) => ({
              project: {
                connect: {
                  id: projectsId.projectsId,
                },
              },
            })),
          },
        },
        include: { boardProjects: { include: { project: true } } },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occured while adding work experience",
      );
    }
  }

  public async addUsersToBoard(
    // user_id: string[],
    data: AddUsersToBoardDto,
  ) {
    // const { ...updateData } = data;
    try {
      return await prisma.board.update({
        where: {
          id: data.boardOnUsersId,
        },
        data: {
          boardOnUsers: {
            create: data.boardOnUsers.map((userOnBoardId) => ({
              usersBoard: {
                connect: {
                  id: userOnBoardId.userOnBoardId, // Assuming 'usersId' is the unique identifier for users
                },
              },
            })),
          },
        },
        include: {
          boardOnUsers: {
            include: { usersBoard: true },
          },
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while updating the project",
      );
    }
  }

  public async createListToBoard(
    // user_id: string[],
    data: CreateListToBoardDto,
  ) {
    // const { ...updateData } = data;
    try {
      return await prisma.list.create({
        data: {
          name: data.name,
          board: { connect: { id: data.boardId } },
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while updating the project",
      );
    }
  }

  // public async addTodoToBoard(
  //   // user_id: string[],
  //   data: AddUsersToBoardDto,
  // ) {
  //   // const { ...updateData } = data;
  //   try {
  //     return await prisma.list.update({
  //       where: {
  //         id: data.boardOnUsersId,
  //       },
  //       data: {
  //         boardOnUsers: {
  //           create: data.boardOnUsers.map((userOnBoardId) => ({
  //             usersBoard: {
  //               connect: {
  //                 id: userOnBoardId.userOnBoardId, // Assuming 'usersId' is the unique identifier for users
  //               },
  //             },
  //           })),
  //         },
  //       },
  //       include: {
  //         boardOnUsers: {
  //           include: { usersBoard: true },
  //         },
  //       },
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     throw new HttpInternalServerError(
  //       "An error occurred while updating the project",
  //     );
  //   }
  // }

  // public async createBoard(data: CreateBoardDto) {
  //     try {
  //       return await prisma.board.create({
  //         data: {
  //           name: data.name,
  //           // Assuming data.projects is an array of objects containing both projectId and userId
  //           boardProjects: {
  //             create: data.projects.map(({ projectsId, usersId }) => ({
  //               // Connect the project
  //               project: {
  //                 connect: { id: projectsId },
  //               },
  //               // Connect the user - this assumes your data structure includes userId for each project
  //               user: {
  //                 connect: { id: usersId },
  //               },
  //             })),
  //           },
  //         },
  //         include: {
  //           boardProjects: {
  //             include: {
  //               project: true,
  //               user: true, // Include user details in the response
  //             },
  //           },
  //         },
  //       });
  //     } catch (error) {
  //       console.error(error);
  //       throw new HttpInternalServerError(
  //         "An error occurred while creating the board.",
  //       );
  //     }
  //   }

  // public async createBoard(data: CreateBoardDto) {
  //     try {
  //       return await prisma.board.create({
  //         data: {
  //           name: data.name,
  //           boardProjects: {
  //             create: data.projects.map((project) => ({
  //               project: {
  //                 connect: {
  //                   id: project.projectsId,
  //                 },
  //               },
  //               user: {
  //                 connect: {
  //                   id: project.usersId,
  //                 },
  //               },
  //             })),
  //           },
  //         },
  //         include: {
  //           boardProjects: {
  //             include: {
  //               project: true,
  //               user: true, // Now including user data
  //             },
  //           },
  //         },
  //       });
  //     } catch (error) {
  //       console.error(error);
  //       throw new HttpInternalServerError(
  //         "An error occurred while creating the board",
  //       );
  //     }
  // }

  //   public async createTimeOut(data: time_logs) {
  //     try {
  //       return await prisma.time_logs.create({
  //         data: {
  //           userTimeLogId: data.userTimeLogId,

  //           time_out: new Date(),
  //         },
  //       });
  //     } catch (error) {
  //       console.error(error);
  //       throw new HttpInternalServerError(
  //         "An error occured while adding work experience",
  //       );
  //     }
  //   }

  //   public async getLogsByUserId(userTimeLogId: string) {
  //     const logs = await prisma.time_logs.findMany({
  //       where: { userTimeLogId },
  //     });
  //     return logs;
  //   }

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
