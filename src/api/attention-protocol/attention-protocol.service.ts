import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { AttentionProtocol } from './attention-protocol.entity';
import { User } from '../user/user.entity';
import { CreateAttentionProtocolDto, UpdateAttentionProtocolDto } from './attention-protocol.dto';

@Injectable()
export class AttentionProtocolService {
  @InjectRepository(AttentionProtocol)
  private readonly repository: Repository<AttentionProtocol>;

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}


  public async create(body: CreateAttentionProtocolDto): Promise<AttentionProtocol> {
    let object: AttentionProtocol = new AttentionProtocol;

    let user: User = await this.userRepository.findOne(body.userInChargeId);
    if (!user) {
      throw new HttpException('Invalid userInChargeId', HttpStatus.BAD_REQUEST);
    }

    object.data = body.data;
    object.confidentiality = body.confidentiality;
    object.consent = body.consent;
    object.treatment = body.treatment;
    object.security = body.security;
    object.legalProtection = body.legalProtection;
    object.mental = body.mental;
    object.financial = body.financial;
    object.social = body.social;
    object.physical = body.physical;
    object.strengths = body.strengths;
    object.comments = body.comments;

    object.userInCharge = user;

    return this.repository.save(object);
  }

  public async list(req: Request): Promise<Array<AttentionProtocol>> {
    return this.repository.find();
  }

  public async fetch(id: string): Promise<AttentionProtocol> {
    return this.repository.findOne(id, {
      relations: ["userInCharge"]
    });
  }

  public async update (id: string, body: UpdateAttentionProtocolDto): Promise<AttentionProtocol> {
    let object: AttentionProtocol = await this.repository.findOne(id);
    if (!object) {
        throw new HttpException('Invalid attention protocol id', HttpStatus.NOT_FOUND);
    }

    object.data = body.data ? body.data : object.data;
    object.confidentiality = body.confidentiality ? body.confidentiality : object.confidentiality;
    object.consent = body.consent ? body.consent : object.consent;
    object.treatment = body.treatment ? body.treatment : object.treatment;
    object.security = body.security ? body.security : object.security;
    object.legalProtection = body.legalProtection ? body.legalProtection : object.legalProtection;
    object.mental = body.mental ? body.mental : object.mental;
    object.financial = body.financial ? body.financial : object.financial;
    object.social = body.social ? body.social : object.social;
    object.physical = body.physical ? body.physical : object.physical;
    object.strengths = body.strengths ? body.strengths : object.strengths;
    object.comments = body.comments ? body.comments : object.comments;

    return this.repository.save(object);
  }

  public async delete (id: string): Promise<AttentionProtocol> {
    let object: AttentionProtocol = await this.repository.findOne(id);
    return object.softRemove();
  }

  public async listByUserId(userId: string): Promise<Array<AttentionProtocol>> {
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
