import { IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNameDto {
  @IsString()
  @ApiProperty()
  @IsOptional()
  public readonly name?: string;
}

export class UpdatePasswordDto {
  @IsString()
  @ApiProperty()
  @MinLength(8)
  public readonly password: string;
}
