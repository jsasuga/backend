import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { CreateRoleDto, UpdateRoleDto, UpdateRolePermissionsDto } from './role.dto';
import { Role } from './role.entity';
import { Module } from '../module/module.entity';

@Injectable()
export class RoleService {
  @InjectRepository(Role)
  private readonly repository: Repository<Role>;

  constructor(@InjectRepository(Module) private moduleRepository: Repository<Module>) {}

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
    return this.repository.findOne(id, {
      relations: ["permissions"]
    });
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

  public async updatePermissions(id: string, body: UpdateRolePermissionsDto): Promise<Role> {
    const permissions: Array<number> = body.modules;
    let role: Role = await this.repository.findOne(id);
    
    let modulePromises = permissions.map(p => {
      let m = this.moduleRepository.findOne(p);
      return m
    })
    const modules = await Promise.all(modulePromises)
    role.permissions = modules;
  
    return this.repository.save(role);
  }
}
