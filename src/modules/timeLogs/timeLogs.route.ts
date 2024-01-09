import { Router } from "express";
import Controller from "./timeLogs.controller";
import {
  CreateUserDto,
  ICreateMemberDto,
  LoginAdminDto,
  UpdateUserDto,
} from "@/dto/user.dto";
import RequestValidator from "@/middlewares/request-validator";
import { verifyAuthToken } from "@/middlewares/auth";
import { CreateTimeDto } from "@/dto/timeLogs.dto";

const logs: Router = Router();
const controller = new Controller();

logs.post(
  "/timein",
  verifyAuthToken,
  RequestValidator.validate(CreateTimeDto),
  controller.createTimeIn
);

logs.post(
  "/timeout",
  verifyAuthToken,
  RequestValidator.validate(CreateTimeDto),
  controller.createTimeOut
);

logs.get("", controller.getLogs);

logs.route("/:id").get(controller.getLogsByUserId);
// users.patch(
//   "/:id",.
//   verifyAuthToken,
//   RequestValidator.validate(UpdateUserDto),
//   controller.updateUser
// );

// users.post(
//   "/login",
//   RequestValidator.validate(LoginAdminDto),
//   controller.login
// );

// users.route("/:id").get(controller.getUserById);

// users.route("/").get(controller.getUsers);

export default logs;
