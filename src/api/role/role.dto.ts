import { IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  public readonly name: string;

  @IsString()
  @IsOptional()
  public readonly description?: string;
}

export class UpdateRoleDto {
    @IsString()
    @IsOptional()
    public readonly name?: string;
  
    @IsString()
    @IsOptional()
    public readonly description?: string;
}
