import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { CreateProvinceDto, UpdateProvinceDto } from './province.dto';
import { Province } from './province.entity';

@Injectable()
export class ProvinceService {
  @InjectRepository(Province)
  private readonly repository: Repository<Province>;

  public async create(body: CreateProvinceDto): Promise<Province> {
    let newObject: Province = new Province;

    newObject.name = body.name;
    newObject.description = body.description;

    return this.repository.save(newObject);
  }

  public async list(req: Request): Promise<Array<Province>> {
    return this.repository.find();
  }

  public async fetch(id: string): Promise<Province> {
    return this.repository.findOne(id);
  }

  public async update (id: string, body: UpdateProvinceDto): Promise<Province> {
    let obj: Province = await this.repository.findOne(id);
    if (!obj) {
      throw new HttpException('Invalid Province id', HttpStatus.NOT_FOUND);
    }
    obj.name = body.name ? body.name : obj.name;
    obj.description = body.description ? body.description : obj.description;
    
    return this.repository.save(obj);
  }

  public async delete (id: string): Promise<Province> {
    let module: Province = await this.repository.findOne(id);
    return module.softRemove();
  }
}
