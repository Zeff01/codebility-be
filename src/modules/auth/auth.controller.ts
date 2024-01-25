import passport from "passport";
import { HttpStatusCode } from "axios";

import catchAsync from "@/utils/catchAsync";
import JwtUtil from "@/lib/jwt";

export default class Auth {
  public googleLogin = passport.authenticate("google");

  public googleCallback = catchAsync(async (req: any, res) => {
    const token = JwtUtil.generateToken(req.user);
    res.cookie("x-auth-cookie", token);
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  });

  public googleLoginSuccess = catchAsync(async (req, res) => {
    if (req.cookies) {
      res.status(HttpStatusCode.Ok).json({
        success: true,
        message: "Successfully Logged In",
        data: req.user,
      });
    } else {
      res.status(403).json({ error: true, message: "Not Authorized" });
    }
  });

  public googleLoginFailed = catchAsync(async (req, res) => {
    res.status(401).json({
      error: true,
      message: "Log in failure",
    });
  });
}
