import { time_logs, type Prisma, type Clients, Projects } from "@prisma/client";
import prisma from "@/lib/prisma";

import { HttpInternalServerError } from "@/lib/errors";

import {
  AddUsersToProjectDto,
  CreateProjectDto,
  RemoveUsersFromProjectDto,
  UpdateProjectDto,
} from "@/dto/project.dto";
import clients from "../clients/clients.route";

export default class ProjectsService {
  public async getProjects({ id }) {
    return await prisma.projects.findMany({
      where: {
        id,
      },
      include: { UserProjects: true },
    });
  }
  public async getProjectsById(id: string) {
    return await prisma.projects.findFirst({
      where: {
        id: id,
      },
    });
  }

  public async getProjectsByUserId(id: string) {
    return;
    // todo-be
    // return await prisma.projects.findMany({
    //   where: {
    //     id,
    //   },
    //   // select: { usersproj_Id: true },
    //   include: {
    //     users: { select: { name: true } },
    //   },
    // });
  }

  public async createProject({
    project_name,
    github_link,
    summary,
    live_link,
    project_thumbnail,
    clientId,
  }) {
    try {
      return await prisma.projects.create({
        data: {
          project_name: project_name,
          github_link: github_link,
          summary: summary,
          live_link: live_link,
          project_thumbnail: project_thumbnail,
          // users: data.users,
          UserProjects: {
            create: {},
            // id: userId,
          },
          // connect:{user_id:user_id}

          client: {
            connect: { id: clientId },
          },
        },
        include: { UserProjects: true },
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
        },
        // include: { UserProjects: true },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while updating the project",
      );
    }
  }

  public async addUsersToProject(
    { id, user_id },
    //  data: UpdateProjectDto
  ) {
    // const { ...updateData } = data;
    try {
      return await prisma.projects.update({
        where: {
          id: id,
        },
        data: {
          // user_id: data.user_id,
          // projectId: data.projectId

          UserProjects: { connect: { user_id } },
          // summary:data.summary,
          // live_link: data.live_link,
          // project_thumbnail: data.project_thumbnail,
        },
        include: { UserProjects: true },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while updating the project",
      );
    }
  }

  public async removeUsersFromProject(
    data: RemoveUsersFromProjectDto,
    //  data: UpdateProjectDto
  ) {
    // const { ...updateData } = data;
    try {
      return await prisma.projects.update({
        where: {
          id: data.id,
        },
        data: {
          // user_id: data.user_id,
          // projectId: data.projectId
          UserProjects: { set: { user_id: data.user_id } },
          // summary:data.summary,
          // live_link: data.live_link,
          // project_thumbnail: data.project_thumbnail,
        },
        include: { UserProjects: { select: { user_id: true } } },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while updating the project",
      );
    }
  }

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
