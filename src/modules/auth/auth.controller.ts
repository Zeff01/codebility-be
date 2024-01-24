import PrismaUserService from "@/modules/google/user/user.service";
import passport from "passport";
import catchAsync from "@/utils/catchAsync";

export default class Auth {
  private readonly prismaUserService = new PrismaUserService();

  public googleLogin = passport.authenticate("google");

  public googleCallback = catchAsync(async (req, res) => {
    res.redirect(`${process.env.APP_BASE_API}/dashboard`);
  });

  public googleLoginSuccess = catchAsync(async (req, res) => {
    if (req.user) {
      res.status(200).json({
        error: false,
        message: "Successfully Logged In",
        user: req.user,
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
