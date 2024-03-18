import {
  time_logs,
  type Prisma,
  type Clients,
  Projects,
  ProjectViewTypeEnum,
} from "@prisma/client";
import prisma from "@/lib/prisma";

import { HttpInternalServerError } from "@/lib/errors";

import {
  CreateProjectDto,
  UpdateProjectDto,
  UpdateUsersToProjectDto,
} from "@/dto/project.dto";

export default class ProjectsService {
  public async getProjects() {
    return await prisma.projects.findMany({
      include: {
        users: {
          include: { user: true },
        },
      },
    });
  }

  public async getFeaturedProjects() {
    return await prisma.projects.findMany({
      where: { viewType: { not: "DEFAULT" } },
      include: {
        users: {
          select: { user: { select: { name: true, position: true } } },
        },
      },
    });
  }

  public async getProjectsById(id: string) {
    return await prisma.projects.findFirst({
      where: {
        id: id,
      },
    });
  }

  public async createProject(data: CreateProjectDto) {
    try {
      return await prisma.projects.create({
        data: {
          project_name: data.project_name,
          github_link: data.github_link,
          summary: data.summary,
          live_link: data.live_link,
          project_thumbnail: data.project_thumbnail,
          client: data.clientId
            ? { connect: { id: data.clientId } }
            : undefined,
          users: {
            create: data.users.map((usersId) => ({
              user: {
                connect: {
                  id: usersId.usersId, // Assuming 'usersId' is the unique identifier for users
                },
              },
            })),
          },
        },
        include: {
          users: {
            include: { user: true },
          },
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while creating the user",
      );
    }
  }

  public async updateProject(
    projectId: string,
    // user_id: string[],
    data: UpdateProjectDto,
  ) {
    const { ...updateData } = data;
    try {
      return await prisma.projects.update({
        where: {
          id: projectId,
        },
        data: {
          ...updateData,
          users: {
            disconnect: data.users.map((userProject) => ({
              id: userProject.id,
            })),
          },
        },
        include: {
          users: {
            include: { user: true },
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

  public async addUsersToProject(
    // user_id: string[],
    data: UpdateUsersToProjectDto,
  ) {
    // const { ...updateData } = data;
    try {
      return await prisma.projects.update({
        where: {
          id: data.projectsId,
        },
        data: {
          viewType: ProjectViewTypeEnum[data.viewType],
          users: {
            create: data.users.map((usersId) => ({
              user: {
                connect: {
                  id: usersId.usersId, // Assuming 'usersId' is the unique identifier for users
                },
              },
            })),
          },
        },
        include: {
          users: {
            include: { user: true },
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

  // public async updateUsersToProject(
  //   id: string,
  //   usersId: string[],
  //   projectsId: string
  //   //  data: UpdateProjectDto
  // ) {
  //   // const { ...updateData } = data;
  //   try {
  //     return await prisma.userProjects.update({
  //       where: {
  //         id: id,
  //       },
  //       data: {
  //         // user_id: data.user_id,
  //         // projectId: data.projectId

  //         usersId: usersId,
  //         projectsId: projectsId,
  //         // summary:data.summary,
  //         // live_link: data.live_link,
  //         // project_thumbnail: data.project_thumbnail,
  //       },
  //       //  include: { UserProjects: true },
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     throw new HttpInternalServerError(
  //       "An error occurred while updating the project"
  //     );
  //   }
  // }

  public async deleteProjectById(id: string) {
    try {
      return await prisma.projects.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while updating the project",
      );
    }
  }
}
