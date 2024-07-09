import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { LocalStrategy } from './strategies/local.strategy';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { PassportModule } from '@nestjs/passport';
import { Token } from './entities/token.entity';
import { TokenService } from './services/token.service';
import { TokenExtractorMiddleware } from './middleware/extract-token.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Token]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.APP_SECRET,
      signOptions: {
        expiresIn: '15m',
        algorithm: 'HS384',
      },
      verifyOptions: {
        algorithms: ['HS384'],
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    UserService,
    AuthService,
    TokenService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
  ],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenExtractorMiddleware)
      .forRoutes('auth/refresh'); 
  }
}
