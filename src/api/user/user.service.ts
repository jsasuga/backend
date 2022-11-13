import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { UpdateNameDto } from './user.dto';
import { User } from './user.entity';
import { Role } from '../role/role.entity';
import { Provider } from '../provider/provider.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(Provider) private providerRepository: Repository<Provider>,
    ) {}

  public async update(id: string, body: UpdateNameDto, req: Request): Promise<User> {
    let user = await this.repository.findOne(id);

    user.name = body.name ? body.name : user.name;
    user.lastName = body.lastName ? body.lastName : user.lastName;

    if(body.roleId) {
      let role: Role = await this.roleRepository.findOne(body.roleId);
      if (!role) {
        throw new HttpException('Invalid role id', HttpStatus.BAD_REQUEST);
      }
      user.role = role;
    }
    if(body.providerId) {
      let provider: Provider;
      if (body.providerId) {
        provider = await this.providerRepository.findOne(body.providerId);
      }
      user.provider = provider;
    }

    return this.repository.save(user);
  }

  public async list(req: Request): Promise<Array<User>> {
    return this.repository.find({
      relations: ["role", "provider"]
    });
  }

  public async fetch(id: string): Promise<User> {
    let obj = await this.repository.findOne(id, {
      relations: ["role", "role.permissions", "provider", "victim"]
    });
    if (!obj) {
      throw new HttpException('Object not found', HttpStatus.NOT_FOUND);
    }
    return obj; 
  }

  public async listByProviderId(providerId: string): Promise<Array<User>> {
    return this.repository.find({
      relations: ["role", "provider"],
      where: [{
        provider: {
          id: providerId
        }
      }]
    })
  }

  public async delete (id: string): Promise<User> {
    let object: User = await this.repository.findOne(id);
    return object.softRemove();
  }
}
