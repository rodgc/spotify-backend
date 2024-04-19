import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(loginDto: LoginDto): Promise<User> {
    const user = await this.usersService.findOne(loginDto);
    const passwordMatched = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (passwordMatched) {
      delete user.password;
      return user;
    }

    throw new UnauthorizedException('Password does not match');
  }
}
