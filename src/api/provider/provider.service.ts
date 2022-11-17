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

  public async create(body: CreateProviderDto): Promise<Provider> {
    let provider: Provider = new Provider;

    let province: Province = await this.checkProvince(body.provinceId);
    if (!province) {
      throw new HttpException('Invalid province id', HttpStatus.BAD_REQUEST);
    }

    const serviceTypeIds: Array<number> = body.serviceTypeIds;
    let serviceTypePromises = serviceTypeIds.map(p => {
      let m = this.serviceTypeRepository.findOne(p);
      return m
    })
    const serviceTypes = await Promise.all(serviceTypePromises)
    if (!serviceTypes) {
      throw new HttpException('Invalid serviceType id', HttpStatus.BAD_REQUEST);
    }

    const providerAreaIds: Array<number> = body.providerAreaIds;
    let providerAreaPromises = providerAreaIds.map(p => {
      let m = this.providerAreasRepository.findOne(p);
      return m
    })
    const providerAreas = await Promise.all(providerAreaPromises)
    if (!providerAreas) {
      throw new HttpException('Invalid providerAreas id', HttpStatus.BAD_REQUEST);
    }

    provider.name = body.name;
    provider.phoneNumber = body.phoneNumber;
    provider.email = body.email;
    provider.address = body.address;
    provider.description = body.description;

    provider.province = province;
    provider.serviceTypes = serviceTypes;
    provider.providerAreas = providerAreas;

    provider.networkInterest = body.networkInterest;
    provider.networkNeeds = body.networkNeeds;

    return this.repository.save(provider);
  }

  public async list(req: Request): Promise<Array<Provider>> {
    let name = ['%', req.query.name, '%'].join('')
    let province = req.query.province;
    let service = req.query.service;
    let area = req.query.area;
    if(name || province || service || area){
      let query = this.repository.createQueryBuilder("provider")
        .leftJoin("provider.serviceTypes", "serviceType")
        .leftJoinAndSelect("provider.serviceTypes", "serviceTypeSelect")
        .leftJoin("provider.providerAreas", "providerArea")
        .leftJoinAndSelect("provider.providerAreas", "providerAreaSelect")
        .leftJoinAndSelect("provider.province", "province")
        .leftJoinAndSelect("provider.branches", "branch");
      if(name) {
        query.andWhere("LOWER(provider.name) LIKE LOWER(:name)", {name: name})
      }
      if(province) {
        query.andWhere("province.id = :province", {province: province})
      }
      if(service) {
        service = service.toString().split(',')
        query.andWhere("serviceTypeSelect.id in ( :...serviceType )", {serviceType: service})
      }
      if(area) {
        area = area.toString().split(',')
        query.andWhere("providerAreaSelect.id in ( :...providerAreas )", {providerAreas: area})
      }
      return query.getMany();
    }
    return this.repository.find({
      relations: ["province", "serviceTypes", "providerAreas", "branches"]
    });
  }

  public async fetch(id: string): Promise<Provider> {
    let obj = await this.repository.findOne(id, {
      relations: ["province", "serviceTypes", "providerAreas", "branches"]
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

    const serviceTypeIds: Array<number> = body.serviceTypeIds;
    let serviceTypePromises = serviceTypeIds.map(p => {
      let m = this.serviceTypeRepository.findOne(p);
      return m
    })
    const serviceTypes = await Promise.all(serviceTypePromises)
    if (!serviceTypes) {
      throw new HttpException('Invalid serviceType id', HttpStatus.BAD_REQUEST);
    }
    provider.serviceTypes = serviceTypes;

    const providerAreaIds: Array<number> = body.providerAreaIds;
    let providerAreaPromises = providerAreaIds.map(p => {
      let m = this.providerAreasRepository.findOne(p);
      return m
    })
    const providerAreas = await Promise.all(providerAreaPromises)
    if (!providerAreas) {
      throw new HttpException('Invalid providerAreas id', HttpStatus.BAD_REQUEST);
    }
    provider.providerAreas = providerAreas;

    return this.repository.save(provider);
  }

  public async delete (id: string): Promise<Provider> {
    let role: Provider = await this.repository.findOne(id);
    return role.softRemove();
  }
}
