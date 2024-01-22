import catchAsync from "@/utils/catchAsync";

import PrismaUserService from "./user.service";

export default class GoogleUserController {
  private readonly prismaUserService = new PrismaUserService();

  public updateProfile = catchAsync(async (req, res) => {
    const result = await this.prismaUserService.updateProfile(
      req.params.id,
      req.body,
    );
    res.send(result);
  });
  public getUsers = catchAsync(async (req, res) => {
    const result = await this.prismaUserService.queryUsers();
    res.send(result);
  });

  public updateGoogleUser = catchAsync(async (req, res) => {
    const user = await this.prismaUserService.updateUserById(
      req.params.email,
      req.body,
    );
    res.send(user);
  });
}
