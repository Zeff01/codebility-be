import { Router } from "express";
import Controller from "./projects.controller";

import RequestValidator from "@/middlewares/request-validator";
import { verifyAuthAdminToken } from "@/middlewares/auth";

import { CreateProjectDto, UpdateProjectDto } from "@/dto/project.dto";

const projects: Router = Router();
const controller = new Controller();

/**
 * Projects
 * @typedef {object} Projects
 * @property {string} id - id of Project
 * @property {string} clientsId - id of Client
 * @property {string} project_name - name of Client
 * @property {string} github_link - github_link of Client
 */
/**
 * UserProjects
 * @typedef {object} UserProjects
 * @property {string} id - id of UserProjects
 * @property {array} userId - User ID of UserProjects
 * @property {string} projectId - projectId of UserProjects
 */
/**
 * GET /projects
 * @summary Get Projects
 * @tags projects
 * @return {Projects} 200 - success response - application/json
 * @return {UserProjects} 200 - success response - application/json
 */
projects.get("/", controller.getProjects);
/**
 * GET /projects/:userId
 * @summary Get Projects
 * @tags projects
 * @param {string} userId.path - id param description
 * @return {Projects} 200 - success response - application/json
 * @return {UserProjects} 200 - success response - application/json
 */
projects.get("/:id", controller.getProjectsByUserId);
/**
 * POST /projects/create
 * @typedef {object} CreateProjectDto
 * @property {string} project_name.required - The project name
 * @property {string} github_link.required - The project name
 * @property {string} userId.required - Should be empty
 * @property {string} clientsId.required - Should be empty
 * @property {string} company_name.required - company_name of Client
 * @summary Create Project
 * @tags projects
 * @param {CreateUserDto} request.body.required
 * @return {Projects} 201 - project created
 * @return {UserProjects} 200 - success response - application/json
 * @security BearerAuth
 */
projects
  .route("/create")
  .post(
    verifyAuthAdminToken,
    RequestValidator.validate(CreateProjectDto),
    controller.createProject
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
projects.patch(
  "/:id",
  // verifyAuthAdminToken,
  RequestValidator.validate(UpdateProjectDto),
  controller.updateProject
);

export default projects;
