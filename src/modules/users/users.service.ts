import { type Prisma, UserTypeEnum,RoleTypeEnum, type Users, $Enums } from '@prisma/client';
import prisma from '@/lib/prisma';
import LogMessage from '@/decorators/log-message.decorator';
import { CreateUserDto, LoginAdminDto } from '@/dto/user.dto';
import { HttpNotFoundError } from '@/lib/errors';
import { GeneratorProvider } from '@/lib/bcrypt';
import JwtUtil from '@/lib/jwt';
import { JwtPayload } from '@/types/common.type';

export default class UserService {

  @LogMessage<[Users]>({ message: 'User Created' })
  public async createUser(data: CreateUserDto) {
  console.log(data);
    return await prisma.users.create({
     data: {
          name: data.name,
          address: data.address,
          email_address: data.email_address,
          github_link: data.github_link,
          portfolio_website: data.portfolio_website,
          tech_stacks: [],
          password: GeneratorProvider.generateHash(data.password),
        schedule: [],
        position: [],
        roleType: RoleTypeEnum.MENTOR,
        userType: UserTypeEnum.ADMIN,
      },
    });
  }

  public async getAdminInfo(id: string) {
    return prisma.users.findFirst({
      where: {
        id: id,
        userType: UserTypeEnum.ADMIN,
      },
    });
  }

  // public async getMemberInfo(email: string) {
  //   if (!email) throw new HttpNotFoundError('User not found.');
  //   return prisma.users.findFirst({
  //     where: {
  //       email: email,
  //       type: UserTypeEnum.USER,
  //     },
  //     include: {
  //       sessions: true,
  //       payments: true,
  //     },
  //   });
  // }

  public async login(data: LoginAdminDto) {
    console.log(data);
    try {
      const isExist = await prisma.users.findFirst({
        where: {
          email_address: {
            contains: data.email_address,
          },
          userType: {
            in: [UserTypeEnum.ADMIN, UserTypeEnum.USER],
          },
        },
      });
  
      if (!isExist) {
        throw new HttpNotFoundError('Invalid login');
      }
  
      const matchPassword = GeneratorProvider.validateHash(
        data.password,
        isExist.password!
      );
  
      if (!matchPassword) {
        throw new HttpNotFoundError('Invalid login');
      }
  
      let payload: JwtPayload 
  
      if (isExist.userType === UserTypeEnum.ADMIN) {
        // If user is an ADMIN
        payload = {
          id: isExist.id,
          email: isExist.email_address!,
          userType: isExist.userType,
        };
      } else if(isExist.userType === UserTypeEnum.USER){
        // If user is not an ADMIN
        payload = {
          id: isExist.id,
          email: isExist.email_address!,
          userType: isExist.userType,
          // Add additional properties or customize as needed
        };
      }
  
      return {
        user: isExist,
        token: JwtUtil.generateToken(payload),
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getUser(
    data: Prisma.UsersWhereInput,
    select?: Prisma.UsersSelect
  ) {
    return await prisma.users.findFirst({
      where: data,
      select,
    });
  }

  

  // @LogMessage<[users]>({ message: 'User Updated' })
  // public async updateUser(data: users) {
  //   return await prisma.users.update({
  //     where: {
  //       id: data.id,
  //     },
  //     data: {
  //       ...data,
  //       type: UserTypeEnum.FOUNDER,
  //     },
  //   });
  // }

  // @LogMessage<[users]>({ message: 'User Updated' })
  // public async createMember(data: users) {
  //   console.log(data);
  //   return prisma.users.create({
  //     data: {
  //       ...data,
  //       phone: '',
  //       type: UserTypeEnum.USER,
  //     },
  //   });
  // }
}
