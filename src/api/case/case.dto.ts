import { IsBoolean, IsDecimal, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateVictimDto } from '../victim/victim.dto';
import { CreateDemographicFormDto } from '../demographic-form/demographic-form.dto';
import { CreateSurvivorEvaluationDto } from '../survivor-evaluation/survivor-evaluation.dto';
import { CreateAttentionProtocolDto } from '../attention-protocol/attention-protocol.dto';

export class CreateCaseDto {
  @IsString()
  @ApiProperty()
  public readonly description: string;

  @IsObject()
  @ApiProperty()
  public readonly victim: CreateVictimDto;

  @IsNumber()
  @ApiProperty()
  public readonly providerId: number;

  @IsNumber()
  @ApiProperty()
  public readonly userInChargeId: number;

  @IsBoolean()
  @ApiProperty()
  public readonly consent: boolean;
  
  @IsObject()
  @ApiProperty()
  public readonly demographicForm: CreateDemographicFormDto;

  @IsObject()
  @ApiProperty()
  public readonly initialSurvivorEvaluation: CreateSurvivorEvaluationDto;

  @IsObject()
  @ApiProperty()
  public readonly finalSurvivorEvaluation: CreateSurvivorEvaluationDto;

  @IsObject()
  @ApiProperty()
  public readonly postSurvivorEvaluation: CreateSurvivorEvaluationDto;

  @IsObject()
  @ApiProperty()
  public readonly attentionProtocol: CreateAttentionProtocolDto;

  @IsNumber()
  @ApiProperty()
  public readonly followUpUserInChargeId: number;
}

export class UpdateCaseDto {
  @IsString()
  @ApiProperty()
  public readonly description: string;

  @IsBoolean()
  @ApiProperty()
  public readonly consent: boolean;

  @IsNumber()
  @ApiProperty()
  public readonly providerId: number;

  @IsNumber()
  @ApiProperty()
  public readonly userInChargeId: number;
}