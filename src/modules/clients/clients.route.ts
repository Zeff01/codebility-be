import { Router } from "express";
import Controller from "./clients.controller";

import RequestValidator from "@/middlewares/request-validator";

import { CreateClientDto, UpdateClientDto } from "@/dto/client.dto";
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
    controller.createClient
  );

clients.patch(
  "/",
  verifyAuthAdminToken,
  RequestValidator.validate(UpdateClientDto),
  controller.updateClient
);
clients.delete("/:id", verifyAuthAdminToken, controller.deleteClientPerId);
export default clients;
