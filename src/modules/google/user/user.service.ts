// import prisma from "@/lib/prisma";
// import { HttpBadRequestError, HttpNotFoundError } from "@/lib/errors";

// import { UserDto } from "@/dto/user.dto";

// export default class PrismaUserService {
//   public async getUserById(id: string) {
//     return prisma.user.findUnique({
//       where: {
//         id: id,
//       },
//       include: {
//         profile: true,
//       },
//     });
//   }

//   public async getUserByEmail(email: string) {
//     return prisma.user.findUnique({
//       where: {
//         email: email,
//       },
//       include: {
//         profile: true,
//       },
//     });
//   }

//   public async updateProfile(id: string, profileBody: any) {
//     try {
//       return prisma.profile.upsert({
//         where: { userId: id },
//         update: {
//           ...profileBody,
//         },
//         create: {
//           userId: id,
//           ...profileBody,
//         },
//       });
//     } catch (err) {
//       throw new HttpBadRequestError("Error updating profile", [err.message]);
//     }
//   }

//   public async queryUsers() {
//     return prisma.user.findMany({
//       include: {
//         profile: true,
//       },
//     });
//   }

//   public async updateUserById(email: string, updateBody: UserDto) {
//     const userEmail = await this.getUserByEmail(email);

//     if (!userEmail) {
//       throw new HttpNotFoundError("User not found");
//     }
//     Object.assign(userEmail, updateBody);
//     return prisma.user.update({
//       where: {
//         email: email,
//       },
//       data: updateBody,
//     });
//   }
// }
