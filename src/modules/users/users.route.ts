import { Router } from "express";
import Controller from "./users.controller";
import {
  CreateUserDto,
  ICreateMemberDto,
  LoginAdminDto,
  UpdateUserDto,
} from "@/dto/user.dto";
import RequestValidator from "@/middlewares/request-validator";
import { verifyAuthToken } from "@/middlewares/auth";

const users: Router = Router();
const controller = new Controller();

/**
 * Create user body
 * @typedef {object} CreateUserBody
 * @property {string} email.required - email of user
 * @property {string} name.required - name of user
 * @property {string} cognitoId.required - cognito id
 * @property {string} phone - phone number
 */
/**
 * User
 * @typedef {object} User
 * @property {string} email - email of user
 * @property {string} name - name of user
 * @property {string} cognitoId - cognito id
 * @property {string} phone - phone number
 */
/**
 * POST /users
 * @summary Create user
 * @tags users
 * @param {CreateUserDto} request.body.required
 * @return {User} 201 - user created
 */

/**
 * Update user body
 * @typedef {object} UpdateUserDto
 * @property {string} name - name of user
 * @property {string} phone - phone number
 */
/**
 * User
 * @typedef {object} User
 * @property {string} name - name of user
 * @property {string} phone - phone number
 */
/**
 * PATCH /users
 * @summary Create user
 * @tags users
 * @param {UpdateUserDto} request.body.required
 * @return {User} 201 - user created
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



export default users;
