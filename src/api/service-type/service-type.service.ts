import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { CreateServiceTypeDto, UpdateServiceTypeDto } from './service-type.dto';
import { ServiceType } from './service-type.entity';

@Injectable()
export class ServiceTypeService {
  @InjectRepository(ServiceType)
  private readonly repository: Repository<ServiceType>;

  public async create(body: CreateServiceTypeDto): Promise<ServiceType> {
    let newObject: ServiceType = new ServiceType;

    newObject.name = body.name;
    newObject.description = body.description;

    return this.repository.save(newObject);
  }

  public async list(req: Request): Promise<Array<ServiceType>> {
    return this.repository.find();
  }

  public async fetch(id: string): Promise<ServiceType> {
    return this.repository.findOne(id);
  }

  public async update (id: string, body: UpdateServiceTypeDto): Promise<ServiceType> {
    let obj: ServiceType = await this.repository.findOne(id);

    obj.name = body.name ? body.name : obj.name;
    obj.description = body.description ? body.description : obj.description;
    
    return this.repository.save(obj);
  }

  public async delete (id: string): Promise<ServiceType> {
    let module: ServiceType = await this.repository.findOne(id);
    return module.softRemove();
  }
}
