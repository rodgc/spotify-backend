import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { JwtAuthGuard } from './jwt/jtw.guard';
import { Enable2FAType } from './auth.types';
import { UpdateResult } from 'typeorm';
import { ValidateTokenDto } from './dtos/validate-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('singup')
  async singup(@Body() userDto: CreateUserDto): Promise<User> {
    return await this.userService.create(userDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('enable-2fa')
  @UseGuards(JwtAuthGuard)
  async enable2FA(@Request() req): Promise<Enable2FAType> {
    return await this.authService.enable2FA(req.user.userId);
  }

  @Get('disable-2fa')
  @UseGuards(JwtAuthGuard)
  async disable2FA(@Request() req): Promise<UpdateResult> {
    return await this.authService.disable2FA(req.user.userIdF);
  }

  @Post('validate-2fa')
  @UseGuards(JwtAuthGuard)
  async validate2FA(
    @Request() req,
    @Body() validateTokenDto: ValidateTokenDto,
  ) {
    return await this.authService.validate2FAToken(
      req.user.userId,
      validateTokenDto.token,
    );
  }
}
