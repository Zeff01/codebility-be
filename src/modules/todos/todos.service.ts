import prisma from "@/lib/prisma";

import { HttpInternalServerError } from "@/lib/errors";

import { UpdateClientDto } from "@/dto/client.dto";
import { UpdateTodoDto } from "@/dto/todo.dto";
import { Tags } from "@prisma/client";

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
      include: { Tags: true },
    });
  }

  public async createTodo({ title, users_id, prio_level, project_id, tagId }) {
    try {
      return await prisma.todo_list.create({
        data: {
          title: title,
          users: {
            connect: {
              id: users_id,
            },
          },
          prio_level: prio_level,
          projects: {
            connect: {
              id: project_id,
            },
          },
          TodoTags: {
            create: { id: tagId },
          },
        },
        include: { projects: true, TodoTags: true },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while creating the user"
      );
    }
  }

  public async createTagTodo({ tag, Todos, title, prio_level }) {
    try {
      return await prisma.tags.create({
        data: {
          tag,
          todo_list: {
            connectOrCreate: {
              where: { id: Todos },
              create: { title: title, prio_level: prio_level },
            },
          },
          //   TodoTags: {
          //     create: { todo_id, tags: { connect: { id: tags } } },
          //   },
        },
        include: { todo_list: true },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while creating the user"
      );
    }
  }

  public async updateTodo(
    id: string,
    tag: string,
    tagId: string,
    data: UpdateTodoDto
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
              where: { id: tagId },
              data: { tag: tag },
            },
          },
        },
        include: { Tags: true },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while updating the user"
      );
    }
  }

  public async deleteTodo(id: string) {
    try {
      await prisma.todo_list.update({
        where: {
          id,
        },
        data: {
          Tags: {
            deleteMany: {},
          },
        },
        include: { Tags: true },
      });
      await prisma.todo_list.delete({
        where: { id },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occured while deleting user work experince"
      );
    }
  }
}
