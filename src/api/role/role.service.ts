import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { CreateRoleDto, UpdateRoleDto } from './role.dto';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  @InjectRepository(Role)
  private readonly repository: Repository<Role>;

  public async create(body: CreateRoleDto): Promise<Role> {
    let role: Role = new Role;

    role.name = body.name;
    role.description = body.description;

    return this.repository.save(role);
  }

  public async list(req: Request): Promise<Array<Role>> {
    return this.repository.find();
  }

  public async fetch(id: string): Promise<Role> {
    return this.repository.findOne(id);
  }

  public async update (id: string, body: UpdateRoleDto): Promise<Role> {
    let role: Role = await this.repository.findOne(id);

    role.name = body.name ? body.name : role.name;
    role.description = body.description ? body.description : role.description;
    
    return this.repository.save(role);
  }

  public async delete (id: string): Promise<Role> {
    let role: Role = await this.repository.findOne(id);
    return role.softRemove();
  }
}
