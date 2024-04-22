import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from '../auth/dtos/login.dto';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    userDto.password = await bcrypt.hash(userDto.password, salt);

    const user = new User();
    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    user.email = userDto.email;
    user.apiKey = uuid4();
    user.password = userDto.password;

    const savedUser = await this.userRepository.save(user);
    delete savedUser.password;
    return savedUser;
  }

  async findOne(user: LoginDto): Promise<User> {
    return await this.userRepository.findOneByOrFail({ email: user.email });
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOneByOrFail({ id });
  }

  async updateSecretKey(
    id: number,
    twoFASecret: string,
  ): Promise<UpdateResult> {
    return await this.userRepository.update(
      { id },
      { twoFASecret, enable2FA: true },
    );
  }

  async disable2FA(id: number): Promise<UpdateResult> {
    return await this.userRepository.update(
      { id },
      { enable2FA: false, twoFASecret: null },
    );
  }

  async findByApiKey(apiKey: string): Promise<User> {
    return await this.userRepository.findOneByOrFail({ apiKey });
  }
}
