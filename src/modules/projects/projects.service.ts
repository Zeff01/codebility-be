import prisma from "@/lib/prisma";

import { HttpInternalServerError } from "@/lib/errors";

import { CreateProjectDto, UpdateProjectDto } from "@/dto/project.dto";

export default class ProjectsService {
  public async getProjects({ id }) {
    return await prisma.projects.findMany({
      where: {
        id,
      },
      // select: { users:true}
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

  public async createProject(data: CreateProjectDto) {
    try {
      return;
      // todo-be
      // return await prisma.projects.create({
      //   data: {
      //     project_name: data.project_name,
      //     github_link: data.github_link,
      //     users: data.users,
      //   },
      // });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while creating the user"
      );
    }
  }

  public async updateProject(data: UpdateProjectDto) {
    const { id, ...updateData } = data;
    try {
      return await prisma.projects.update({
        where: {
          id,
        },
        data: {
          ...updateData,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while updating the user"
      );
    }
  }
}
