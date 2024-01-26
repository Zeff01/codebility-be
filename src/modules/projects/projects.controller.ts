import { type NextFunction, type Request } from "express";
import { Prisma, Projects, type Users } from "@prisma/client";
import { HttpStatusCode } from "axios";
import ProjectService from "./projects.service";
import { type CustomResponse } from "@/types/common.type";
import Api from "@/lib/api";
import {
  HttpBadRequestError,
  HttpInternalServerError,
  HttpNotFoundError,
} from "@/lib/errors";
import ProjectsService from "./projects.service";
import projects from "./projects.route";

export default class ProjectController extends Api {
  private readonly projectsService = new ProjectsService();

  public getProjects = async (
    req: Request,
    res: CustomResponse<Projects>,
    next: NextFunction
  ) => {
    try {
      const project = await this.projectsService.getProjects(req.body);
      this.send(res, project, HttpStatusCode.Ok, "Projects");
    } catch (e) {
      next(e);
    }
  };

  public createProject = async (
    req: Request,
    res: CustomResponse<Projects>,
    next: NextFunction
  ) => {
    try {
      const project = await this.projectsService.createProject(req.body);
      this.send(res, project, HttpStatusCode.Created, "createProject");
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle known request errors from Prisma
        next(new HttpBadRequestError("Bad request", [e.message]));
      } else {
        // Handle other errors
        next(
          new HttpInternalServerError(
            "An error occurred while creating the user"
          )
        );
      }
    }
  };

  //   public getAdminInfo = async (
  //     req: Request,
  //     res: CustomResponse<Users>,
  //     next: NextFunction
  //   ) => {
  //     try {
  //       const user = await this.userService.getAdminInfo(req.body);
  //       this.send(res, user, HttpStatusCode.Created, "getAdminInfo");
  //     } catch (e) {
  //       next(e);
  //     }
  //   };

  //   public login = async (
  //     req: Request,
  //     res: CustomResponse<Users>,
  //     next: NextFunction
  //   ) => {
  //     try {
  //       const user = await this.userService.login(req.body);
  //       this.send(res, user, HttpStatusCode.Created, "login");
  //     } catch (e) {
  //       next(e);
  //     }
  //   };

  public updateProject = async (
    req: Request,
    res: CustomResponse<Projects>,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id as string;
      const userId = req.body.userId;
      const updateData = req.body;
      const project = await this.projectsService.updateProject(
        id,
        userId,
        updateData
      );
      this.send(res, project, HttpStatusCode.Ok, "updateUser");
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
            "An error occurred while updating the user"
          )
        );
      }
    }
  };

  //   public getUserInterns = async (
  //     req: Request,
  //     res: CustomResponse<Users>,
  //     next: NextFunction
  //   ) => {
  //     try {
  //       const user = await this.userService.getUserInterns();
  //       this.send(res, user, HttpStatusCode.Ok, "Intern List");
  //     } catch (e) {
  //       next(e);
  //     }
  //   };

  //   public getUserMentors = async (
  //     req: Request,
  //     res: CustomResponse<Users>,
  //     next: NextFunction
  //   ) => {
  //     try {
  //       const user = await this.userService.getUserMentors();
  //       this.send(res, user, HttpStatusCode.Ok, "Mentor List");
  //     } catch (e) {
  //       next(e);
  //     }
  //   };

  //   public getUserById = async (
  //     req: Request,
  //     res: CustomResponse<Users>,
  //     next: NextFunction
  //   ) => {
  //     try {
  //       const user = await this.userService.getUserById(req.params.id as string);
  //       if (!user) {
  //         throw new HttpNotFoundError("User not found");
  //       }
  //       this.send(res, user, HttpStatusCode.Ok, "getUserById");
  //     } catch (e) {
  //       next(e);
  //     }
  //   };

  //   public changeUserPassword = async (
  //     req: Request,
  //     res: CustomResponse<Users>,
  //     next: NextFunction
  //   ) => {
  //     try {
  //       const id = req.params.id as string;
  //       const { oldPassword, newPassword } = req.body;
  //       const user = await this.userService.changeUserPassword(
  //         id,
  //         oldPassword,
  //         newPassword
  //       );
  //       this.send(res, user, HttpStatusCode.Ok, "Password updated successfully");
  //     } catch (e) {
  //       next(e);
  //     }
  //   };

  //   public getUserByTeam = async (
  //     req: Request,
  //     res: CustomResponse<Users>,
  //     next: NextFunction
  //   ) => {
  //     try {
  //       const user = await this.userService.getUserByTeam(
  //         req.params.position as string
  //       );
  //       this.send(res, user, HttpStatusCode.Ok, "getUserByTeam");
  //     } catch (e) {
  //       next(e);
  //     }
  //   };

  //   public forgotPassword = async (
  //     req: Request,
  //     res: CustomResponse<Users>,
  //     next: NextFunction
  //   ) => {
  //     try {
  //       const user = await this.userService.forgotPassword(
  //         req.body.email_address
  //       );

  //       this.send(res, user, HttpStatusCode.Ok, "forgotPassword");
  //     } catch (e) {
  //       next(e);
  //     }
  //   };

  //   public addWorkExp = async (
  //     req: Request,
  //     res: CustomResponse<Work_Experience>,
  //     next: NextFunction
  //   ) => {
  //     try {
  //       const workexp = await this.userService.addWorkExp(req.body);
  //       this.send(
  //         res,
  //         workexp,
  //         HttpStatusCode.Ok,
  //         "Work experience added successfully"
  //       );
  //     } catch (e) {
  //       next(e);
  //     }
  //   };

  //   public getWorkExpPerUser = async (
  //     req: Request,
  //     res: CustomResponse<Work_Experience>,
  //     next: NextFunction
  //   ) => {
  //     try {
  //       const workexp = await this.userService.getWorkExpPerUser(
  //         req.params.userid
  //       );
  //       this.send(res, workexp, HttpStatusCode.Ok, "getWorkExpPerUser");
  //     } catch (e) {
  //       next(e);
  //     }
  //   };
  //   public updateWorkExp = async (
  //     req: Request,
  //     res: CustomResponse<Work_Experience>,
  //     next: NextFunction
  //   ) => {
  //     try {
  //       const id = req.params.id as string;
  //       const data = req.body;
  //       const workExp = await this.userService.updateWorkExp(id, data);
  //       this.send(
  //         res,
  //         workExp,
  //         HttpStatusCode.Ok,
  //         "Work experience updated successfully"
  //       );
  //     } catch (e) {
  //       if (e instanceof Prisma.PrismaClientKnownRequestError) {
  //         // Handle known request errors from Prisma
  //         next(new HttpBadRequestError("Bad request", [e.message]));
  //       } else if (e instanceof HttpNotFoundError) {
  //         // Handle not found errors (e.g., work exp not found)
  //         next(e);
  //       } else {
  //         // Handle other errors
  //         next(
  //           new HttpInternalServerError(
  //             "An error occurred while updating user work experience."
  //           )
  //         );
  //       }
  //     }
  //   };

  //   public deleteWorkExp = async (
  //     req: Request,
  //     res: CustomResponse<Work_Experience>,
  //     next: NextFunction
  //   ) => {
  //     try {
  //       const id = req.params.id as string;
  //       const workExp = await this.userService.deleteWorkExp(id, req.body);
  //       this.send(
  //         res,
  //         workExp,
  //         HttpStatusCode.Ok,
  //         "Work experience deleted successfully"
  //       );
  //     } catch (e) {
  //       next(e);
  //     }
  //   };
}
