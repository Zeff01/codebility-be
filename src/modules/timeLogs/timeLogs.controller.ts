import { type NextFunction, type Request } from "express";
import { type time_logs } from "@prisma/client";
import { HttpStatusCode } from "axios";
import TimeLogsService from "./timeLogs.service";
import { type CustomResponse } from "@/types/common.type";
import Api from "@/lib/api";

export default class TimeLogsController extends Api {
  private readonly timeLogsService = new TimeLogsService();

  // public getTimeLogs = async (
  //   req: Request,
  //   res: CustomResponse<time_logs>,
  //   next: NextFunction
  // ) => {
  //   try {
  //     const time_logs = await this.timeLogsService.getTimeLogs(req.body);
  //     this.send(res, time_logs, HttpStatusCode.Ok, "getTimeLogs");
  //   } catch (e) {
  //     next(e);
  //   }
  // };

  public getLogs = async (
    req: Request,
    res: CustomResponse<time_logs>,
    next: NextFunction
  ) => {
    console.log(req.body);
    try {
      const logs = await this.timeLogsService.getLogs(req.body);
      this.send(res, logs, HttpStatusCode.Ok, "getUsers");
    } catch (e) {
      next(e);
    }
  };

  public createTimeOut = async (
    req: Request,
    res: CustomResponse<time_logs>,
    next: NextFunction
  ) => {
    try {
      const logs = await this.timeLogsService.createTimeOut(req.body);
      this.send(res, logs, HttpStatusCode.Created, "createTimeOut");
    } catch (e) {
      next(e);
    }
  };

  public createTimeIn = async (
    req: Request,
    res: CustomResponse<time_logs>,
    next: NextFunction
  ) => {
    try {
      const logs = await this.timeLogsService.createTimeIn(req.body);
      this.send(res, logs, HttpStatusCode.Created, "createTimeIn");
    } catch (e) {
      next(e);
    }
  };

  public getLogsByUserId = async (
    req: Request,
    res: CustomResponse<time_logs>,
    next: NextFunction
  ) => {
    console.log(req.body);
    try {
      const logs = await this.timeLogsService.getLogsByUserId(
        req.params.id as string
      );
      this.send(res, logs, HttpStatusCode.Ok, "getLogsByUserId");
    } catch (e) {
      next(e);
    }
  };

  // public getAdminInfo = async (
  //   req: Request,
  //   res: CustomResponse<Users>,
  //   next: NextFunction
  // ) => {
  //   try {
  //     const user = await this.userService.getAdminInfo(req.body);
  //     this.send(res, user, HttpStatusCode.Created, "getAdminInfo");
  //   } catch (e) {
  //     next(e);
  //   }
  // };

  // public login = async (
  //   req: Request,
  //   res: CustomResponse<Users>,
  //   next: NextFunction
  // ) => {
  //   try {
  //     const user = await this.userService.login(req.body);
  //     this.send(res, user, HttpStatusCode.Created, "login");
  //   } catch (e) {
  //     next(e);
  //   }
  // };

  // public updateUser = async (
  //   req: Request,
  //   res: CustomResponse<Users>,
  //   next: NextFunction
  // ) => {
  //   try {
  //     const user = await this.userService.updateUser(
  //       (req.params?.id as string) && req.body
  //     );
  //     this.send(res, user, HttpStatusCode.Created, "updateUser");
  //   } catch (e) {
  //     next(e);
  //   }
  // };

  // // public createMember = async (
  // //   req: Request,
  // //   res: CustomResponse<users>,
  // //   next: NextFunction
  // // ) => {
  // //   try {
  // //     const user = await this.userService.createMember(req.body);
  // //     this.send(res, user, HttpStatusCode.Created, 'createMember');
  // //   } catch (e) {
  // //     next(e);
  // //   }
  // // };

  // public getUserInterns = async (
  //   req: Request,
  //   res: CustomResponse<Users>,
  //   next: NextFunction
  // ) => {
  //   try {
  //     const user = await this.userService.getUserInterns();
  //     this.send(res, user, HttpStatusCode.Ok, "getUserInterns");
  //   } catch (e) {
  //     next(e);
  //   }
  // };

  // public getUserMentors = async (
  //   req: Request,
  //   res: CustomResponse<Users>,
  //   next: NextFunction
  // ) => {
  //   try {
  //     const user = await this.userService.getUserMentors();
  //     this.send(res, user, HttpStatusCode.Ok, "getUserMentors");
  //   } catch (e) {
  //     next(e);
  //   }
  // };

  // public getUserById = async (
  //   req: Request,
  //   res: CustomResponse<Users>,
  //   next: NextFunction
  // ) => {
  //   try {
  //     const user = await this.userService.getUserById(req.params.id as string);
  //     this.send(res, user, HttpStatusCode.Ok, "getUserById");
  //   } catch (e) {
  //     next(e);
  //   }
  // };
}
