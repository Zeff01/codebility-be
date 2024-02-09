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

  public async createClient(data: CreateClientDto) {
    try {
      return await prisma.clients.create({
        data: {
          company_name: data.company_name,
          company_logo: data.company_logo,
          working_hours: data.working_hours,
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
        "An error occurred while creating the user",
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
        "An error occurred while updating the user",
      );
    }
  }
}
