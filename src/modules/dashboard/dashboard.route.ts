import { Router } from "express";
import Controller from "./dashboard.controller";
import { verifyAuthToken } from "@/middlewares/auth";
import RequestValidator from "@/middlewares/request-validator";
import {
  ChecklistDetailsDto,
  CreateChecklistDto,
  UpdateChecklistDto,
} from "@/dto/dashboard.dto";

const dashboard: Router = Router();
const controller = new Controller();

dashboard.get("/all-checklist", verifyAuthToken, controller.getChecklist);

dashboard.post(
  "/create-checklist",
  verifyAuthToken,
  RequestValidator.validate(CreateChecklistDto),
  controller.createChecklist
);

dashboard.put(
  "/update-checklist/:id",
  verifyAuthToken,
  RequestValidator.validate(UpdateChecklistDto),
  controller.updateChecklist
);

dashboard.delete(
  "/delete-checklist/:id",
  verifyAuthToken,
  RequestValidator.validateParams(ChecklistDetailsDto),
  controller.deleteChecklist
);

dashboard.get(
  "/checklist-details/:id",
  verifyAuthToken,
  RequestValidator.validateParams(ChecklistDetailsDto),
  controller.checklistDetails
);

export default dashboard;
