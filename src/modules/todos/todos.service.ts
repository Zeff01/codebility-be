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

  public async getTodosById(id: string) {
    return await prisma.todo_list.findMany({
      where: {
        id: id,
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
          prio_level: PriorityLevelEnum[data.prio_level],
          github_link: data.github_link,
          tags: {
            create: data.tags.map((tag) => ({ tag: tag.tag })),
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

  public async updateTodo(todoId: string, data: UpdateTodoDto) {
    try {
      return await prisma.todo_list.update({
        where: {
          id: todoId,
        },
        data: {
          title: data.title,
          prio_level: PriorityLevelEnum[data.prio_level],
          subheader: data.subheader,
          full_description: data.full_description,
          github_link: data.github_link,
          tags:{disconnect: data.tags.map((tags) => ({ id: tags.id })),}
        },
        include: {
          tags: {
            select: {
              tag: true,
            },
          },
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while updating the user",
      );
    }
  }

  public async updateTagsTodo(id: string, data: CreateTagTodoDto) {
    try {
      //TODO update tags per todo id
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while updating the user",
      );
    }
  }
}
