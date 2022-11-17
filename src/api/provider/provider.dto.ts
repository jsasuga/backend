import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
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

  @IsArray()
  @ApiProperty()
  public readonly serviceTypeIds: Array<number>; 

  @IsArray()
  @ApiProperty()
  public readonly providerAreaIds: Array<number>; 

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  public readonly networkInterest?: number;

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

    @IsArray()
    @ApiProperty()
    public readonly serviceTypeIds: Array<number>; 
  
    @IsArray()
    @ApiProperty()
    public readonly providerAreaIds: Array<number>; 
  
    @IsNumber()
    @ApiProperty()
    @IsOptional()
    public readonly networkInterest?: number;
  
    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly networkNeeds?: string;
}
