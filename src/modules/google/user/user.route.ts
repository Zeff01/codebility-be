import { Router } from "express";
import Controller from "./user.controller";

const user: Router = Router();
const controller = new Controller();

import { Users } from "@prisma/client";
//commented for now as codeb will not be avaiable in the public anytime soon
/**
 * GET /users
 * @summary Get All Users
 * @tags users
 * @return {User} 200 - success response - application/json
 */
// user.route("/").get(controller.getUsers);

/**
 * GET /users/{email}
 * @summary Get Users by Email
 * @tags user
 * @param {string} email.path - id param description
 * @return {User} 200 - success response - application/json
 */
// user.route("/:email").get(controller.getUser);
/**
 * POST /users/{id}
 * @summary Update Users by ID
 * @tags users
 * @param {string} id.path - id param description
 * @return {User} 200 - success response - application/json
 */
// user.route("/:id").post(controller.updateProfile);

// user.route("/:email").patch(controller.updateGoogleUser);

export default user;
