import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { DemographicForm } from './demographic-form.entity';
import { User } from '../user/user.entity';
import { CreateDemographicFormDto, UpdateDemographicFormDto } from './demographic-form.dto';

@Injectable()
export class DemographicFormService {
  @InjectRepository(DemographicForm)
  private readonly repository: Repository<DemographicForm>;

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  
  public async create(body: CreateDemographicFormDto): Promise<DemographicForm> {
    let demographicForm: DemographicForm = new DemographicForm;

    let user: User = await this.userRepository.findOne(body.userInChargeId);
    if (!user) {
      throw new HttpException('Invalid userInChargeId', HttpStatus.BAD_REQUEST);
    }

    demographicForm.participation = body.participation;
    demographicForm.commitment = body.commitment;
    demographicForm.comments = body.comments;
    demographicForm.description = body.description;

    demographicForm.userInCharge = user;

    return this.repository.save(demographicForm);
  }

  public async list(req: Request): Promise<Array<DemographicForm>> {
    return this.repository.find();
  }

  public async fetch(id: string): Promise<DemographicForm> {
    let obj = await this.repository.findOne(id, {
      relations: ["userInCharge"]
    });
    if (!obj) {
      throw new HttpException('Object not found', HttpStatus.NOT_FOUND);
    }
    return obj; 
  }

  public async update (id: string, body: UpdateDemographicFormDto): Promise<DemographicForm> {
    let demographicForm: DemographicForm = await this.repository.findOne(id);
    if (!demographicForm) {
        throw new HttpException('Invalid DemographicForm id', HttpStatus.NOT_FOUND);
    }

    demographicForm.participation = body.participation ? body.participation : demographicForm.participation;
    demographicForm.commitment = body.commitment ? body.commitment : demographicForm.commitment;
    demographicForm.comments = body.comments ? body.comments : demographicForm.comments;
    demographicForm.description = body.description ? body.description : demographicForm.description;

    return this.repository.save(demographicForm);
  }

  public async delete (id: string): Promise<DemographicForm> {
    let demographicForm: DemographicForm = await this.repository.findOne(id);
    return demographicForm.softRemove();
  }

  public async listByUserId(userId: string): Promise<Array<DemographicForm>> {
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
