import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Case } from '../case/case.entity';
import { CreateFollowUpDto, UpdateFollowUpDto } from './follow-up.dto';
import { FollowUp } from './follow-up.entity';
import { Request } from 'express';

@Injectable()
export class FollowUpService {
  @InjectRepository(FollowUp)
  private readonly repository: Repository<FollowUp>;

  constructor(
    @InjectRepository(Case) private caseRepository: Repository<Case>,
  ) { }

  public async create(body: CreateFollowUpDto): Promise<FollowUp> {
    let object: FollowUp = new FollowUp;

    let case1: Case = await this.caseRepository.findOne(body.caseId);
    if (!case1) {
      throw new HttpException('Invalid case id', HttpStatus.BAD_REQUEST);
    }

    object.date = body.date;
    object.decisions = body.decisions;
    object.lawyer = body.lawyer;
    object.tribunal = body.tribunal;
    object.nextAudienceDate = body.nextAudienceDate;
    object.canceled = false;
    object.cancelledReason = "";
    object.createdAt = new Date();
    object.case = case1;

    return this.repository.save(object);
  }

  public async list(req: Request): Promise<Array<FollowUp>> {
    return this.repository.find();
  }

  public async fetch(id: string): Promise<FollowUp> {
    let obj = await this.repository.findOne(id);
    if (!obj) {
      throw new HttpException('Object not found', HttpStatus.NOT_FOUND);
    }
    return obj;
  }

  public async update(id: string, body: UpdateFollowUpDto): Promise<FollowUp> {
    let object: FollowUp = await this.repository.findOne(id);
    if (!object) {
      throw new HttpException('Invalid attention followup id', HttpStatus.NOT_FOUND);
    }

    object.date = body.date ? body.date : object.date;
    object.decisions = body.decisions ? body.decisions : object.decisions;
    object.lawyer = body.lawyer ? body.lawyer : object.lawyer;
    object.tribunal = body.tribunal ? body.tribunal : object.tribunal;
    object.nextAudienceDate = body.nextAudienceDate ? body.nextAudienceDate : object.nextAudienceDate;
    if (body.cancelled) {
      object.canceled = true;
      object.cancelledReason = object.cancelledReason;
    }

    return this.repository.save(object);
  }

  public async delete(id: string): Promise<FollowUp> {
    let object: FollowUp = await this.repository.findOne(id);
    return object.softRemove();
  }
}
