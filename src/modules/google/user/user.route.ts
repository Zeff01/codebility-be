import { Router } from "express";
import Controller from "@/modules/google/user/user.controller";

const user: Router = Router();
const controller = new Controller();

user.patch("/:email", controller.updateGoogleUser);

export default user;
