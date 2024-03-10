import {
  CreateLevelsDto,
  CreatePointDto,
  CreateThresholdDto,
} from "@/dto/exp.dto";
import { HttpBadRequestError, HttpInternalServerError } from "@/lib/errors";
import prisma from "@/lib/prisma";
import {
  Prisma,
  Levels,
  Threshold,
  UserTypeEnum,
  Points,
} from "@prisma/client";
import { type NextFunction, type Request } from "express";

export default class ExpService {
  public async createLevels(data: CreateLevelsDto, creator: string) {
    if (!creator) {
      throw new HttpBadRequestError("Request Error", [
        "No admin account found",
      ]);
    }

    try {
      return prisma.levels.create({
        data: {
          name: data.name,
          created_by: creator,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError("An error occured");
    }
  }
  public async getAllLevels() {
    try {
      return prisma.levels.findMany({
        orderBy: {
          name: "asc",
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError("An error occured");
    }
  }

  public async updateLevels(
    data: CreateLevelsDto,
    id: string,
    creator: string
  ) {
    try {
      return prisma.levels.update({
        where: {
          id: id,
        },
        data: {
          ...data,
          updated_by: creator,
          updated_at: new Date(),
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError("An error occured");
    }
  }
  //TODO Delete Levels if not in used

  //TODO Threshold CRUD
  public async createThreshold(data: CreateThresholdDto, creator: string) {
    try {
      return prisma.threshold.create({
        data: {
          levelID: data.levelID,
          threshold: data.threshold,
          created_by: creator,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError("An error occured");
    }
  }
  public async getThreshold() {
    try {
      return prisma.threshold.findMany({
        include: {
          levels: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError("An error occured");
    }
  }
  public async updateThreshold(
    data: Threshold,
    levelId: string,
    creator: string
  ) {
    try {
      return prisma.threshold.update({
        where: {
          id: levelId,
        },
        data: {
          ...data,
          updated_by: creator,
          updated_at: new Date(),
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError("An error occured");
    }
  }

  //TODO Delete threshold if not in use

  //TODO ADD Points POST
  public async getActiveUsers() {
    try {
      return prisma.users.findMany({
        where: {
          userType: UserTypeEnum.USER,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError("An error occured");
    }
  }
  public async addPoints(data: CreatePointDto, creator: string) {
    try {
      return prisma.points.create({
        data: {
          userId: data.userId,
          point: data.point,
          created_by: creator,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError("An error occured");
    }
  }
  //TODO Warning Points --Deduct to All EXP
  //TODO Leaderboards

  public async getLeaderboard() {
    try {
      const points = await prisma.points.groupBy({
        by: ["userId"],
        _sum: {
          point: true,
        },

        orderBy: {
          _sum: {
            point: "desc",
          },
        },
        take: 20,
      });

      const leaderBoards = await Promise.all(
        points.map(async (point) => {
          const user = await prisma.users.findUnique({
            where: {
              id: point.userId,
            },
            select: {
              name: true,
            },
          });
          return {
            totalPoints: point._sum,
            name: user?.name ?? "Unknown",
          };
        })
      );

      const threshold = await prisma.threshold.findMany({
        select: {
          levels: {
            select: {
              name: true,
            },
          },
          threshold: true,
        },
        orderBy: {
          threshold: "desc",
        },
      });
      interface threshold {
        levels: {
          name: string;
        };
        threshold: number;
      }
      //determin current level based on threshold
      function determineLevel(
        totalPoints: number | null,
        thresholds: threshold[]
      ): string {
        const actualPoints = totalPoints ?? 0;
        console.log(actualPoints, thresholds);
        for (const threshold of thresholds) {
          if (actualPoints >= threshold.threshold) {
            return threshold.levels.name;
          }
        }
        return "Unknown"; // If no matching level
      }

      const leaderboardFinal = leaderBoards.map((user) => ({
        totalPoints: user.totalPoints.point,
        name: user.name,
        level: determineLevel(user.totalPoints.point, threshold),
      }));

      return leaderboardFinal;
    } catch (error) {
      console.error(error);
      throw new HttpInternalServerError("An error occured");
    }
  }

  //TODO Points Earned History
  //TODO Integrate to KANBAN
}
