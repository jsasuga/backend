import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { CreateProviderDto, UpdateProviderDto } from './provider.dto';
import { Provider } from './provider.entity';
import { Province } from '../province/province.entity';
import { ServiceType } from '../service-type/service-type.entity';
import { ProviderAreas } from '../provider-areas/provider-areas.entity';

@Injectable()
export class ProviderService {
  @InjectRepository(Provider)
  private readonly repository: Repository<Provider>;

  constructor(
      @InjectRepository(Province) private provinceRepository: Repository<Province>,
      @InjectRepository(ServiceType) private serviceTypeRepository: Repository<ServiceType>,
      @InjectRepository(ProviderAreas) private providerAreasRepository: Repository<ProviderAreas>,
    ) {}

  private async checkProvince(provinceId: number) {
    let province: Province = await this.provinceRepository.findOne(provinceId);
    return province
  }

  private async checkServiceType(serviceTypeId: number) {
    let serviceType: ServiceType = await this.serviceTypeRepository.findOne(serviceTypeId);
    return serviceType
  }

  private async checkProviderAreas(providerAreasId: number) {
    let providerArea: ProviderAreas = await this.providerAreasRepository.findOne(providerAreasId);
    return providerArea
  }

  public async create(body: CreateProviderDto): Promise<Provider> {
    let provider: Provider = new Provider;

    let province: Province = await this.checkProvince(body.provinceId);
    if (!province) {
      throw new HttpException('Invalid province id', HttpStatus.BAD_REQUEST);
    }

    let serviceType: ServiceType = await this.checkServiceType(body.serviceTypeId);
    if (!serviceType) {
      throw new HttpException('Invalid serviceType id', HttpStatus.BAD_REQUEST);
    }

    let providerArea: Province = await this.checkProviderAreas(body.providerAreaId);
    if (!providerArea) {
      throw new HttpException('Invalid providerAreas id', HttpStatus.BAD_REQUEST);
    }

    provider.name = body.name;
    provider.phoneNumber = body.phoneNumber;
    provider.email = body.email;
    provider.address = body.address;
    provider.description = body.description;

    provider.province = province;
    provider.serviceType = serviceType;
    provider.providerAreas = providerArea;

    provider.networkInterest = body.networkInterest;
    provider.networkNeeds = body.networkNeeds;

    return this.repository.save(provider);
  }

  public async list(req: Request): Promise<Array<Provider>> {
    return this.repository.find();
  }

  public async fetch(id: string): Promise<Provider> {
    let obj = await this.repository.findOne(id, {
      relations: ["province", "serviceType", "providerAreas", "branches"]
    });
    if (!obj) {
      throw new HttpException('Object not found', HttpStatus.NOT_FOUND);
    }
    return obj; 
  }

  public async update (id: string, body: UpdateProviderDto): Promise<Provider> {
    let provider: Provider = await this.repository.findOne(id);
    if (!provider) {
        throw new HttpException('Invalid provider id', HttpStatus.NOT_FOUND);
    }
    let province: Province;
    let serviceType: ServiceType;
    let providerArea: Province;

    provider.name = body.name ? body.name : provider.name;
    provider.phoneNumber = body.phoneNumber ? body.phoneNumber : provider.phoneNumber;
    provider.email = body.email ? body.email : provider.email;
    provider.address = body.address ? body.address : provider.address;
    provider.description = body.description ? body.description : provider.description;
    provider.networkInterest = body.networkInterest ? body.networkInterest : provider.networkInterest;
    provider.networkNeeds = body.networkNeeds ? body.networkNeeds : provider.networkNeeds;

    if(body.provinceId) {
      province = await this.checkProvince(body.provinceId);
      if (!province) {
        throw new HttpException('Invalid province id', HttpStatus.BAD_REQUEST);
      }
      provider.province = province;
    }

    if(body.serviceTypeId) {
      serviceType = await this.checkServiceType(body.serviceTypeId);
      if (!serviceType) {
        throw new HttpException('Invalid serviceType id', HttpStatus.BAD_REQUEST);
      }
      provider.serviceType = serviceType;
    }

    if(body.providerAreaId) {
      providerArea = await this.checkProviderAreas(body.providerAreaId);
      if (!providerArea) {
        throw new HttpException('Invalid providerAreas id', HttpStatus.BAD_REQUEST);
      }
      provider.providerAreas = providerArea;
    }

    return this.repository.save(provider);
  }

  public async delete (id: string): Promise<Provider> {
    let role: Provider = await this.repository.findOne(id);
    return role.softRemove();
  }
}
