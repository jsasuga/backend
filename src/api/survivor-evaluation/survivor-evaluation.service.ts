import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { SurvivorEvaluation } from './survivor-evaluation.entity';
import { User } from '../user/user.entity';
import { CreateSurvivorEvaluationDto, UpdateSurvivorEvaluationDto } from './survivor-evaluation.dto';
import { Province } from '../province/province.entity';
import { Provider } from '../provider/provider.entity';

@Injectable()
export class SurvivorEvaluationService {
  @InjectRepository(SurvivorEvaluation)
  private readonly repository: Repository<SurvivorEvaluation>;

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Province) private provinceRepository: Repository<Province>,
  ) {}
  
  public async create(body: CreateSurvivorEvaluationDto): Promise<SurvivorEvaluation> {
    let object: SurvivorEvaluation = new SurvivorEvaluation;

    let user: User = await this.userRepository.findOne(body.userInChargeId);
    if (!user) {
      throw new HttpException('Invalid userInChargeId', HttpStatus.BAD_REQUEST);
    }

    let province: Province = await this.provinceRepository.findOne(body.provinceId);
    if (!province) {
      throw new HttpException('Invalid provinceId', HttpStatus.BAD_REQUEST);
    }

    object.violenceType = body.violenceType;
    object.place = body.place;
    object.phase = body.phase;
    object.security1 = body.security1;
    object.security2 = body.security2;
    object.security3 = body.security3;
    object.securityNotes = body.securityNotes;
    object.legalProtection1 = body.legalProtection1;
    object.legalProtection2 = body.legalProtection2;
    object.legalProtection3 = body.legalProtection3;
    object.legalProtectionNotes = body.legalProtectionNotes;
    object.mentalWelfare1 = body.mentalWelfare1;
    object.mentalWelfare2 = body.mentalWelfare2;
    object.mentalWelfare3 = body.mentalWelfare3;
    object.mentalWelfare4 = body.mentalWelfare4;
    object.mentalWelfareNotes = body.mentalWelfareNotes;
    object.social1 = body.social1;
    object.social2 = body.social2;
    object.social3 = body.social3;
    object.social4 = body.social4;
    object.socialNotes = body.socialNotes;
    object.physical1 = body.physical1;
    object.physical2 = body.physical2;
    object.physical3 = body.physical3;
    object.physical4 = body.physical4;
    object.physical5 = body.physical5;
    object.physicalNotes = body.physicalNotes;
    object.financial1 = body.financial1;
    object.financial2 = body.financial2;
    object.financial3 = body.financial3;
    object.financial4 = body.financial4;
    object.financialNotes = body.financialNotes;
    object.total = body.total;
    object.survivorStatus = body.survivorStatus;
    object.createdAt = new Date();
    object.securityTotal = body.securityTotal;
    object.legalProtectionTotal = body.legalProtectionTotal;
    object.mentalWelfareTotal = body.mentalWelfareTotal;
    object.financial = body.financial;
    object.social = body.social;
    object.physical = body.physical;

    object.userInCharge = user;
    object.province = province;
    object.completed = false;

    return this.repository.save(object);
  }

  public async list(req: Request): Promise<Array<SurvivorEvaluation>> {
    return this.repository.find({
      relations: ["userInCharge", "userInCharge.provider", "province"]
    });
  }

  public async fetch(id: string): Promise<SurvivorEvaluation> {
    let obj = await this.repository.findOne(id, {
      relations: ["userInCharge", "userInCharge.provider", "province"]
    });
    if (!obj) {
      throw new HttpException('Object not found', HttpStatus.NOT_FOUND);
    }
    return obj; 
  }

  public async update (id: string, body: UpdateSurvivorEvaluationDto): Promise<SurvivorEvaluation> {
    let object: SurvivorEvaluation = await this.repository.findOne(id);
    if (!object) {
        throw new HttpException('Invalid survivor evaluation id', HttpStatus.NOT_FOUND);
    }

    object.violenceType = body.violenceType ? body.violenceType : object.violenceType;
    object.place = body.place ? body.place : object.place;
    object.phase = body.phase ? body.phase : object.phase;
    object.security1 = body.security1 ? body.security1 : object.security1;
    object.security2 = body.security2 ? body.security2 : object.security2;
    object.security3 = body.security3 ? body.security3 : object.security3;
    object.securityNotes = body.securityNotes ? body.securityNotes : object.securityNotes;
    object.legalProtection1 = body.legalProtection1 ? body.legalProtection1 : object.legalProtection1;
    object.legalProtection2 = body.legalProtection2 ? body.legalProtection2 : object.legalProtection2;
    object.legalProtection3 = body.legalProtection3 ? body.legalProtection3 : object.legalProtection3;
    object.legalProtectionNotes = body.legalProtectionNotes ? body.legalProtectionNotes : object.legalProtectionNotes;
    object.mentalWelfare1 = body.mentalWelfare1 ? body.mentalWelfare1 : object.mentalWelfare1;
    object.mentalWelfare2 = body.mentalWelfare2 ? body.mentalWelfare2 : object.mentalWelfare2;
    object.mentalWelfare3 = body.mentalWelfare3 ? body.mentalWelfare3 : object.mentalWelfare3;
    object.mentalWelfare4 = body.mentalWelfare4 ? body.mentalWelfare4 : object.mentalWelfare4;
    object.mentalWelfareNotes = body.mentalWelfareNotes ? body.mentalWelfareNotes : object.mentalWelfareNotes;
    object.social1 = body.social1 ? body.social1 : object.social1;
    object.social2 = body.social2 ? body.social2 : object.social2;
    object.social3 = body.social3 ? body.social3 : object.social3;
    object.social4 = body.social4 ? body.social4 : object.social4;
    object.socialNotes = body.socialNotes ? body.socialNotes : object.socialNotes;
    object.physical1 = body.physical1 ? body.physical1 : object.physical1;
    object.physical2 = body.physical2 ? body.physical2 : object.physical2;
    object.physical3 = body.physical3 ? body.physical3 : object.physical3;
    object.physical4 = body.physical4 ? body.physical4 : object.physical4;
    object.physical5 = body.physical5 ? body.physical5 : object.physical5;
    object.physicalNotes = body.physicalNotes ? body.physicalNotes : object.physicalNotes;
    object.financial1 = body.financial1 ? body.financial1 : object.financial1;
    object.financial2 = body.financial2 ? body.financial2 : object.financial2;
    object.financial3 = body.financial3 ? body.financial3 : object.financial3;
    object.financial4 = body.financial4 ? body.financial4 : object.financial4;
    object.financialNotes = body.financialNotes ? body.financialNotes : object.financialNotes;
    object.total = body.total ? body.total : object.total;
    object.survivorStatus = body.survivorStatus ? body.survivorStatus : object.survivorStatus;
    object.securityTotal = body.securityTotal ? body.securityTotal : object.securityTotal;
    object.legalProtectionTotal = body.legalProtectionTotal ? body.legalProtectionTotal : object.legalProtectionTotal;
    object.mentalWelfareTotal = body.mentalWelfareTotal ? body.mentalWelfareTotal : object.mentalWelfareTotal;
    object.financial = body.financial ? body.financial : object.financial;
    object.social = body.social ? body.social : object.social;
    object.physical = body.physical ? body.physical : object.physical;
  
    object.completed = body.completed;
    if(body.completed) {
        object.completedAt = new Date();
    }

    if(body.userInChargeId) {
      let user: User = await this.userRepository.findOne(body.userInChargeId);
      if (!user) {
        throw new HttpException('Invalid userInChargeId', HttpStatus.BAD_REQUEST);
      }
      object.userInCharge = user;
    }
  
    return this.repository.save(object);
  }

  public async delete (id: string): Promise<SurvivorEvaluation> {
    let object: SurvivorEvaluation = await this.repository.findOne(id);
    return object.softRemove();
  }

  public async listByUserId(userId: string): Promise<Array<SurvivorEvaluation>> {
    return this.repository.find({
      relations: ["userInCharge", "userInCharge.provider", "province"],
      where: [{
        userInCharge: {
          id: userId
        }
      }]
    })
  }
}
