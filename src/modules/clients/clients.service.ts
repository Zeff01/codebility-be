import prisma from "@/lib/prisma";

import { HttpInternalServerError } from "@/lib/errors";

import { CreateClientDto, UpdateClientDto } from "@/dto/client.dto";

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
      include: { projects: true },
      // {select:{project_name:true},
      // users:{select:{name:true}}
    });
  }
  public async getClientsById(id: string) {
    return await prisma.clients.findFirst({
      where: {
        id: id,
      },
      include: { projects: true },
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
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while creating the client"
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
          updated_at: new Date(),
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while updating the client"
      );
    }
  }
  public async deleteClientPerId(id: string) {
    try {
      return await prisma.clients.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while deleting the client"
      );
    }
  }
}
