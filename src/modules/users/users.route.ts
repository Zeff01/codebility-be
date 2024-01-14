import { NextFunction, Request, Router } from "express";
import Controller from "./users.controller";
import {
  CreateUserDto,
  EmailDto,
  ICreateMemberDto,
  LoginAdminDto,
  UpdateUserDto,
  WorkExpDto,
  changePasswordDto,
} from "@/dto/user.dto";
import RequestValidator from "@/middlewares/request-validator";
import { verifyAuthToken } from "@/middlewares/auth";
import { CustomResponse } from "@/types/common.type";
import { Users, Work_Experience } from "@prisma/client";

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
 * @property {string} email_address.required - The email_address
 * @property {string} password.required - The password
 * @summary Login User
 * @tags users
 * @param {LoginAdminDto} request.body.required
 * @return {Users} 201 - User Logged In
 */
/**
 * POST /users/create
 * @typedef {object} CreateUserDto
 * @property {string} name.required - The name
 * @property {string} address.required - The address
 * @property {string} email_address.required - The email_address
 * @property {string} github_link.required - The github_link
 * @property {string} portfolio_website.required - The portfolio_website
 * @property {string} tech_stacks.required - The tech_stacks
 * @property {string} password.required - The password
 * @summary Create user
 * @tags users
 * @param {CreateUserDto} request.body.required
 * @return {Users} 201 - user created
 */
/**
 * Users
 * @typedef {object} Users
 * @property {string} id - id of user
 * @property {string} address - address of user
 * @property {string} email_address - email_address of user
 * @property {string} github_link - github_link of user
 * @property {string} portfolio_website - portfolio_website of user
 * @property {string} tech_stacks - tech_stacks of user
 * @property {string} password - password of user
 * @property {string} schedule - schedule of user
 * @property {string} position - position of user
 * @property {string} roleType - roleType of user
 * @property {string} userType - userType of user
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
 * @property {string} oldPassword.required - The oldPassword
 * @property {string} newPassword.required - The newPassword
 * @summary Edit User Password
 * @tags users
 * @param {string} id.path - id param description
 * @param {changePasswordDto} request.body.required
 * @return {Users} 201 - user password updated
 * @security BearerAuth
 */
/**
 * POST /users/forgot-password
 * @typedef {object} EmailDto
 * @property {string} email_address.required - The email_address
 * @summary Reset User Password
 * @tags users
 * @param {EmailDto} request.body.required
 * @return {Users} 201 - user password updated
 */
/**
 * POST users/workexp/{id}
 * @typedef {object}  WorkExpDto
 * @property {string} user_id.required -- User ID
 * @property {string} position.required -- Position
 * @property {string} company.required -- Company Name
 * @property {string} date.required -- Date
 * @property {string} short_desc -- Short Description
 * @summary Add Work Experience
 * @tags users
 * @param {WorkExpDto} request.body.required
 * @return {Work_Experience} 201 - work experience added
 */
/**
 * Work_Experience
 * @typedef {object} Work_Experience
 * @property {string} id - Work Experience ID
 * @property {string} user_id - User ID
 * @property {string} position - Position
 * @property {string} company - Company
 * @property {string} date - Date
 * @property {string} short_desc - Short Description
 */
/**
 *  GET /users/workexp/{userid}
 *  @summary Get Users Work Experiences
 *  @tags users
 *  @param {string} userid.path - user id
 *  @return {Work_Experience} 200 - success response - application/json
 */

users.route("/interns").get(controller.getUserInterns);

users.route("/mentors").get(controller.getUserMentors);

users.route("/team?:position").get(controller.getUserByTeam);

users
  .route("/create")
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

users.post(
  "/workexp",
  verifyAuthToken,
  RequestValidator.validate(WorkExpDto),
  controller.addWorkExp
);

users.route("/workexp/:userid").get(controller.getWorkExpPerUser);

users.patch(
  "/workexp/:id",
  verifyAuthToken,
  RequestValidator.validate(WorkExpDto),
  controller.updateWorkExp
);

users.delete("/workexp/:id", verifyAuthToken, controller.deleteWorkExp);
export default users;
