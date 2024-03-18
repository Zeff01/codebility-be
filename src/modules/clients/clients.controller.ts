import { type NextFunction, type Request } from "express";
import {
  Clients,
  Prisma,
  Projects,
  UserClients,
  type Users,
} from "@prisma/client";
import { HttpStatusCode } from "axios";
import { type CustomResponse } from "@/types/common.type";
import Api from "@/lib/api";
import {
  HttpBadRequestError,
  HttpInternalServerError,
  HttpNotFoundError,
} from "@/lib/errors";
import ClientsService from "./clients.service";

export default class ClientController extends Api {
  private readonly clientsService = new ClientsService();

  public getClients = async (
    req: Request,
    res: CustomResponse<Clients>,
    next: NextFunction,
  ) => {
    try {
      const client = await this.clientsService.getClients();
      this.send(res, client, HttpStatusCode.Ok, "Clients");
    } catch (e) {
      next(e);
    }
  };
  public getClientsById = async (
    req: Request,
    res: CustomResponse<Clients>,
    next: NextFunction,
  ) => {
    try {
      const client = await this.clientsService.getClientsById(req.params.id);
      this.send(res, client, HttpStatusCode.Ok, "Clients By Id");
    } catch (e) {
      next(e);
    }
  };

  public createClient = async (
    req: Request,
    res: CustomResponse<Clients>,
    next: NextFunction,
  ) => {
    try {
      const client = await this.clientsService.createClient(req.body);
      this.send(res, client, HttpStatusCode.Created, "createClient");
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle known request errors from Prisma
        next(new HttpBadRequestError("Bad request", [e.message]));
      } else {
        // Handle other errors
        next(
          new HttpInternalServerError(
            "An error occurred while creating the user",
          ),
        );
      }
    }
  };

  public updateClient = async (
    req: Request,
    res: CustomResponse<Clients>,
    next: NextFunction,
  ) => {
    try {
      const client = await this.clientsService.updateClient(req.body);
      this.send(res, client, HttpStatusCode.Ok, "Update Client");
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

  // public updateUsersToClient = async (
  //   req: Request,
  //   res: CustomResponse<UserClients>,
  //   next: NextFunction,
  // ) => {
  //   try {
  //     const id = req.body.id as string;
  //     const usersClientId = req.body.usersClientId as string[];
  //     const clientsId = req.body.clientsId as string;
  //     const client = await this.clientsService.updateUsersToClient(
  //       id,
  //       usersClientId,
  //       clientsId,
  //     );
  //     this.send(res, client, HttpStatusCode.Created, "updateUsersToClient");
  //   } catch (e) {
  //     if (e instanceof Prisma.PrismaClientKnownRequestError) {
  //       // Handle known request errors from Prisma
  //       next(new HttpBadRequestError("Bad request", [e.message]));
  //     } else if (e instanceof HttpNotFoundError) {
  //       // Handle not found errors (e.g., user not found)
  //       next(e);
  //     } else {
  //       // Handle other errors
  //       next(
  //         new HttpInternalServerError(
  //           "An error occurred while updating the user",
  //         ),
  //       );
  //     }
  //   }
  // };

  public archiveClientPerId = async (
    req: Request,
    res: CustomResponse<Clients>,
    next: NextFunction,
  ) => {
    try {
      const client = await this.clientsService.archiveClientPerId(req.body);
      this.send(res, client, HttpStatusCode.Ok, "archiveClientPerId");
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
}
