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
// import { Timestamp } from "mongodb";

const logs: Router = Router();
const controller = new Controller();

/**
 * timeLogs
 * @typedef {object} timeLogs
 * @property {string} id - id of time log
 * @property {string} usersId - id of user
 * @property {string} time_in - time_in of user
 * @property {string} time_out - time_out of user
 */
/**
 * POST /logs/timein
 * @typedef {object} CreateTimeDto
 * @property {string} usersId.required - The email_address
 * @summary Log Time In of User
 * @tags time_logs
 * @param {CreateTimeDto} request.body.required
 * @return {timeLogs} 201 - Time In of User Logged
 * @security BearerAuth
 */
logs.post(
  "/timein",
  verifyAuthToken,
  RequestValidator.validate(CreateTimeDto),
  controller.createTimeIn,
);
/**
 * POST /logs/timeout
 * @typedef {object} CreateTimeDto
 * @property {string} usersId.required - The email_address
 * @summary Log Time In of User
 * @tags time_logs
 * @param {CreateTimeDto} request.body.required
 * @return {timeLogs} 201 - Time Out of User Logged
 * @security BearerAuth
 */
logs.post(
  "/timeout",
  verifyAuthToken,
  RequestValidator.validate(CreateTimeDto),
  controller.createTimeOut,
);

logs.get("", controller.getLogs);
/**
 * GET /logs/{usersId}
 * @summary Get Logs by ID
 * @tags time_logs
 * @param {string} usersId.path - id param description
 * @return {timeLogs} 200 - success response - application/json
 * @security BearerAuth
 */
logs.get("/:id", verifyAuthToken, controller.getLogsByUserId);
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
