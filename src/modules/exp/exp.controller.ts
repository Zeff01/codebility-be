import Api from "@/lib/api";
import { type NextFunction, type Request } from "express";
import ExpService from "./exp.service";
import { type CustomResponse } from "@/types/common.type";
import {
  Prisma,
  Levels,
  Threshold,
  UserTypeEnum,
  Points,
  Users,
} from "@prisma/client";
import { HttpStatusCode } from "axios";

interface User {
  id: string;
}

export default class ExpController extends Api {
  private readonly expService = new ExpService();

  public createLevels = async (
    req: Request & { user: User },
    res: CustomResponse<Levels>,
    next: NextFunction
  ) => {
    try {
      console.log(req.user.id);
      const result = await this.expService.createLevels(
        req.body,
        req.user.id as string
      );
      this.send(res, result, HttpStatusCode.Created, "Created Level");
    } catch (e) {
      next(e);
    }
  };
  public getAllLevels = async (
    req: Request,
    res: CustomResponse<Levels>,
    next: NextFunction
  ) => {
    try {
      const result = await this.expService.getAllLevels();
      this.send(res, result, HttpStatusCode.Created, "Get Level");
    } catch (e) {
      next(e);
    }
  };

  public updateLevels = async (
    req: Request & { user: User },
    res: CustomResponse<Levels>,
    next: NextFunction
  ) => {
    try {
      const result = await this.expService.updateLevels(
        req.body,
        req.params.id as string,
        req.user.id as string
      );
      this.send(res, result, HttpStatusCode.Created, "Updated Level");
    } catch (e) {
      next(e);
    }
  };
  //TODO Delete Levels if not in used

  //TODO Threshold CRUD

  public createThreshold = async (
    req: Request & { user: User },
    res: CustomResponse<Threshold>,
    next: NextFunction
  ) => {
    try {
      const result = await this.expService.createThreshold(
        req.body,
        req.user.id as string
      );
      this.send(res, result, HttpStatusCode.Created, "Created Threshold");
    } catch (e) {
      next(e);
    }
  };

  public getThreshold = async (
    req: Request,
    res: CustomResponse<Threshold>,
    next: NextFunction
  ) => {
    try {
      const result = await this.expService.getThreshold();
      this.send(res, result, HttpStatusCode.Created, "Get Thresholds");
    } catch (e) {
      next(e);
    }
  };
  public updateThreshold = async (
    req: Request & { user: User },
    res: CustomResponse<Threshold>,
    next: NextFunction
  ) => {
    try {
      const result = await this.expService.updateThreshold(
        req.body,
        req.params.id as string,
        req.user.id as string
      );
      this.send(res, result, HttpStatusCode.Created, "Updated Threshold");
    } catch (e) {
      next(e);
    }
  };
  //TODO ADD Points POST

  public getActiveUsers = async (
    req: Request,
    res: CustomResponse<Users>,
    next: NextFunction
  ) => {
    try {
      const result = await this.expService.getActiveUsers();
      this.send(res, result, HttpStatusCode.Created, "Get Active Users");
    } catch (e) {
      next(e);
    }
  };

  public addPoints = async (
    req: Request & { user: User },
    res: CustomResponse<Points>,
    next: NextFunction
  ) => {
    try {
      const result = await this.expService.addPoints(
        req.body,
        req.user.id as string
      );
      this.send(res, result, HttpStatusCode.Created, "Points added");
    } catch (e) {
      next(e);
    }
  };

  //TODO Warning Points --Deduct to All EXP
  //TODO Leaderboards

  public getLeaderboard = async (
    req: Request,
    res: CustomResponse<Users>,
    next: NextFunction
  ) => {
    try {
      const result = await this.expService.getLeaderboard();
      this.send(res, result, HttpStatusCode.Created, "Leaderboards");
    } catch (e) {
      next(e);
    }
  };

  //TODO Points Earned History
  //TODO Integrate to KANBAN
}
