import { CreateChecklistDto, UpdateChecklistDto } from "@/dto/dashboard.dto";
import { HttpInternalServerError, HttpNotFoundError } from "@/lib/errors";
import prisma from "@/lib/prisma";

export default class DashboardService {
  //Checklist
  public async getChecklist(userChecklistId: string) {
    return await prisma.checklist.findMany({
      where: {
        userChecklistId,
      },
      select: {
        id: true,
        title: true,
        full_description: true,
        accomplished: true,
        due_time: true,
      },
    });
  }

  public async createChecklist(userId: string, data: CreateChecklistDto) {
    try {
      return await prisma.checklist.create({
        data: {
          title: data.title,
          full_description: data.full_description,
          due_time: data.due_time,
          userChecklist: {
            connect: { id: userId },
          },
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError(
        "An error occurred while creating the checklist"
      );
    }
  }

  public async getChecklistById(id: string) {
    try {
      const checklist = await prisma.checklist.findUnique({
        where: {
          id,
        },
      });

      if (!checklist) {
        throw new HttpNotFoundError(
          "The checklist with the provided ID was not found."
        );
      }

      return checklist;
    } catch (error) {
      throw new HttpInternalServerError(
        "An error occurred while retrieving the checklist."
      );
    }
  }

  public async UpdateChecklist(id: string, data: UpdateChecklistDto) {
    try {
      const { ...updateData } = data;
      return await prisma.checklist.update({
        where: {
          id,
        },
        data: {
          ...updateData,
        },
      });
    } catch (error) {
      throw new HttpInternalServerError(
        "An error occurred while updating the checklist"
      );
    }
  }

  public async DeleteChecklist(id: string) {
    try {
      return await prisma.checklist.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new HttpInternalServerError(
        "An error occurred while deleting the checklist"
      );
    }
  }

  public async GetChecklistDetails(id: string) {
    return await prisma.checklist.findUnique({
      where: {
        id,
      },
      select: {
        title: true,
        full_description: true,
        accomplished: true,
        due_time: true,
      },
    });
  }
}
