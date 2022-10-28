import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { Victim } from './victim.entity';
import { VictimDto } from './victim.dto';

@Injectable()
export class VictimService {
  @InjectRepository(Victim)
  private readonly repository: Repository<Victim>;
  
  public async create(body: VictimDto): Promise<Victim> {
    let victim: Victim = new Victim;
    let vv: Victim = await this.repository.findOne({ where: { id: body.id } });

    if (vv) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }
    if (!body.id) {
      throw new HttpException('id is required', HttpStatus.BAD_REQUEST);
    }
    
    victim.id = body.id;
    victim.name = body.name;
    victim.otherName = body.otherName;
    victim.age = body.age;
    victim.verifiedAge = body.verifiedAge;
    victim.birthday = body.birthday;
    victim.citizenship = body.citizenship;
    victim.ethnicity = body.ethnicity;
    victim.nationality = body.nationality;
    victim.maritalStatus = body.maritalStatus;
    victim.children = body.children;
    victim.originAddress = body.originAddress;
    victim.originCountry = body.originCountry;
    victim.phoneNumber = body.phoneNumber;
    victim.preferredLanguage = body.preferredLanguage;
    victim.genre = body.genre;

    return this.repository.save(victim);
  }

  public async list(req: Request): Promise<Array<Victim>> {
    return this.repository.find();
  }

  public async fetch(id: string): Promise<Victim> {
    return this.repository.findOne(id);
  }

  public async update (id: string, body: VictimDto): Promise<Victim> {
    let victim: Victim = await this.repository.findOne(id);
    if (!victim) {
      throw new HttpException('Invalid module id', HttpStatus.NOT_FOUND);
    }

    victim.name = body.name ? body.name : victim.name;
    victim.otherName = body.otherName ? body.otherName : victim.otherName;
    victim.age = body.age ? body.age : victim.age;
    victim.verifiedAge = body.verifiedAge ? body.verifiedAge : victim.verifiedAge;
    victim.birthday = body.birthday ? body.birthday : victim.birthday;
    victim.citizenship = body.citizenship ? body.citizenship : victim.citizenship;
    victim.ethnicity = body.ethnicity ? body.ethnicity : victim.ethnicity;
    victim.nationality = body.nationality ? body.nationality : victim.nationality;
    victim.maritalStatus = body.maritalStatus ? body.maritalStatus : victim.maritalStatus;
    victim.children = body.children ? body.children : victim.children;
    victim.originAddress = body.originAddress ? body.originAddress : victim.originAddress;
    victim.originCountry = body.originCountry ? body.originCountry : victim.originCountry;
    victim.phoneNumber = body.phoneNumber ? body.phoneNumber : victim.phoneNumber;
    victim.preferredLanguage = body.preferredLanguage ? body.preferredLanguage : victim.preferredLanguage;
    victim.genre = body.genre ? body.genre : victim.genre;

    return this.repository.save(victim);
  }

  public async delete (id: string): Promise<Victim> {
    let victim: Victim = await this.repository.findOne(id);
    return victim.softRemove();
  }
}
