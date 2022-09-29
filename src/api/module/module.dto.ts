import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto {
  @IsString()
  @ApiProperty()
  public readonly name: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  public readonly description?: string;
}

export class UpdateModuleDto {
    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly name?: string;
  
    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly description?: string;
}
