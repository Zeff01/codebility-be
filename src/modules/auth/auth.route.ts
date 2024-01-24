import { Router } from "express";
import passport from "passport";

const auth: Router = Router();

auth.get("/google", passport.authenticate("google"));

auth.route("/login/success").get((req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

auth.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/signin",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("http://localhost:3000/dashboard");
  },
);
auth.route("/login/failed").get((req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

export default auth;
