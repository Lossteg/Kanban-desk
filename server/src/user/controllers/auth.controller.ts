import { AuthService } from './../services/auth.service';
import {
  Controller,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
  Body,
  Get,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Request, Response } from 'express';
import { LoginDto } from '../dto/login.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { User } from '../entities/user.entity';
// import { UserExistencePipe } from '../pipes/user-existance.pipe';
import { GoogleAuthGuard } from '../guards/google-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TokenInterceptor)
  login(@Body() loginDto: LoginDto, @Req() req: Request) {
    return req.user;
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(TokenInterceptor)
  register(@Body() signUpDto: SignUpDto): Promise<User> {
    return this.authService.register(signUpDto);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async callback(@Req() req: Request, @Res() res: Response) {
    // const jwt = await this.authService.login(req.user);
    // res.set('authorization', jwt.access_token)
    res.json(req.user);
  }

  @Get('test-route')
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  async test(@Res() res: Response) {
    console.log("inside a test-route!");
    res.json('success');
  }
}
