import { type NextFunction, type Request } from "express";
import {
  Clients,
  Prisma,
  Projects,
  Tags,
  todo_list,
  type Users,
} from "@prisma/client";
import { HttpStatusCode } from "axios";
import { type CustomResponse } from "@/types/common.type";
import Api from "@/lib/api";
import {
  HttpBadRequestError,
  HttpInternalServerError,
  HttpNotFoundError,
} from "@/lib/errors";
import TodosService from "./todos.service";

export default class TodoController extends Api {
  private readonly todosService = new TodosService();

  public getTodos = async (
    req: Request,
    res: CustomResponse<todo_list>,
    next: NextFunction
  ) => {
    try {
      const userTodoId = (req.user as any)?.id;

      if (!userTodoId) {
        return this.send(
          res,
          null,
          HttpStatusCode.NotFound,
          "User is not authenticated"
        );
      }

      const todo = await this.todosService.getTodos(userTodoId);

      if (!todo) {
        return this.send(res, null, HttpStatusCode.NotFound, "No todos found");
      }
      this.send(res, todo, HttpStatusCode.Ok, "Todos");
    } catch (e) {
      console.error("Error while fetching todos:", e);
      next(e);
    }
  };

  public createTodo = async (
    req: Request,
    res: CustomResponse<todo_list>,
    next: NextFunction
  ) => {
    try {
      const todo = await this.todosService.createTodo(req.body);
      this.send(res, todo, HttpStatusCode.Created, "createTodos");
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle known request errors from Prisma
        next(new HttpBadRequestError("Bad request", [e.message]));
      } else {
        // Handle other errors
        next(
          new HttpInternalServerError(
            "An error occurred while creating the user"
          )
        );
      }
    }
  };

  public createTagTodo = async (
    req: Request,
    res: CustomResponse<Tags>,
    next: NextFunction
  ) => {
    try {
      const tags = await this.todosService.createTagTodo(req.body);
      this.send(res, tags, HttpStatusCode.Created, "createTagTodos");
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle known request errors from Prisma
        next(new HttpBadRequestError("Bad request", [e.message]));
      } else {
        // Handle other errors
        next(
          new HttpInternalServerError(
            "An error occurred while creating the user"
          )
        );
      }
    }
  };

  public updateTodo = async (
    req: Request,
    res: CustomResponse<todo_list>,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id as string;
      const todo_id = req.body.todo_id;
      const tag_name = req.body.tag_name;
      const updateData = req.body;
      const todo = await this.todosService.updateTodo(
        id,
        todo_id,
        tag_name,
        updateData
      );
      this.send(res, todo, HttpStatusCode.Ok, "updateTodos");
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle known request errors from Prisma
        next(new HttpBadRequestError("Bad request", [e.message]));
      } else if (e instanceof HttpNotFoundError) {
        // Handle not found errors (e.g., user not found)
        next(e);
      } else {
        // Handle other errors
        next(
          new HttpInternalServerError(
            "An error occurred while updating the user"
          )
        );
      }
    }
  };
}
