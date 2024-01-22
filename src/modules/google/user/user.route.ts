import { Router } from "express";
import Controller from "@/modules/google/user/user.controller";

const user: Router = Router();
const controller = new Controller();

user.patch("/:email", controller.updateGoogleUser);
user.get("/", controller.getUsers);
user.post("/:id", controller.updateProfile);

export default user;
