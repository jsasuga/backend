import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDemographicFormDto {
    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly participation?: string;

    @IsNumber()
    @ApiProperty()
    @IsOptional()
    public readonly commitment?: number;

    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly comments?: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly description?: string;

    @IsNumber()
    @ApiProperty()
    public readonly userInChargeId: number;
}

export class UpdateDemographicFormDto {
    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly participation?: string;

    @IsNumber()
    @ApiProperty()
    @IsOptional()
    public readonly commitment?: number;

    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly comments?: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly description?: string;

    @IsNumber()
    @ApiProperty()
    @IsOptional()
    public readonly userInChargeId?: number;
}
