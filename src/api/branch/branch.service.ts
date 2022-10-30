import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { CreateBranchDto, UpdateBranchDto } from './branch.dto';
import { Branch } from './branch.entity';
import { Provider } from '../provider/provider.entity';

@Injectable()
export class BranchService {
  @InjectRepository(Branch)
  private readonly repository: Repository<Branch>;

  constructor(@InjectRepository(Provider) private providerRepository: Repository<Provider>) {}
 
  private async checkProvider(providerId: number) {
    let provider: Provider = await this.providerRepository.findOne(providerId);
    return provider
  }

  public async create(body: CreateBranchDto): Promise<Branch> {
    let newObject: Branch = new Branch;
    let provider: Provider = await this.checkProvider(body.providerId);
    if (!provider) {
      throw new HttpException('Invalid Provider id', HttpStatus.BAD_REQUEST);
    }

    newObject.name = body.name;
    newObject.personInCharge = body.personInCharge;
    newObject.address = body.address;
    newObject.email = body.email;
    newObject.phoneNumber = body.phoneNumber;
    newObject.latitude = body.latitude;
    newObject.longitude = body.longitude;
    newObject.provider = provider;

    return this.repository.save(newObject);
  }

  public async list(req: Request): Promise<Array<Branch>> {
    return this.repository.find();
  }

  public async fetch(id: string): Promise<Branch> {
    let obj = await this.repository.findOne(id);
    if (!obj) {
      throw new HttpException('Object not found', HttpStatus.NOT_FOUND);
    }
    return obj;
  }

  public async update (id: string, body: UpdateBranchDto): Promise<Branch> {
    let obj: Branch = await this.repository.findOne(id);
    if (!obj) {
      throw new HttpException('Invalid Province id', HttpStatus.NOT_FOUND);
    }
    obj.name = body.name ? body.name : obj.name;
    obj.personInCharge = body.personInCharge ? body.personInCharge : obj.personInCharge;
    obj.address = body.address ? body.address : obj.address;
    obj.email = body.email ? body.email : obj.email;
    obj.phoneNumber = body.phoneNumber ? body.phoneNumber : obj.phoneNumber;
    obj.latitude = body.latitude ? body.latitude : obj.latitude;
    obj.longitude = body.longitude ? body.longitude : obj.longitude;

    return this.repository.save(obj);
  }

  public async delete (id: string): Promise<Branch> {
    let module: Branch = await this.repository.findOne(id);
    return module.softRemove();
  }
}
