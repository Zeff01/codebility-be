import { Router } from "express";
import passport from "passport";
import Controller from "./auth.controller";

const auth: Router = Router();
const controller = new Controller();

auth.route("/google").get(controller.googleLogin);

auth.route("/google/callback").get(
  passport.authenticate("google", {
    failureRedirect: "/signin",
  }),
  controller.googleCallback,
);

auth.route("/login/success").get(controller.googleLoginSuccess);

auth.route("/login/failed").get(controller.googleLoginFailed);

/*auth.route("/login/success").get((req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});*/

/*auth.route("/login/failed").get((req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});*/

export default auth;
