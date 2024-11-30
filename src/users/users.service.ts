import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { ICreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/database.service';
import { IUser } from './type';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(createUserDto: ICreateUserDto): Promise<IUser> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const user = await this.prisma.user.create({
        data: { ...createUserDto, password: hashedPassword },
      });

      return user;
    } catch (err) {
      throw new Error(err);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
