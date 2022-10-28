import { Trim } from 'class-sanitizer';
import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @Trim()
  @IsEmail()
  @ApiProperty()
  public readonly email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty()
  public readonly password: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  public readonly name?: string;

  @IsNumber()
  @ApiProperty()
  public readonly roleId: number;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  public readonly providerId?: number;
}

export class LoginDto {
  @Trim()
  @IsEmail()
  @ApiProperty()
  public readonly email: string;

  @IsString()
  @ApiProperty()
  public readonly password: string;
}
