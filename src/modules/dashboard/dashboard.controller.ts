import Api from "@/lib/api";
import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "axios";
import DashboardService from "./dashboard.service";
import { HttpInternalServerError, HttpNotFoundError } from "@/lib/errors";

export default class DashboardController extends Api {
  private readonly dashboardService = new DashboardService();

  //   Checklist
  public getChecklist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userChecklistId = (req.user as any)?.id;

      if (!userChecklistId) {
        return this.send(
          res,
          null,
          HttpStatusCode.NotFound,
          "User is not authenticated"
        );
      }

      const checklist = await this.dashboardService.getChecklist(
        userChecklistId
      );

      if (!checklist) {
        return this.send(
          res,
          null,
          HttpStatusCode.NotFound,
          "No checklist found"
        );
      }

      this.send(res, checklist, HttpStatusCode.Ok, "Checklist");
    } catch (e) {
      console.error("Error while fetching checklist:", e);
      next(e);
    }
  };

  public createChecklist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userChecklistId = (req.user as any)?.id;

      if (!userChecklistId) {
        return this.send(
          res,
          null,
          HttpStatusCode.NotFound,
          "User is not authenticated"
        );
      }
      const checklist = await this.dashboardService.createChecklist(
        userChecklistId,
        req.body
      );
      this.send(res, checklist, HttpStatusCode.Created, "createChecklist");
    } catch (error) {
      next(
        new HttpInternalServerError(
          "An error occurred while creating the checklist"
        )
      );
    }
  };

  public updateChecklist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const data = req.body;

      const checklist = await this.dashboardService.getChecklistById(id);

      if (!checklist) {
        return this.send(
          res,
          null,
          HttpStatusCode.NotFound,
          "Checklist with the given id is not found"
        );
      }

      const updatedChecklist = await this.dashboardService.UpdateChecklist(
        id,
        data
      );

      this.send(res, updatedChecklist, HttpStatusCode.Ok, "updateChecklist");
    } catch (error) {
      next(
        new HttpInternalServerError(
          "An error occurred while updating the checklist"
        )
      );
    }
  };

  public deleteChecklist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const deleteChecklist = await this.dashboardService.DeleteChecklist(id);

      this.send(res, deleteChecklist, HttpStatusCode.Ok, "deleteChecklist");
    } catch (error) {
      next(
        new HttpInternalServerError(
          "An error occurred while deleting the checklist"
        )
      );
    }
  };

  public checklistDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;

      const checklist = await this.dashboardService.getChecklistById(id);

      if (!checklist) {
        return this.send(
          res,
          null,
          HttpStatusCode.NotFound,
          "Checklist with the given id is not found"
        );
      }

      const checklistDetails = await this.dashboardService.GetChecklistDetails(
        id
      );

      this.send(res, checklistDetails, HttpStatusCode.Ok, "checklistChecklist");
    } catch (error) {
      next(
        new HttpNotFoundError(
          "An error occurred while retrieving the checklist"
        )
      );
    }
  };
}
