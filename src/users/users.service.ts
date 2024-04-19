import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from '../auth/dtos/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    userDto.password = await bcrypt.hash(userDto.password, salt);
    const user = await this.userRepository.save(userDto);
    delete user.password;
    return user;
  }

  async findOne(user: LoginDto): Promise<User> {
    return this.userRepository.findOneByOrFail({ email: user.email });
  }
}
