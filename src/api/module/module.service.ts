import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { CreateModuleDto, UpdateModuleDto } from './module.dto';
import { Module } from './module.entity';

@Injectable()
export class ModuleService {
  @InjectRepository(Module)
  private readonly repository: Repository<Module>;

  public async create(body: CreateModuleDto): Promise<Module> {
    let module: Module = new Module;

    module.name = body.name;
    module.description = body.description;

    return this.repository.save(module);
  }

  public async list(req: Request): Promise<Array<Module>> {
    return this.repository.find();
  }

  public async fetch(id: string): Promise<Module> {
    let obj = await this.repository.findOne(id);
    if (!obj) {
      throw new HttpException('Object not found', HttpStatus.NOT_FOUND);
    }
    return obj; 
  }

  public async update (id: string, body: UpdateModuleDto): Promise<Module> {
    let module: Module = await this.repository.findOne(id);
    if (!module) {
      throw new HttpException('Invalid module id', HttpStatus.NOT_FOUND);
    }
    module.name = body.name ? body.name : module.name;
    module.description = body.description ? body.description : module.description;
    
    return this.repository.save(module);
  }

  public async delete (id: string): Promise<Module> {
    let module: Module = await this.repository.findOne(id);
    return module.softRemove();
  }
}
