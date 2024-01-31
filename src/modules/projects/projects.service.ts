import {
  time_logs,
  type Prisma,
  type Clients,
  Projects,
  UserProjects,
} from "@prisma/client";
import prisma from "@/lib/prisma";

import { HttpInternalServerError } from "@/lib/errors";

import { UpdateProjectDto } from "@/dto/project.dto";

export default class ProjectsService {
  public async getProjects({ id }) {
    return await prisma.projects.findMany({
      where: {
        id,
      },
      include: { users: true },
    });
  }

  public async getProjectsByUserId(id: string) {
    return await prisma.userProjects.findMany({
      where: {
        id,
      },
      // select: { usersproj_Id: true },
      include: {
        project: true,
      },
    });
  }

  public async createProject({
    project_name,
    github_link,
    clientsId,
    company_name,
  }) {
    try {
      return await prisma.projects.create({
        data: {
          project_name,
          github_link,
          Clients: {
            connectOrCreate: {
              where: { id: clientsId },
              create: { company_name: company_name },
            },
          },
          users: {
            create: {
              // id: userId,
            },
          },
          // UserProjects: {
          //   connectOrCreate: { id: userId },
          // },
        },

        include: { Clients: true, users: true },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while creating the user"
      );
    }
  }

  public async updateProject(
    id: string,
    userId: string,
    data: UpdateProjectDto
  ) {
    try {
      return await prisma.projects.update({
        where: {
          id: id,
        },
        data: {
          UserProjects: { connect: { id: id } },
          project_name: data.project_name,
          github_link: data.github_link,
        },

        include: { UserProjects: true },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while updating the user"
      );
    }
  }
}
