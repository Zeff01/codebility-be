import prisma from "@/lib/prisma";
import { HttpNotFoundError } from "@/lib/errors";

export default class PrismaUserService {
  /*  public async getUserById(id: string) {
    return prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }*/

  public async getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  public async updateUserById(email: string, updateBody: any) {
    const userEmail = await this.getUserByEmail(email);

    if (!userEmail) {
      throw new HttpNotFoundError("User not found");
    }
    Object.assign(userEmail, updateBody);
    return prisma.user.update({
      where: {
        email: email,
      },
      data: updateBody,
    });
  }
}
