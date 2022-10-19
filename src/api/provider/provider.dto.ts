import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProviderDto {
  @IsString()
  @ApiProperty()
  public readonly name: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  public readonly phoneNumber?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  public readonly email?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  public readonly address?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  public readonly description?: string;

  @IsNumber()
  @ApiProperty()
  public readonly provinceId: number;

  @IsNumber()
  @ApiProperty()
  public readonly serviceTypeId: number;

  @IsNumber()
  @ApiProperty()
  public readonly providerAreaId: number;

  @IsString()
  @ApiProperty()
  @IsOptional()
  public readonly networkInterest?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  public readonly networkNeeds?: string;
}

export class UpdateProviderDto {
    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly name?: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly phoneNumber?: string;
  
    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly email?: string;
  
    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly address?: string;
  
    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly description?: string;
  
    @IsNumber()
    @ApiProperty()
    @IsOptional()
    public readonly provinceId?: number;

    @IsNumber()
    @ApiProperty()
    @IsOptional()
    public readonly serviceTypeId?: number;
  
    @IsNumber()
    @ApiProperty()
    @IsOptional()
    public readonly providerAreaId?: number;
  
    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly networkInterest?: string;
  
    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly networkNeeds?: string;
}
