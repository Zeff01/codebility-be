import catchAsync from "@/utils/catchAsync";

import PrismaUserService from "./user.service";

export default class GoogleUserController {
  private readonly prismaUserService = new PrismaUserService();

  public updateGoogleUser = catchAsync(async (req, res) => {
    const user = await this.prismaUserService.updateUserById(
      req.params.email,
      req.body,
    );
    res.send(user);
  });
}
