import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFollowUpDto {
    @IsDateString()
    @IsOptional()
    @ApiProperty()
    public readonly date: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly decisions?: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly lawyer?: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly tribunal?: string;

    @IsDateString()
    @IsOptional()
    @ApiProperty()
    public readonly nextAudienceDate: string;

    @IsNumber()
    @ApiProperty()
    public readonly caseId: number;
}

export class UpdateFollowUpDto {
    @IsDateString()
    @IsOptional()
    @ApiProperty()
    public readonly date: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly decisions?: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly lawyer?: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly tribunal?: string;
    
    @IsDateString()
    @IsOptional()
    @ApiProperty()
    public readonly nextAudienceDate: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
	public readonly cancelled: boolean;
    
    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly cancelledReason?: string;
}
