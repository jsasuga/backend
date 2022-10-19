import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { UpdateNameDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public async updateName(body: UpdateNameDto, req: Request): Promise<User> {
    const user: User = <User>req.user;

    user.name = body.name;

    return this.repository.save(user);
  }

  public async list(req: Request): Promise<Array<User>> {
    return this.repository.find({
      relations: ["role"]
    });
  }

  public async fetch(id: string): Promise<User> {
    return this.repository.findOne(id, {
      relations: ["role", "role.permissions"]
    });
  }
}
