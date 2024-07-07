import { AuthService } from './../services/auth.service';
import {
  Controller,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
  Body,
  UsePipes,
} from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Request } from 'express';
import { LoginDto } from '../dto/login.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { User } from '../entities/user.entity';
import { UserExistencePipe } from '../pipes/user-existance.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto, @Req() req: Request) {
    return req.user;
  }

  @Post('register')
  @UsePipes(UserExistencePipe)
  @HttpCode(HttpStatus.CREATED)
  register(@Body() signUpDto: SignUpDto): Promise<User> {
    return this.authService.register(signUpDto);
  }
}
