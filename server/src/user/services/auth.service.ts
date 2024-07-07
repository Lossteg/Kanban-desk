import { LoginDto } from './../dto/login.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserService } from './user.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

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
    const user = await this.userService.create(signUpDto);
    instanceToPlain(user) as User;

    return user;
  }
}
