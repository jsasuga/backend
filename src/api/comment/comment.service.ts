import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { User } from '../user/user.entity';
import { Case } from '../case/case.entity';
import { Comment } from './comment.entity';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';

@Injectable()
export class CommentService {
  @InjectRepository(Comment)
  private readonly repository: Repository<Comment>;

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Case) private caseRepository: Repository<Case>,
  ) {}

  public async create(body: CreateCommentDto): Promise<Comment> {
    let object: Comment = new Comment;

    let user: User = await this.userRepository.findOne(body.userId);
    if (!user) {
      throw new HttpException('Invalid userInChargeId', HttpStatus.BAD_REQUEST);
    }

    let case1: Case = await this.caseRepository.findOne(body.caseId);
    if (!case1) {
      throw new HttpException('Invalid case id', HttpStatus.BAD_REQUEST);
    }

    object.createdAt = new Date();
    object.user = user;
    object.case = case1;
    object.text = body.text;
    return this.repository.save(object);
  }

  public async list(req: Request): Promise<Array<Comment>> {
    return this.repository.find({
      relations: ["user", "case"]
    });
  }

  public async fetch(id: string): Promise<Comment> {
    let obj = await this.repository.findOne(id, {
        relations: ["user", "case"]
    });
    if (!obj) {
      throw new HttpException('Object not found', HttpStatus.NOT_FOUND);
    }
    return obj; 
  }

  public async update (id: string, body: UpdateCommentDto): Promise<Comment> {
    let object: Comment = await this.repository.findOne(id);
    if (!object) {
        throw new HttpException('Invalid comment id', HttpStatus.NOT_FOUND);
    }

    object.text = body.text;

    return this.repository.save(object);
  }

  public async delete (id: string): Promise<Comment> {
    let object: Comment = await this.repository.findOne(id);
    return object.softRemove();
  }

  public async listByUserId(userId: string): Promise<Array<Comment>> {
    return this.repository.find({
      relations: ["user", "case"],
      where: [{
        userInCharge: {
          id: userId
        }
      }]
    })
  }

  public async listByCaseId(caseId: string): Promise<Array<Comment>> {
    return this.repository.find({
      relations: ["user", "case"],
      where: [{
        case: {
          id: caseId
        }
      }]
    })
  }
}
