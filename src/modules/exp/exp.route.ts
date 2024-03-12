import { Router, Request } from "express";
import Controller from "./exp.controller";
import { verifyAuthAdminToken, verifyAuthToken } from "@/middlewares/auth";
import RequestValidator from "@/middlewares/request-validator";
import { CreateLevelsDto } from "@/dto/exp.dto";

const exp: Router = Router();
const controller = new Controller();

exp.post(
  "/levels/",
  verifyAuthAdminToken,
  RequestValidator.validate(CreateLevelsDto),
  controller.createLevels,
);

exp.get("/levels", verifyAuthAdminToken, controller.getAllLevels);

exp.patch("/levels/:id", verifyAuthAdminToken, controller.updateLevels);

//TODO
// exp.delete("/levels/:id", verifyAuthAdminToken, controller.deleteLevelsById);

exp.post("/threshold/", verifyAuthAdminToken, controller.createThreshold);

exp.get("/threshold", verifyAuthAdminToken, controller.getThreshold);

exp.patch("/threshold/:id", verifyAuthAdminToken, controller.updateThreshold);

//TODO
// exp.delete("/threshold/:id", verifyAuthAdminToken, controller.deleteThresholdById);

exp.get("/users", verifyAuthAdminToken, controller.getActiveUsers);

exp.post("/points/", verifyAuthAdminToken, controller.addPoints);

exp.get("/leaderboard", controller.getLeaderboard);
export default exp;
