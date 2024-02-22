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

    const userEmailExists = await this.prismaService.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    })

    if (userEmailExists) {
      throw new HttpException("E-mail already registered", HttpStatus.BAD_REQUEST);
    }

    const encryptedPassword = await bcrypt.hash(createUserDto.password, 10);

    await this.prismaService.user.create({
      data: {
        ...createUserDto, 
        password: encryptedPassword
      }
    })

    return {...createUserDto, password: ""};
  }

  async findOne(email: string) {
    if (!email) {
      throw new HttpException("Missing e-mail", HttpStatus.BAD_REQUEST);
    }

    const userExists = await this.prismaService.user.findUnique({
      where: { email }
    })

    if (!userExists) {
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
    }

    return { ...userExists }
  }

  async update(id: string, updateUserDto: UpdateUsersDto) {
    if (!id) {
      throw new HttpException("Missing id", HttpStatus.BAD_REQUEST);
    }
    
    const userExists = await this.prismaService.user.findUnique({
      where: { id },
    })

    if (!userExists) {
      throw new HttpException(`User id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    
    if (!updateUserDto) {
      throw new HttpException("Missing data", HttpStatus.BAD_REQUEST);
    }

    const emailExists = await this.prismaService.user.findUnique({
      where: {
        email: updateUserDto.email,
      },
    })

    if (emailExists) {
      throw new HttpException("E-mail already registered", HttpStatus.BAD_REQUEST);
    }

    await this.prismaService.user.update({
      data: updateUserDto,
      where: {id}
    })

    return {...updateUserDto};
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
