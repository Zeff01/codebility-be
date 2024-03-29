import prisma from "@/lib/prisma";

import { HttpInternalServerError } from "@/lib/errors";

import {
  CreateClientDto,
  UpdateClientDto,
  UpdateClientsToArchiveDto,
} from "@/dto/client.dto";
import { ClientStatusEnum } from "@prisma/client";

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

  public async getClients() {
    return await prisma.clients.findMany({
      where: { statusType: { not: "ARCHIVE" } },
      include: { users: true, project: true },

      // {select:{project_name:true},
      // users:{select:{name:true}}
    });
  }
  public async getClientsById(id: string) {
    return await prisma.clients.findFirst({
      where: {
        id: id,
      },
      include: { users: true },
    });
  }

  public async createClient(data: CreateClientDto) {
    try {
      return await prisma.clients.create({
        data: {
          company_name: data.company_name,
          company_logo: data.company_logo,
          client_start_time: data.client_start_time,
          client_end_time: data.client_end_time,
          email: data.email,
          contact_number: data.contact_number,
          linkedin_link: data.linkedin_link,
          location: data.location,
          company_hist: data.company_hist,
        },
        include: {
          project: true,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while creating the client",
      );
    }
  }

  public async updateClient(data: UpdateClientDto) {
    const { id, ...updateData } = data;
    try {
      return await prisma.clients.update({
        where: {
          id,
        },
        data: {
          ...updateData,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while updating the client",
      );
    }
  }
  // public async updateUsersToClient(
  //   id: string,
  //   usersClientId: string[],
  //   clientsId: string,
  //   //  data: UpdateClientDto
  // ) {
  //   // const { ...updateData } = data;
  //   try {
  //     return await prisma.userClients.update({
  //       where: {
  //         id: id,
  //       },
  //       data: {
  //         // user_id: data.user_id,
  //         // projectId: data.projectId

  //         usersClientId: usersClientId,
  //         clientsId: clientsId,
  //         // summary:data.summary,
  //         // live_link: data.live_link,
  //         // project_thumbnail: data.project_thumbnail,
  //       },
  //       //  include: { UserProjects: true },
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     throw new HttpInternalServerError(
  //       "An error occurred while updating the client",
  //     );
  //   }
  // }

  public async archiveClientPerId(data: UpdateClientsToArchiveDto) {
    try {
      return await prisma.clients.update({
        where: {
          id: data.id,
        },
        data: { statusType: ClientStatusEnum[data.statusType] },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while deleting the client",
      );
    }
  }
}
