import { NextFunction, Request, Router } from "express";
import Controller from "./users.controller";
import {
  CreateUserDto,
  EmailDto,
  ICreateMemberDto,
  LoginAdminDto,
  UpdateUserDto,
  changePasswordDto,
} from "@/dto/user.dto";
import RequestValidator from "@/middlewares/request-validator";
import { verifyAuthToken } from "@/middlewares/auth";
import { CustomResponse } from "@/types/common.type";
import { Users } from "@prisma/client";

const users: Router = Router();
const controller = new Controller();

/**
 * GET /users
 * @summary Get All Users
 * @tags users
 * @return {Users} 200 - success response - application/json
 */
/**
 * GET /users/{id}
 * @summary Get Users by ID
 * @tags users
 * @param {string} id.path - id param description
 * @return {Users} 200 - success response - application/json
 */
/**
 * GET /users/interns
 * @summary Get Users by Interns
 * @tags users
 * @return {Users} 200 - success response - application/json
 */
/**
 * GET /users/mentors
 * @summary Get Users by Mentors
 * @tags users
 * @return {Users} 200 - success response - application/json
 */
/**
 * POST /users/login
 * @typedef {object} LoginAdminDto
 * @summary Login User
 * @tags users
 * @param {LoginAdminDto} request.body.required
 * @return {Users} 201 - User Logged In
 */
/**
 * POST /users/add
 * @summary Create user
 * @tags users
 * @param {CreateUserDto} request.body.required
 * @return {Users} 201 - user created
 */
/**
 * User
 * @typedef {object} Users
 * @property {string} email - email of user
 */
/**
 * PATCH /users/{id}
 * @typedef {object} UpdateUserDto
 * @summary Edit User Info
 * @tags users
 * @param {string} id.path - id param description
 * @param {UpdateUserDto} request.body.required
 * @return {Users} 201 - user data updated
 * @security BearerAuth
 */
/**
 * PUT /users/changePassword/{id}
 * @typedef {object} changePasswordDto
 * @summary Edit User Password
 * @tags users
 * @param {string} id.path - id param description
 * @param {changePasswordDto} request.body.required
 * @return {Users} 201 - user data updated
 * @security BearerAuth
 */
/**
 * POST /users/forgot-password
 * @typedef {object} EmailDto
 * @summary Reset User Password
 * @tags users
 * @param {EmailDto} request.body.required
 * @return {Users} 201 - user data updated
 */

users.route("/interns").get(controller.getUserInterns);

users.route("/mentors").get(controller.getUserMentors);

users
  .route("/add")
  .post(RequestValidator.validate(CreateUserDto), controller.createUser);
// .get(verifyAuthToken, controller.getAdminInfo);

users.patch(
  "/:id",
  verifyAuthToken,
  RequestValidator.validate(UpdateUserDto),
  controller.updateUser
);

users.post(
  "/login",
  RequestValidator.validate(LoginAdminDto),
  controller.login
);

users.route("/:id").get(controller.getUserById);

users.route("/").get(controller.getUsers);

users.put(
  "/changePassword/:id",
  RequestValidator.validate(changePasswordDto),
  controller.changeUserPassword
);

users.post(
  "/forgot-password",
  RequestValidator.validate(EmailDto),
  controller.forgotPassword
);

export default users;
