import { LoginDto } from './../dto/login.dto';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserService } from './user.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { instanceToPlain } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto): Promise<User> {
    let user: User;

    try {
      user = await this.userService.findOne({ where: { email } });
    } catch (error) {
      throw new UnauthorizedException(`There is no user with email ${email}`);
    }

    if (!(await user.checkPassword(password))) {
      throw new UnauthorizedException(
        `Wrong password for user with email: ${email}`,
      );
    }

    return user;
  }

  async register(signUpDto: SignUpDto): Promise<User> {
    try {
      const user = await this.userService.findOne({
        where: { email: signUpDto.email },
      });
      if (user) {
        throw new ConflictException(
          `The email «${signUpDto.email}» is already registered.`,
        );
      }
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        throw error;
      }
      // Если пользователь не найден, это нормально для регистрации
    }

    const user = await this.userService.create(signUpDto);
    const plainUser = instanceToPlain(user) as User;

    return plainUser;
  }

  async verifyPayload(payload: JwtPayload): Promise<User> {
    let user: User;

    try {
      user = await this.userService.findOne({ where: { email: payload.sub } });
    } catch (error) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${payload.sub}`,
      );
    }

    return user;
  }

  signToken(user: User): string {
    const payload = {
      sub: user.email,
    };

    return this.jwtService.sign(payload);
  }
}
