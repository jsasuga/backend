import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { FollowUpNote } from './follow-up-note.entity';
import { User } from '../user/user.entity';
import { CreateFollowUpNoteDto, UpdateFollowUpNoteDto } from './follow-up-note.dto';
import { Case } from '../case/case.entity';

@Injectable()
export class FollowUpNoteService {
  @InjectRepository(FollowUpNote)
  private readonly repository: Repository<FollowUpNote>;

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Case) private caseRepository: Repository<Case>,
  ) {}

  public async create(body: CreateFollowUpNoteDto): Promise<FollowUpNote> {
    let object: FollowUpNote = new FollowUpNote;

    let user: User = await this.userRepository.findOne(body.userInChargeId);
    if (!user) {
      throw new HttpException('Invalid userInChargeId', HttpStatus.BAD_REQUEST);
    }

    let case1: Case = await this.caseRepository.findOne(body.caseId);
    if (!case1) {
      throw new HttpException('Invalid case id', HttpStatus.BAD_REQUEST);
    }

    object.description = body.description;
    object.victimThoughts = body.victimThoughts;
    object.observations = body.observations;
    object.topics = body.topics;
    object.comprehension = body.comprehension;
    object.needs = body.needs;
    object.survivorPlan = body.survivorPlan;
    object.evaluatorPlan = body.evaluatorPlan;
    object.createdAt = new Date();
    object.userInCharge = user;
    object.case = case1;

    return this.repository.save(object);
  }

  public async list(req: Request): Promise<Array<FollowUpNote>> {
    return this.repository.find();
  }

  public async fetch(id: string): Promise<FollowUpNote> {
    let obj = await this.repository.findOne(id, {
      relations: ["userInCharge"]
    });
    if (!obj) {
      throw new HttpException('Object not found', HttpStatus.NOT_FOUND);
    }
    return obj; 
  }

  public async update (id: string, body: UpdateFollowUpNoteDto): Promise<FollowUpNote> {
    let object: FollowUpNote = await this.repository.findOne(id);
    if (!object) {
        throw new HttpException('Invalid attention protocol id', HttpStatus.NOT_FOUND);
    }

    object.description = body.description ? body.description : object.description;
    object.victimThoughts = body.victimThoughts ? body.victimThoughts : object.victimThoughts;
    object.observations = body.observations ? body.observations : object.observations;
    object.topics = body.topics ? body.topics : object.topics;
    object.comprehension = body.comprehension ? body.comprehension : object.comprehension;
    object.needs = body.needs ? body.needs : object.needs;
    object.survivorPlan = body.survivorPlan ? body.survivorPlan : object.survivorPlan;
    object.evaluatorPlan = body.evaluatorPlan ? body.evaluatorPlan : object.evaluatorPlan;
    
    return this.repository.save(object);
  }

  public async delete (id: string): Promise<FollowUpNote> {
    let object: FollowUpNote = await this.repository.findOne(id);
    return object.softRemove();
  }

  public async listByUserId(userId: string): Promise<Array<FollowUpNote>> {
    return this.repository.find({
      relations: ["userInCharge"],
      where: [{
        userInCharge: {
          id: userId
        }
      }]
    })
  }
}
