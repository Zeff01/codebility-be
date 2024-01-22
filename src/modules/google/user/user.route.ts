import { Router } from "express";
import Controller from "@/modules/google/user/user.controller";

const user: Router = Router();
const controller = new Controller();

user.get("/", controller.getUsers);
user.get("/:id", controller.getUser);
user.post("/:id", controller.updateProfile);

export default user;
