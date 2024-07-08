import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { LocalStrategy } from './strategies/local.strategy';
import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
            JwtModule.register({
              secret: process.env.JWT_SECRET,
              signOptions: {expiresIn: '15m'}
            })],
  controllers: [AuthController],
  providers: [UserService, AuthService, LocalStrategy, JwtStrategy, GoogleStrategy],
})
export class UserModule {}
