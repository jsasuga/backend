import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    let obj = await this.repository.findOne(id);
    if (!obj) {
      throw new HttpException('Object not found', HttpStatus.NOT_FOUND);
    }
    return obj; 
  }

  public async update (id: string, body: UpdateServiceTypeDto): Promise<ServiceType> {
    let obj: ServiceType = await this.repository.findOne(id);
    if (!obj) {
      throw new HttpException('Invalid ServiceType id', HttpStatus.NOT_FOUND);
    }
    obj.name = body.name ? body.name : obj.name;
    obj.description = body.description ? body.description : obj.description;
    
    return this.repository.save(obj);
  }

  public async delete (id: string): Promise<ServiceType> {
    let module: ServiceType = await this.repository.findOne(id);
    return module.softRemove();
  }
}
