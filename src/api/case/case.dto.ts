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

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  public readonly consentUserInChargeId: number;

  @IsBoolean()
  @ApiProperty()
  public readonly consent: boolean;

  @IsString()
  @ApiProperty()
  public readonly code: string;

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
  @IsOptional()
  @ApiProperty()
  public readonly description: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  public readonly consent: boolean;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  public readonly providerId: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  public readonly userInChargeId: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  public readonly consentUserInChargeId: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  public readonly followUpUserInChargeId: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public readonly code: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  public readonly completed: boolean;
  
  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  public readonly inactive: boolean;
}