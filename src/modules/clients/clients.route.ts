import { Router } from "express";
import Controller from "./clients.controller";

import RequestValidator from "@/middlewares/request-validator";

import { CreateClientDto, UpdateClientDto } from "@/dto/client.dto";
import { verifyAuthAdminToken } from "@/middlewares/auth";

const clients: Router = Router();
const controller = new Controller();

/**
 * Users
 * @typedef {object} Users
 * @property {string} id - id of user
 * @property {string} name - Name of user
 * @property {string} short_bio - short bio of user
 * @property {string} short_bio - short bio of user
 * @property {string} image_icon - profile picture of user
 * @property {string} email_address - email address of user
 * @property {string} phone_no - phone no of user
 * @property {string} github_link - github link of user
 * @property {string} fb_link - fb ink of user
 * @property {string} linkedin_link - linkedin link of user
 * @property {string} whatsapp_link - whatsapp link of user
 * @property {string} skype_link - skype link of user
 * @property {string} telegram_link - telegram link of user
 * @property {string} portfolio_website - portfolio website of user
 * @property {string} tech_stacks - techstacks of user
 * @property {string} addtl_skills - additional skills
 * @property {string} work_experience - user work experience
 * @property {string} password - password of user
 * @property {string} schedule - schedule of user
 * @property {string} position - position of user
 * @property {string} roleType - roleType of user
 * @property {string} userType - userType of user
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
 * GET /users
 * @summary Get All Users
 * @tags users
 * @return {Users} 200 - success response - application/json
 */
clients.get("/", controller.getClients);
// /**
//  * GET /users/{id}
//  * @summary Get Users by ID
//  * @tags users
//  * @param {string} id.path - id param description
//  * @return {Users} 200 - success response - application/json
//  */
// users.route("/:id").get(controller.getUserById);
// /**
//  * GET /users/interns
//  * @summary Get Users by Interns
//  * @tags users
//  * @return {Users} 200 - success response - application/json
//  */
// users.route("/interns").get(controller.getUserInterns);
// /**
//  * GET /users/mentors
//  * @summary Get Users by Mentors
//  * @tags users
//  * @return {Users} 200 - success response - application/json
//  */
// users.route("/mentors").get(controller.getUserMentors);
// /**
//  * GET /users/team
//  * @summary Get Users by Mentors
//  * @tags users
//  * @return {Users} 200 - success response - application/json
//  */
// users.route("/team/:position").get(controller.getUserByTeam);
// /**
//  * POST /users/login
//  * @typedef {object} LoginAdminDto
//  * @property {string} email_address.required - The email_address
//  * @property {string} password.required - The password
//  * @summary Login User
//  * @tags users
//  * @param {LoginAdminDto} request.body.required
//  * @return {Users} 201 - User Logged In
//  */
// users.post(
//   "/login",
//   RequestValidator.validate(LoginAdminDto),
//   controller.login
// );
// /**
//  * POST /users/create
//  * @typedef {object} CreateUserDto
//  * @property {string} name.required - The name
//  * @property {string} address.required - The address
//  * @property {string} email_address.required - The email_address
//  * @property {string} github_link.required - The github_link
//  * @property {string} portfolio_website.required - The portfolio_website
//  * @property {string} tech_stacks.required - The tech_stacks
//  * @property {string} schedule.required - The schedule
//  * @property {string} position.required - The position
//  * @property {string} password.required - The password
//  * @summary Create user
//  * @tags users
//  * @param {CreateUserDto} request.body.required
//  * @return {Users} 201 - user created
//  */
clients
  .route("/create")
  .post(
    verifyAuthAdminToken,
    RequestValidator.validate(CreateClientDto),
    controller.createClient
  );

// /**
//  * PATCH /users/{id}
//  * @typedef {object} UpdateUserDto
//  * @summary Edit User Info
//  * @tags users
//  * @param {string} id.path - id param description
//  * @param {UpdateUserDto} request.body.required
//  * @return {Users} 201 - user data updated
//  * @security BearerAuth
//  */
clients.patch(
  "/:id",
  verifyAuthAdminToken,
  RequestValidator.validate(UpdateClientDto),
  controller.updateClient
);

// /**
//  * PUT /users/changePassword/{id}
//  * @typedef {object} changePasswordDto
//  * @property {string} oldPassword.required - The oldPassword
//  * @property {string} newPassword.required - The newPassword
//  * @summary Edit User Password
//  * @tags users
//  * @param {string} id.path - id param description
//  * @param {changePasswordDto} request.body.required
//  * @return {Users} 201 - user password updated
//  * @security BearerAuth
//  */
// users.put(
//   "/changePassword/:id",
//   RequestValidator.validate(changePasswordDto),
//   controller.changeUserPassword
// );
// /**
//  * POST /users/forgot-password
//  * @typedef {object} EmailDto
//  * @property {string} email_address.required - The email_address
//  * @summary Reset User Password
//  * @tags users
//  * @param {EmailDto} request.body.required
//  * @return {Users} 201 - user password updated
//  */
// users.post(
//   "/forgot-password",
//   RequestValidator.validate(EmailDto),
//   controller.forgotPassword
// );
// /**
//  * POST /users/workexp
//  * @typedef {object}  AddWorkExpDto
//  * @property {string} position.required -- Position
//  * @property {string} company.required -- Company Name
//  * @property {string} date.required -- Date
//  * @property {string} short_desc -- Short Description
//  * @summary Add Work Experience
//  * @tags users
//  * @param {AddWorkExpDto} request.body.required
//  * @security BearerAuth
//  * @return {Work_Experience} 201 - work experience added
//  */
// users.post(
//   "/workexp",
//   verifyAuthToken,
//   RequestValidator.validate(AddWorkExpDto),
//   controller.addWorkExp
// );
// /**
//  *  GET /users/workexp/{userid}
//  *  @summary Get Work Experiences per User
//  *  @tags users
//  *  @param {string} userid.path - user id
//  *  @security BearerAuth
//  *  @return {Work_Experience} 200 - success response - application/json
//  */
// users
//   .route("/workexp/:userid")
//   .get(verifyAuthToken, controller.getWorkExpPerUser);
// /**
//  *  PATCH /users/workexp/{id}
//  *  @summary Update Work Experience per User
//  *  @tags users
//  *  @param {string} id.path - Work Experience ID
//  *  @param {UpdateWorkExpDto} request.body.required
//  *  @security BearerAuth
//  *  @return {Work_Experience} 200 - success response - application/json
//  */
// users.patch(
//   "/workexp/:id",
//   verifyAuthToken,
//   RequestValidator.validate(UpdateWorkExpDto),
//   controller.updateWorkExp
// );

// /**
//  *  DELETE /users/workexp/{id}
//  *  @summary Delete Work Experience per User
//  *  @tags users
//  *  @param {string} id.path - Work Experience ID
//  *  @security BearerAuth
//  *  @return {Work_Experience} 200 - success response - application/json
//  */
// users.delete("/workexp/:id", verifyAuthToken, controller.deleteWorkExp);

export default clients;
