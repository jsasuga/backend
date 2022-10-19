import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProviderAreasDto {
  @IsString()
  @ApiProperty()
  public readonly name: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  public readonly description?: string;
}

export class UpdateProviderAreasDto {
    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly name?: string;
  
    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly description?: string;
}
