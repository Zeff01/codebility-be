// import catchAsync from "@/utils/catchAsync";

// import PrismaUserService from "./user.service";
// import { HttpNotFoundError } from "@/lib/errors";
// import Api from "@/lib/api";

// export default class GoogleUserController extends Api {
//   private readonly prismaUserService = new PrismaUserService();

  // public updateProfile = catchAsync(async (req, res) => {
  //   const result = await this.prismaUserService.updateProfile(
  //     req.params.id,
  //     req.body,
  //   );
  //   res.send(result);
  // });

  // public getUsers = catchAsync(async (req, res) => {
  //   const result = await this.prismaUserService.queryUsers();
  //   res.send(result);
  // });

  // public getUser = catchAsync(async (req, res) => {
  //   const user = await this.prismaUserService.getUserByEmail(req.params.email);
  //   if (!user) {
  //     throw new HttpNotFoundError("User not found");
  //   }
  //   res.send(user);
  // });

  // public updateGoogleUser = catchAsync(async (req, res) => {
  //   const user = await this.prismaUserService.updateUserById(
  //     req.params.email,
  //     req.body,
  //   );
  //   res.send(user);
  // });
}
