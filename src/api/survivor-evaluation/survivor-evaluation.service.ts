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
    @InjectRepository(Provider) private providerRepository: Repository<Provider>,
  ) {}
  
  public async create(body: CreateSurvivorEvaluationDto): Promise<SurvivorEvaluation> {
    let object: SurvivorEvaluation = new SurvivorEvaluation;

    let user: User = await this.userRepository.findOne(body.userInChargeId);
    if (!user) {
      throw new HttpException('Invalid userInChargeId', HttpStatus.BAD_REQUEST);
    }

    let provider: Provider = await this.providerRepository.findOne(body.providerId);
    if (!user) {
      throw new HttpException('Invalid providerId', HttpStatus.BAD_REQUEST);
    }

    let province: Province = await this.provinceRepository.findOne(body.provinceId);
    if (!user) {
      throw new HttpException('Invalid provinceId', HttpStatus.BAD_REQUEST);
    }

    object.violenceType = body.violenceType;
    object.place = body.place;
    object.phase = body.phase;
    object.security = body.security;
    object.securityNotes = body.securityNotes;
    object.legalProtection = body.legalProtection;
    object.legalProtectionNotes = body.legalProtectionNotes;
    object.mentalWelfare = body.mentalWelfare;
    object.mentalWelfareNotes = body.mentalWelfareNotes;
    object.social = body.social;
    object.socialNotes = body.socialNotes;
    object.physical = body.physical;
    object.physicalNotes = body.physicalNotes;
    object.financial = body.financial;
    object.financialNotes = body.financialNotes;
    object.total = body.total;
    object.survivorStatus = body.survivorStatus;
    object.createdAt = new Date();

    object.userInCharge = user;
    object.provider = provider;
    object.province = province;

    return this.repository.save(object);
  }

  public async list(req: Request): Promise<Array<SurvivorEvaluation>> {
    return this.repository.find();
  }

  public async fetch(id: string): Promise<SurvivorEvaluation> {
    return this.repository.findOne(id, {
      relations: ["userInCharge", "provider", "province"]
    });
  }

  public async update (id: string, body: UpdateSurvivorEvaluationDto): Promise<SurvivorEvaluation> {
    let object: SurvivorEvaluation = await this.repository.findOne(id);
    if (!object) {
        throw new HttpException('Invalid survivor evaluation id', HttpStatus.NOT_FOUND);
    }

    object.violenceType = body.violenceType ? body.violenceType : object.violenceType;
    object.place = body.place ? body.place : object.place;
    object.phase = body.phase ? body.phase : object.phase;
    object.security = body.security ? body.security : object.security;
    object.securityNotes = body.securityNotes ? body.securityNotes : object.securityNotes;
    object.legalProtection = body.legalProtection ? body.legalProtection : object.legalProtection;
    object.legalProtectionNotes = body.legalProtectionNotes ? body.legalProtectionNotes : object.legalProtectionNotes;
    object.mentalWelfare = body.mentalWelfare ? body.mentalWelfare : object.mentalWelfare;
    object.mentalWelfareNotes = body.mentalWelfareNotes ? body.mentalWelfareNotes : object.mentalWelfareNotes;
    object.social = body.social ? body.social : object.social;
    object.socialNotes = body.socialNotes ? body.socialNotes : object.socialNotes;
    object.physical = body.physical ? body.physical : object.physical;
    object.physicalNotes = body.physicalNotes ? body.physicalNotes : object.physicalNotes;
    object.financial = body.financial ? body.financial : object.financial;
    object.financialNotes = body.financialNotes ? body.financialNotes : object.financialNotes;
    object.total = body.total ? body.total : object.total;
    object.survivorStatus = body.survivorStatus ? body.survivorStatus : object.survivorStatus;

    if(body.completedAt) {
        object.completedAt = new Date();
    }

    return this.repository.save(object);
  }

  public async delete (id: string): Promise<SurvivorEvaluation> {
    let object: SurvivorEvaluation = await this.repository.findOne(id);
    return object.softRemove();
  }

  public async listByUserId(userId: string): Promise<Array<SurvivorEvaluation>> {
    return this.repository.find({
      relations: ["userInCharge", "provider", "province"],
      where: [{
        userInCharge: {
          id: userId
        }
      }]
    })
  }
}
