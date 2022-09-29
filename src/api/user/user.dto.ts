import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateNameDto {
  @IsString()
  @IsOptional()
  public readonly name?: string;
}

export class UpdatePasswordDto {
  @IsString()
  @MinLength(8)
  public readonly password: string;
}
