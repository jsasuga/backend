import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProvinceDto {
    @IsString()
    @ApiProperty()
    public readonly name: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly description?: string;
}

export class UpdateProvinceDto {
    @IsString()
    @ApiProperty()
    public readonly name: string;
    
    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly description?: string;
}
