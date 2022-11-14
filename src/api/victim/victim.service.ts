import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { Victim } from './victim.entity';
import { CreateVictimDto, UpdateVictimDto } from './victim.dto';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/user.entity';
import { Role } from '../role/role.entity';
import { Provider } from '../provider/provider.entity';

@Injectable()
export class VictimService {
  @InjectRepository(Victim)
  private readonly repository: Repository<Victim>;

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(Provider) private providerRepository: Repository<Provider>,
    ) {}

  private makePassword(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$./!&*';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  private encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  public async registerUser(email: string, name: string, victimId: number): Promise<User | never> {
    let password = this.makePassword(10);
    let user: User = await this.userRepository.findOne({ where: { email } });
    let victim: Victim = await this.repository.findOne({ where: { id: victimId } });
    
    if (user) {
      return user;
    }

    user = new User();

    user.name = name;
    user.email = email;
    user.victim = victim;
    user.password = this.encodePassword(password);
    return this.userRepository.save(user);
  }

  public async create(body: CreateVictimDto): Promise<Victim> {
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
    victim.email = body.email;
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
    victim.currentAddress = body.currentAddress;
    victim.phoneNumber = body.phoneNumber;
    victim.preferredLanguage = body.preferredLanguage;
    victim.genre = body.genre;

    return this.repository.save(victim);
  }

  public async createNewVictim(body: CreateVictimDto): Promise<Victim> {
    let victim = await this.create(body);
    if(!victim) {
      throw new HttpException('Error creating the victim', HttpStatus.BAD_REQUEST);
    }
    let user = await this.registerUser(body.email, body.name, victim.id);
    if(!user) {
      throw new HttpException('Error creating the victims user', HttpStatus.BAD_REQUEST);
    }
    // process email sending bs for victim to get his pw
    return victim;
  }
  
  public async list(req: Request): Promise<Array<Victim>> {
    return this.repository.find();
  }

  public async fetch(id: string): Promise<Victim> {
    let obj = await this.repository.findOne(id);
    if (!obj) {
      throw new HttpException('Object not found', HttpStatus.NOT_FOUND);
    }
    return obj; 
  }

  public async update (id: string, body: UpdateVictimDto): Promise<Victim> {
    let victim: Victim = await this.repository.findOne(id);
    if (!victim) {
      throw new HttpException('Invalid module id', HttpStatus.NOT_FOUND);
    }

    victim.name = body.name ? body.name : victim.name;
    victim.email = body.email ? body.email : victim.email;
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
    victim.currentAddress = body.currentAddress ? body.currentAddress : victim.currentAddress;
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
