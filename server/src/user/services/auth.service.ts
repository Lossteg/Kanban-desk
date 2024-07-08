import { LoginDto } from './../dto/login.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserService } from './user.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { instanceToPlain } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private jwtService: JwtService) {}

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
    // return {
    //     access_token: this.jwtService.sign({
    //         user: user, sub: 1
    //     })
    // };
  }

  async register(signUpDto: SignUpDto): Promise<User> {
    const user = await this.userService.create(signUpDto);
    instanceToPlain(user) as User;

    return user;
  }
}
