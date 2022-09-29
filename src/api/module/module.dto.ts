import { IsOptional, IsString } from 'class-validator';

export class CreateModuleDto {
  @IsString()
  public readonly name: string;

  @IsString()
  @IsOptional()
  public readonly description?: string;
}

export class UpdateModuleDto {
    @IsString()
    @IsOptional()
    public readonly name?: string;
  
    @IsString()
    @IsOptional()
    public readonly description?: string;
}
