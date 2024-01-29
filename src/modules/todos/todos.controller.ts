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
      const todo = await this.todosService.getTodos(req.body);
      this.send(res, todo, HttpStatusCode.Ok, "Todos");
    } catch (e) {
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
      const tagId = req.body.tagId;
      const tag = req.body.tag;
      const updateData = req.body;
      const todo = await this.todosService.updateTodo(
        id,
        tag,
        tagId,
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

  public deleteTodo = async (
    req: Request,
    res: CustomResponse<todo_list>,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id as string;
      const todo = await this.todosService.deleteTodo(id);
      this.send(res, todo, HttpStatusCode.Ok, "Todo deleted successfully");
    } catch (e) {
      next(e);
    }
  };
}
