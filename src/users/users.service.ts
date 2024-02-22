import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { PrismaService } from '../database/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUsersDto) {
    if (!createUserDto) {
      throw new HttpException("Missing data", HttpStatus.BAD_REQUEST);
    }

    const encryptedPassword = await bcrypt.hash(createUserDto.password, 10);

    this.prismaService.user.create({
      data: {
        ...createUserDto, 
        password: encryptedPassword
      }
    });

    return {...createUserDto, password: ""};
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(username: string): Promise<User | undefined> {
    return;
  }

  update(id: number, updateUserDto: UpdateUsersDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number): string {
    const deletedUser = this.user[id];
    this.user = this.user.filter((_, index) => index !== id);
    return `User with id ${id} deleted`;
  }
}