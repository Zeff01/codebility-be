import { Router } from "express";
import Controller from "./todos.controller";

import RequestValidator from "@/middlewares/request-validator";

import { CreateTodoDto } from "@/dto/todo.dto";
import { verifyAuthAdminToken, verifyAuthToken } from "@/middlewares/auth";
import { CreateTagTodoDto, UpdateTodoDto } from "@/dto/todo.dto";

const todos: Router = Router();
const controller = new Controller();

todos.get("/", controller.getTodos);
todos.get("/:id", controller.getTodosById);

todos
  .route("/create")
  .post(
    verifyAuthToken,
    RequestValidator.validate(CreateTodoDto),
    controller.createTodo
  );

todos.route("/tags").post(
  //verifyAuthAdminToken,
  RequestValidator.validate(CreateTagTodoDto),
  controller.createTagTodo
);

todos.patch(
  "/:id",
  //   verifyAuthAdminToken,
  RequestValidator.validate(UpdateTodoDto),
  controller.updateTodo
);
todos.put(
  "/tags/:id",
  RequestValidator.validate(CreateTagTodoDto),
  controller.updateTagsTodo
);
export default todos;
