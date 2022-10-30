import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { CreateProviderAreasDto, UpdateProviderAreasDto } from './provider-areas.dto';
import { ProviderAreas } from './provider-areas.entity';

@Injectable()
export class ProviderAreasService {
  @InjectRepository(ProviderAreas)
  private readonly repository: Repository<ProviderAreas>;

  public async create(body: CreateProviderAreasDto): Promise<ProviderAreas> {
    let newObject: ProviderAreas = new ProviderAreas;

    newObject.name = body.name;
    newObject.description = body.description;

    return this.repository.save(newObject);
  }

  public async list(req: Request): Promise<Array<ProviderAreas>> {
    return this.repository.find();
  }

  public async fetch(id: string): Promise<ProviderAreas> {
    let obj = await this.repository.findOne(id);
    if (!obj) {
      throw new HttpException('Object not found', HttpStatus.NOT_FOUND);
    }
    return obj; 
  }

  public async update (id: string, body: UpdateProviderAreasDto): Promise<ProviderAreas> {
    let obj: ProviderAreas = await this.repository.findOne(id);
    if (!obj) {
      throw new HttpException('Invalid provider area id', HttpStatus.NOT_FOUND);
    }
    obj.name = body.name ? body.name : obj.name;
    obj.description = body.description ? body.description : obj.description;
    
    return this.repository.save(obj);
  }

  public async delete (id: string): Promise<ProviderAreas> {
    let module: ProviderAreas = await this.repository.findOne(id);
    return module.softRemove();
  }
}
