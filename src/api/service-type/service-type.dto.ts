import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceTypeDto {
    @IsString()
    @ApiProperty()
    public readonly name: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly description?: string;
}

export class UpdateServiceTypeDto {
    @IsString()
    @ApiProperty()
    public readonly name: string;
    
    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly description?: string;
}
