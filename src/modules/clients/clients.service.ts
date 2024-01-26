import prisma from "@/lib/prisma";

import { HttpInternalServerError } from "@/lib/errors";

import { UpdateClientDto } from "@/dto/client.dto";

export default class ClientsService {
  //   public async getUser(
  //     data: Prisma.UsersWhereInput,
  //     select?: Prisma.UsersSelect
  //   ) {
  //     return await prisma.users.findFirst({
  //       where: data,
  //       select,
  //     });
  //   }

  public async getClients(id: string) {
    return await prisma.clients.findMany({
      where: {
        id,
      },
      include: { UserClients: true },
    });
  }

  public async createClient({ company_name, users_Id, clientId }) {
    try {
      return await prisma.clients.create({
        data: {
          company_name: company_name,
          users: {
            connect: {
              id: users_Id,
            },
          },
          UserClients: {
            create: { id: clientId },
          },
        },

        include: { UserClients: true },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while creating the user"
      );
    }
  }

  public async updateClient(
    id: string,
    users_Id: string,
    data: UpdateClientDto
  ) {
    try {
      return await prisma.clients.update({
        where: {
          id,
        },
        data: {
          UserClients: { update: { users_Id: users_Id } },
          company_name: data.company_name,
        },

        include: { UserClients: true },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while updating the user"
      );
    }
  }
}
