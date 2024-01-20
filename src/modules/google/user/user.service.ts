import prisma from "@/lib/prisma";

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

    console.log("userEmail", userEmail);
    if (!userEmail) {
      throw new Error("User not found");
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
