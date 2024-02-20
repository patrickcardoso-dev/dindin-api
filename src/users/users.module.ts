import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from '../users/user.controller';

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
