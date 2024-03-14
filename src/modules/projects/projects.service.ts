import { time_logs, type Prisma, type Clients, Projects } from "@prisma/client";
import prisma from "@/lib/prisma";

import { HttpInternalServerError } from "@/lib/errors";

import { UpdateProjectDto } from "@/dto/project.dto";

export default class ProjectsService {
  public async getProjects(id: string) {
    return await prisma.projects.findMany({
      include: { users: true },
    });
  }

  public async getProjectsById(id: string) {
    return await prisma.projects.findFirst({
      where: {
        id: id,
      },
    });
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
          users: {
            create: {},
            // id: userId,
          },
          // connect:{user_id:user_id}

          client: {
            connect: { id: clientId },
          },
        },
        include: { users: true },
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

  public async updateUsersToProject(
    id: string,
    usersId: string[],
    projectsId: string,
    //  data: UpdateProjectDto
  ) {
    // const { ...updateData } = data;
    try {
      return await prisma.userProjects.update({
        where: {
          id: id,
        },
        data: {
          // user_id: data.user_id,
          // projectId: data.projectId

          usersId: usersId,
          projectsId: projectsId,
          // summary:data.summary,
          // live_link: data.live_link,
          // project_thumbnail: data.project_thumbnail,
        },
        //  include: { UserProjects: true },
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
