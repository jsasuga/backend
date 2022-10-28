import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VictimDto {
  @IsNumber()
  @ApiProperty()
  @IsOptional()
  public readonly id: number;

  @IsString()
  @ApiProperty()
  public readonly name: string;
  
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

  @IsDate()
  @ApiProperty()
  public readonly birthday: Date;

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