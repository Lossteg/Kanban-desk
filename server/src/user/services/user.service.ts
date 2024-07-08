import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: Partial<User>): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async findOne(where: FindOneOptions<User>): Promise<User> {
    console.log(where);
    const user = await this.userRepository.findOne(where);

    if (!user) {
      throw new NotFoundException(`There is no user with ${where}`);
    }

    return user;
  }
}
