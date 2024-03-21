import { type NextFunction, type Request } from "express";
import { Board, List, Prisma, type time_logs } from "@prisma/client";
import { HttpStatusCode } from "axios";
import { type CustomResponse } from "@/types/common.type";
import Api from "@/lib/api";
import BoardService from "./board.service";
import {
  HttpBadRequestError,
  HttpInternalServerError,
  HttpNotFoundError,
} from "@/lib/errors";

export default class BoardsController extends Api {
  private readonly boardsService = new BoardService();

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

  public getAllBoards = async (
    req: Request,
    res: CustomResponse<Board>,
    next: NextFunction,
  ) => {
    try {
      const boards = await this.boardsService.getAllBoards();
      this.send(res, boards, HttpStatusCode.Ok, "getAllBoards");
    } catch (e) {
      next(e);
    }
  };

  public createBoard = async (
    req: Request,
    res: CustomResponse<Board>,
    next: NextFunction,
  ) => {
    try {
      const boards = await this.boardsService.createBoard(req.body);

      this.send(res, boards, HttpStatusCode.Created, "createBoard");
    } catch (e) {
      next(e);
    }
  };

  public addUsersToBoard = async (
    req: Request,
    res: CustomResponse<Board>,
    next: NextFunction,
  ) => {
    try {
      // const projectId = req.params.projectId as string;
      // const user_id = req.body.user_id as string[];
      // const updateData = req.body;
      const project = await this.boardsService.addUsersToBoard(
        //projectId,
        // userProjectId,
        req.body,
        //updateData,
      );
      this.send(res, project, HttpStatusCode.Created, "addUsersToBoard");
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle known request errors from Prisma
        next(new HttpBadRequestError("Bad request", [e.message]));
      } else if (e instanceof HttpNotFoundError) {
        // Handle not found errors (e.g., user not found)
        next(e);
      } else {
        // Handle other errors
        next(
          new HttpInternalServerError(
            "An error occurred while updating the user",
          ),
        );
      }
    }
  };

  public createListToBoard = async (
    req: Request,
    res: CustomResponse<List>,
    next: NextFunction,
  ) => {
    try {
      const boards = await this.boardsService.createListToBoard(req.body);

      this.send(res, boards, HttpStatusCode.Created, "createListToBoard");
    } catch (e) {
      next(e);
    }
  };

  //   public createTimeIn = async (
  //     req: Request,
  //     res: CustomResponse<time_logs>,
  //     next: NextFunction,
  //   ) => {
  //     try {
  //       const logs = await this.timeLogsService.createTimeIn(req.body);
  //       console.log(logs);
  //       this.send(res, logs, HttpStatusCode.Created, "createTimeIn");
  //     } catch (e) {
  //       next(e);
  //     }
  //   };

  //   public getLogsByUserId = async (
  //     req: Request,
  //     res: CustomResponse<time_logs>,
  //     next: NextFunction,
  //   ) => {
  //     console.log(req.body);
  //     try {
  //       const logs = await this.timeLogsService.getLogsByUserId(
  //         req.params.id as string,
  //       );
  //       this.send(res, logs, HttpStatusCode.Ok, "getLogsByUserId");
  //     } catch (e) {
  //       next(e);
  //     }
  //   };

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
