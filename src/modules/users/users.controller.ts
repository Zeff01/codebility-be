import { type NextFunction, type Request } from "express";
import { Prisma, Work_Experience, type Users } from "@prisma/client";
import { HttpStatusCode } from "axios";
import UserService from "./users.service";
import { type CustomResponse } from "@/types/common.type";
import Api from "@/lib/api";
import {
  HttpBadRequestError,
  HttpInternalServerError,
  HttpNotFoundError,
} from "@/lib/errors";

export default class UserController extends Api {
  private readonly userService = new UserService();

  public getAllUsers = async (
    req: Request,
    res: CustomResponse<Users>,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.getAllUsers(req.body);
      this.send(res, user, HttpStatusCode.Ok, "getAllUsers");
    } catch (e) {
      next(e);
    }
  };

  public createUser = async (
    req: Request,
    res: CustomResponse<Users>,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.createUser(req.body);
      this.send(res, user, HttpStatusCode.Created, "createUser");
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

  public getAdminInfo = async (
    req: Request,
    res: CustomResponse<Users>,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.getAdminInfo(req.body);
      this.send(res, user, HttpStatusCode.Created, "getAdminInfo");
    } catch (e) {
      next(e);
    }
  };

  public login = async (
    req: Request,
    res: CustomResponse<Users>,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.login(req.body);
      this.send(res, user, HttpStatusCode.Created, "login");
    } catch (e) {
      next(e);
    }
  };

  public updateUser = async (
    req: Request,
    res: CustomResponse<Users>,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id as string;
      const updateData = req.body;
      const user = await this.userService.updateUser(id, updateData);
      this.send(res, user, HttpStatusCode.Ok, "updateUser");
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

  public getUserInterns = async (
    req: Request,
    res: CustomResponse<Users>,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.getUserInterns();
      this.send(res, user, HttpStatusCode.Ok, "Intern List");
    } catch (e) {
      next(e);
    }
  };

  public getUserMentors = async (
    req: Request,
    res: CustomResponse<Users>,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.getUserMentors();
      this.send(res, user, HttpStatusCode.Ok, "Mentor List");
    } catch (e) {
      next(e);
    }
  };

  public getUserById = async (
    req: Request,
    res: CustomResponse<Users>,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.getUserById(req.params.id as string);
      if (!user) {
        throw new HttpNotFoundError("User not found");
      }
      this.send(res, user, HttpStatusCode.Ok, "getUserById");
    } catch (e) {
      next(e);
    }
  };

  public changeUserPassword = async (
    req: Request,
    res: CustomResponse<Users>,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id as string;
      const { oldPassword, newPassword } = req.body;
      const user = await this.userService.changeUserPassword(
        id,
        oldPassword,
        newPassword
      );
      this.send(res, user, HttpStatusCode.Ok, "Password updated successfully");
    } catch (e) {
      next(e);
    }
  };

  public getUserByTeam = async (
    req: Request,
    res: CustomResponse<Users>,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.getUserByTeam(req.params.position);
      this.send(res, user, HttpStatusCode.Ok, "getUserByTeam");
    } catch (e) {
      next(e);
    }
  };

  public forgotPassword = async (
    req: Request,
    res: CustomResponse<Users>,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.forgotPassword(
        req.body.email_address
      );

      this.send(res, user, HttpStatusCode.Ok, "forgotPassword");
    } catch (e) {
      next(e);
    }
  };

  public addWorkExp = async (
    req: Request,
    res: CustomResponse<Work_Experience>,
    next: NextFunction
  ) => {
    try {
      const workexp = await this.userService.addWorkExp(req.body);
      this.send(
        res,
        workexp,
        HttpStatusCode.Ok,
        "Work experience added successfully"
      );
    } catch (e) {
      next(e);
    }
  };

  public getWorkExpPerUser = async (
    req: Request,
    res: CustomResponse<Work_Experience>,
    next: NextFunction
  ) => {
    try {
      const workexp = await this.userService.getWorkExpPerUser(req.params.id);
      this.send(res, workexp, HttpStatusCode.Ok, "getWorkExpPerUser");
    } catch (e) {
      next(e);
    }
  };
  public updateWorkExp = async (
    req: Request,
    res: CustomResponse<Work_Experience>,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id as string;
      const data = req.body;
      const workExp = await this.userService.updateWorkExp(id, data);
      this.send(
        res,
        workExp,
        HttpStatusCode.Ok,
        "Work experience updated successfully"
      );
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle known request errors from Prisma
        next(new HttpBadRequestError("Bad request", [e.message]));
      } else if (e instanceof HttpNotFoundError) {
        // Handle not found errors (e.g., work exp not found)
        next(e);
      } else {
        // Handle other errors
        next(
          new HttpInternalServerError(
            "An error occurred while updating user work experience."
          )
        );
      }
    }
  };

  public deleteWorkExp = async (
    req: Request,
    res: CustomResponse<Work_Experience>,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id as string;
      const workExp = await this.userService.deleteWorkExp(id, req.body);
      this.send(
        res,
        workExp,
        HttpStatusCode.Ok,
        "Work experience deleted successfully"
      );
    } catch (e) {
      next(e);
    }
  };

  public getuserbyusertypeapplicant = async (
    req: Request,
    res: CustomResponse<Work_Experience>,
    next: NextFunction
  ) => {
    try {
      const applicant = await this.userService.getuserbyusertypeapplicant();
      this.send(res, applicant, HttpStatusCode.Ok, "getApplicantList");
    } catch (e) {
      next(e);
    }
  };

  public getuserapplicantPerUser = async (
    req: Request,
    res: CustomResponse<Users>,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id as string;
      if (id.length != 24) {
        throw new HttpInternalServerError(`id is not correct format ${id}`);
      }
      const users = await this.userService.getuserapplicantPerUser(id);
      this.send(res, users, HttpStatusCode.Ok, "getApplicantUser");
    } catch (e) {
      next(e);
    }
  };

  public updateuserapplicantPerUser = async (
    req: Request,
    res: CustomResponse<Users>,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id as string;
      const data = req.body;
      const resData = await this.userService.updateuserapplicantPerUser(
        id,
        data
      );
      this.send(res, resData, HttpStatusCode.Ok, "acceptApplicantUser");
    } catch (e) {
      next(e);
    }
  };
}
