import { IsDecimal, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBranchDto {
  @IsString()
  @ApiProperty()
  public readonly name: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  public readonly personInCharge?: string;

  @IsString()
  @ApiProperty()
  public readonly address: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  public readonly email?: string;

  @IsString()
  @ApiProperty()
  public readonly phoneNumber: string;

  @IsDecimal()
  @ApiProperty()
  @IsOptional()
  public readonly latitude?: number;

  @IsDecimal()
  @ApiProperty()
  @IsOptional()
  public readonly longitude?: number;

  @IsNumber()
  @ApiProperty()
  public readonly providerId: number;
}

export class UpdateBranchDto {
    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly name?: string;
  
    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly personInCharge?: string;
  
    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly address?: string;
  
    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly email?: string;
  
    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly phoneNumber?: string;
  
    @IsDecimal()
    @ApiProperty()
    @IsOptional()
    public readonly latitude?: number;
  
    @IsDecimal()
    @ApiProperty()
    @IsOptional()
    public readonly longitude?: number;
}
