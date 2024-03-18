import { Router } from "express";
import Controller from "./clients.controller";

import RequestValidator from "@/middlewares/request-validator";

import {
  CreateClientDto,
  UpdateClientDto,
  UpdateUsersToClientDto,
} from "@/dto/client.dto";
import { verifyAuthAdminToken } from "@/middlewares/auth";

const clients: Router = Router();
const controller = new Controller();

/**
 * Clients
 * @typedef {object} Clients
 * @property {string} id - id of user
 * @property {string} - company name
 * @property {string} - company_logo
 * @property {string} - working_hours
 * @property {string} - email
 * @property {string} - contact_number
 * @property {string} - linkedin_link
 * @property {string} - company_hist
 * @property {string} - created_at
 * @property {string} - updated_at
 */
/**
 * GET /clients
 * @summary Get Clients
 * @tags clients
 * @return {Clients} 200 - success response - application/json
 */
clients.get("/", controller.getClients);
clients.get("/:id", controller.getClientsById);
/**
 * POST /clients/create
 * @typedef {object} CreateClientDto
 * @property {string} company_name.required - Company Name
 * @property {string} company_logo - Logo
 * @property {string} working_hours - working hours
 * @summary Create Clients
 * @security BearerAuth
 * @tags clients
 * @return {Clients} 200 - success response - application/json
 */

clients
  .route("/create")
  .post(
    verifyAuthAdminToken,
    RequestValidator.validate(CreateClientDto),
    controller.createClient,
  );

clients.patch(
  "/",
  verifyAuthAdminToken,
  RequestValidator.validate(UpdateClientDto),
  controller.updateClient,
);

/**
 * PATCH /projects/{id}
 * @typedef {object} UpdateProjectDto
 * @summary Edit Project Info
 * @tags projects
 * @param {string} id.path - id param description
 * @property {string} project_name.required - project_name Optional
 * @property {string} github_link.required - github_link Optional
 * @property {array} userId.required - userId Optional
 * @param {UpdateUserDto} request.body.required
 * @return {Projects} 201 - project updated
 * @return {UserProjects} 200 - success response - application/json
 * @security BearerAuth
 */
clients
  .route("/update")
  .put(
    verifyAuthAdminToken,
    RequestValidator.validate(UpdateUsersToClientDto),
    controller.updateUsersToClient,
  );

clients.delete("/:id", verifyAuthAdminToken, controller.deleteClientPerId);
export default clients;
