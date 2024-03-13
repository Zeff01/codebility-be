import { type NextFunction, type Request } from "express";
import { Prisma, Projects, UserProjects, type Users } from "@prisma/client";
import { HttpStatusCode } from "axios";

import { type CustomResponse } from "@/types/common.type";
import Api from "@/lib/api";
import {
  HttpBadRequestError,
  HttpInternalServerError,
  HttpNotFoundError,
} from "@/lib/errors";
import ProjectsService from "./projects.service";

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
  public getProjectsById = async (
    req: Request,
    res: CustomResponse<Projects>,
    next: NextFunction
  ) => {
    try {
      const project = await this.projectsService.getProjectsById(req.params.id);
      this.send(res, project, HttpStatusCode.Ok, "Project By Id");
    } catch (e) {
      next(e);
    }
  };

  public getProjectsByUserId = async (
    req: Request,
    res: CustomResponse<Projects>,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const project = await this.projectsService.getProjectsByUserId(id);

      this.send(res, project, HttpStatusCode.Ok, "getProjectsByUserId");
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

  public updateProject = async (
    req: Request,
    res: CustomResponse<Projects>,
    next: NextFunction
  ) => {
    try {
      const projectId = req.params.projectId as string;
      // const user_id = req.body.user_id as string[];
      const updateData = req.body;
      const project = await this.projectsService.updateProject(
        projectId,
        // userProjectId,

        updateData
      );
      this.send(res, project, HttpStatusCode.Ok, "updateProject");
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

  public addUsersToProject = async (
    req: Request,
    res: CustomResponse<UserProjects>,
    next: NextFunction
  ) => {
    try {
      //  const id = req.body.id as string;
      //  const user_id = req.body.user_id as string[];
      //  const updateData = req.body;
      const project = await this.projectsService.addUsersToProject(
        req.body
      );
      this.send(res, project, HttpStatusCode.Created, "addUsersToProject");
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
  public deleteProjectById = async (
    req: Request,
    res: CustomResponse<Projects>,
    next: NextFunction
  ) => {
    try {
      const project = await this.projectsService.deleteProjectById(
        req.params.id as string
      );
      this.send(res, project, HttpStatusCode.Ok, "Delete Project By Id");
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
}
