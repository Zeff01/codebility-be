import { Router } from "express";
import Controller from "./dashboard.controller";
import { verifyAuthToken } from "@/middlewares/auth";

const dashboard: Router = Router();
const controller = new Controller();

dashboard.get("/all-checklist", verifyAuthToken, controller.getChecklist);

dashboard.post(
  "/create-checklist",
  verifyAuthToken,
  controller.createChecklist
);

dashboard.put(
  "/update-checklist/:id",
  verifyAuthToken,
  controller.updateChecklist
);

dashboard.delete(
  "/delete-checklist/:id",
  verifyAuthToken,
  controller.deleteChecklist
);

dashboard.get(
  "/checklist-details/:id",
  verifyAuthToken,
  controller.checklistDetails
);

export default dashboard;
