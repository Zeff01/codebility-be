import prisma from "@/lib/prisma";

import { HttpInternalServerError } from "@/lib/errors";

import { UpdateClientDto } from "@/dto/client.dto";
import { CreateTagTodoDto, CreateTodoDto, UpdateTodoDto } from "@/dto/todo.dto";
import { PriorityLevelEnum, Tags } from "@prisma/client";

export default class TodosService {
  //   public async getUser(
  //     data: Prisma.UsersWhereInput,
  //     select?: Prisma.UsersSelect
  //   ) {
  //     return await prisma.users.findFirst({
  //       where: data,
  //       select,
  //     });
  //   }

  public async getTodos(id: string) {
    return await prisma.todo_list.findMany({
      where: {
        id,
      },
      include: {
        tags: { select: { tag: true } },
        userTodo: { select: { name: true } },
        projects: { select: { project_name: true } },
      },
    });
  }

  public async createTodo(data: CreateTodoDto) {
    try {
      return await prisma.todo_list.create({
        data: {
          title: data.title,
          subheader: data.subheader,
          full_description: data.full_description,
          prio_level: PriorityLevelEnum.LOW,
          github_link: data.github_link,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while creating the user",
      );
    }
  }

  public async createTagTodo(data: CreateTagTodoDto) {
    try {
      return await prisma.tags.create({
        data: {
          tag: data.tag,
          todo_list: {
            connect: {
              id: data.todoId,
            },
          },
        },
        // include: { todo_list: {select:{title:true}} },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while creating the user",
      );
    }
  }

  public async updateTodo(
    id: string,
    tag_name: string,
    todo_id: string,
    data: UpdateTodoDto,
  ) {
    try {
      return await prisma.todo_list.update({
        where: {
          id,
        },
        data: {
          title: data.title,
          prio_level: data.prio_level,
          subheader: data.subheader,
          full_description: data.full_description,
          github_link: data.github_link,
          Tags: {
            update: {
              where: { id },
              data: { todo_id: todo_id, tag_name: tag_name },
            },
          },
        },
        include: { Tags: true },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while updating the user",
      );
    }
  }
}
