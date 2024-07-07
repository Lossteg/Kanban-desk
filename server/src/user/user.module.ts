import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { LocalStrategy } from './strategies/local.strategy';
import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [UserService, AuthService, LocalStrategy],
})
export class UserModule {}
