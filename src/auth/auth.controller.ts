import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';

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
}
