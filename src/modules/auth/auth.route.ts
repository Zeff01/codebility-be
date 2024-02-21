import { Router } from "express";
import passport from "passport";
import Controller from "./auth.controller";

const auth: Router = Router();
const controller = new Controller();

auth.route("/google").get(controller.googleLogin);

// auth.route("/google/callback").get(
//   passport.authenticate("google", {
//     failureRedirect: "/signin",
//     jwt: true,
//   }),
//   controller.googleCallback,
// );

auth.route("/login/success").get(controller.googleLoginSuccess);

auth.route("/login/failed").get(controller.googleLoginFailed);

export default auth;
