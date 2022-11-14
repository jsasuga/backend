import { IsDate, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVictimDto {
  @IsNumber()
  @ApiProperty()
  @IsOptional()
  public readonly id: number;

  @IsString()
  @ApiProperty()
  public readonly name: string;
  
  @IsString()
  @ApiProperty()
  public readonly email: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  public readonly otherName: string;
  
  @IsNumber()
  @ApiProperty()
  public readonly age: number;
  
  @IsNumber()
  @ApiProperty()
  public readonly verifiedAge: number;

  @IsDateString()
  @ApiProperty()
  public readonly birthday: string;

  @IsString()
  @ApiProperty()
  public readonly citizenship: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  public readonly ethnicity: string;

  @IsString()
  @ApiProperty()
  public readonly nationality: string;

  @IsNumber()
  @ApiProperty()
  public readonly maritalStatus: number;

  @IsNumber()
  @ApiProperty()
  public readonly children: number;

  @IsString()
  @ApiProperty()
  @IsOptional()
  public readonly originAddress: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  public readonly originCountry: string;

  @IsString()
  @ApiProperty()
  public readonly currentAddress: string;

  @IsString()
  @ApiProperty()
  public readonly phoneNumber: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  public readonly preferredLanguage: string;

  @IsNumber()
  @ApiProperty()
  public readonly genre: number;
}

export class UpdateVictimDto {
  @IsString()
  @ApiProperty()
  @IsOptional()
  public readonly name?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  public readonly email?: string;
  
  @IsString()
  @ApiProperty()
  @IsOptional()
  public readonly otherName?: string;
  
  @IsNumber()
  @ApiProperty()
  @IsOptional()
  public readonly age?: number;
  
  @IsNumber()
  @ApiProperty()
  @IsOptional()
  public readonly verifiedAge?: number;

  @IsDateString()
  @ApiProperty()
  @IsOptional()
  public readonly birthday?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  public readonly citizenship?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  public readonly ethnicity?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  public readonly nationality?: string;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  public readonly maritalStatus?: number;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  public readonly children?: number;

  @IsString()
  @ApiProperty()
  @IsOptional()
  public readonly originAddress?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  public readonly originCountry?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  public readonly currentAddress?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  public readonly phoneNumber?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  public readonly preferredLanguage?: string;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  public readonly genre?: number;
}
