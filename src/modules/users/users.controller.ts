import { type NextFunction, type Request } from 'express';
import { type Users } from '@prisma/client';
import { HttpStatusCode } from 'axios';
import UserService from './users.service';
import { type CustomResponse } from '@/types/common.type';
import Api from '@/lib/api';

export default class UserController extends Api {
  private readonly userService = new UserService();

  public createUser = async (
    req: Request,
    res: CustomResponse<Users>,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.createUser(req.body);
      this.send(res, user, HttpStatusCode.Created, 'createUser');
    } catch (e) {
      next(e);
    }
  };

  public getAdminInfo = async (
    req: Request,
    res: CustomResponse<Users>,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.getAdminInfo(
        req.body
      );
      this.send(res, user, HttpStatusCode.Created, 'getAdminInfo');
    } catch (e) {
      next(e);
    }
  };

  public login = async (
    req: Request,
    res: CustomResponse<Users>,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.login(req.body);
      this.send(res, user, HttpStatusCode.Created, 'login');
    } catch (e) {
      next(e);
    }
  };

  public updateUser = async (
    req: Request,
    res: CustomResponse<Users>,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.updateUser(req.params?.id as string && req.body);
      this.send(res, user, HttpStatusCode.Created, 'updateUser');
    } catch (e) {
      next(e);
    }
  };

  // public createMember = async (
  //   req: Request,
  //   res: CustomResponse<users>,
  //   next: NextFunction
  // ) => {
  //   try {
  //     const user = await this.userService.createMember(req.body);
  //     this.send(res, user, HttpStatusCode.Created, 'createMember');
  //   } catch (e) {
  //     next(e);
  //   }
  // };

  public getUsers = async (
    req: Request,
    res: CustomResponse<Users>,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.getUsers(
        req.body
      );
      this.send(res, user, HttpStatusCode.Created, 'getUsers');
    } catch (e) {
      next(e);
    }
  };

  public getUserInterns = async (
    req: Request,
    res: CustomResponse<Users>,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.getUserInterns(
        req.body
      );
      this.send(res, user, HttpStatusCode.Created, 'getUserInterns');
    } catch (e) {
      next(e);
    }
  };

  public getUserMentors = async (
    req: Request,
    res: CustomResponse<Users>,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.getUserMentors(
        req.body
      );
      this.send(res, user, HttpStatusCode.Created, 'getUserMentors');
    } catch (e) {
      next(e);
    }
  };

 
}
