import { Router } from "express";
import Controller from "./user.controller";

const user: Router = Router();
const controller = new Controller();

/**
 * GET /users
 * @summary Get All Users
 * @tags users
 * @return {User} 200 - success response - application/json
 */
user.route("/").get(controller.getUsers);
user.route("/:email").get(controller.getUser);
user.route("/:id").post(controller.updateProfile);

export default user;
