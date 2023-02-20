import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNameDto {
  @IsString()
  @ApiProperty()
  @IsOptional()
  public readonly name?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  public readonly lastName?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  public readonly userCode?: string;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  public readonly roleId?: number;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  public readonly providerId?: number;
}

export class UpdatePasswordDto {
  @IsString()
  @ApiProperty()
  @MinLength(8)
  public readonly password: string;
}
