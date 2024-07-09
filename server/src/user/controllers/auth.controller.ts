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
} from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Request, Response } from 'express';
import { LoginDto } from '../dto/login.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { GoogleAuthGuard } from '../guards/google-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RefreshTokenDto } from '../dto/refreshToken.dto';

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
  @HttpCode(HttpStatus.CREATED)
  register(@Body() signUpDto: SignUpDto) {
    return this.authService.register(signUpDto);
  }

  @Post('refresh')
  @ApiBearerAuth('jwt')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @Req() req: Request,
    @Body() refreshTokenDto: RefreshTokenDto,
  ) {
    return this.authService.refreshTokens(
      req['accessToken'],
      refreshTokenDto.refreshToken,
    );
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
    console.log('inside a test-route!');
    res.json('success');
  }
}
