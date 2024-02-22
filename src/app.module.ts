import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { PrismaModule } from './database/prisma.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}
