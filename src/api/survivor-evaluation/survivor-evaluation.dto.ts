import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSurvivorEvaluationDto {
    @IsNumber()
    @ApiProperty()
	public readonly violenceType: number;

    @IsNumber()
    @ApiProperty()
	public readonly provinceId: number;

    @IsNumber()
    @ApiProperty()
	public readonly providerId: number;

    @IsString()
    @ApiProperty()
	public readonly place: string;

    @IsNumber()
    @ApiProperty()
	public readonly phase: number;

    @IsString()
    @ApiProperty()
	public readonly security: string;

    @IsString()
    @ApiProperty()
	public readonly securityNotes: string;
    
    @IsString()
    @ApiProperty()
	public readonly legalProtection: string;
    
    @IsString()
    @ApiProperty()
	public readonly legalProtectionNotes: string;
    
    @IsString()
    @ApiProperty()
	public readonly mentalWelfare: string;
    
    @IsString()
    @ApiProperty()
	public readonly mentalWelfareNotes: string;
    
    @IsString()
    @ApiProperty()
	public readonly financial: string;
    
    @IsString()
    @ApiProperty()
	public readonly financialNotes: string;
    
    @IsString()
    @ApiProperty()
	public readonly social: string;
    
    @IsString()
    @ApiProperty()
	public readonly socialNotes: string;
    
    @IsString()
    @ApiProperty()
	public readonly physical: string;
    
    @IsString()
    @ApiProperty()
	public readonly physicalNotes: string;

    @IsNumber()
    @ApiProperty()
	public readonly total: number;

    @IsNumber()
    @ApiProperty()
	public readonly survivorStatus: number;

    @IsNumber()
    @ApiProperty()
	public readonly userInChargeId: number;
}

export class UpdateSurvivorEvaluationDto {
    @IsNumber()
    @ApiProperty()
	public readonly violenceType: number;

    @IsString()
    @ApiProperty()
	public readonly place: string;

    @IsNumber()
    @ApiProperty()
	public readonly phase: number;

    @IsString()
    @ApiProperty()
	public readonly security: string;

    @IsString()
    @ApiProperty()
	public readonly securityNotes: string;
    
    @IsString()
    @ApiProperty()
	public readonly legalProtection: string;
    
    @IsString()
    @ApiProperty()
	public readonly legalProtectionNotes: string;
    
    @IsString()
    @ApiProperty()
	public readonly mentalWelfare: string;
    
    @IsString()
    @ApiProperty()
	public readonly mentalWelfareNotes: string;
    
    @IsString()
    @ApiProperty()
	public readonly financial: string;
    
    @IsString()
    @ApiProperty()
	public readonly financialNotes: string;
    
    @IsString()
    @ApiProperty()
	public readonly social: string;
    
    @IsString()
    @ApiProperty()
	public readonly socialNotes: string;
    
    @IsString()
    @ApiProperty()
	public readonly physical: string;
    
    @IsString()
    @ApiProperty()
	public readonly physicalNotes: string;

    @IsNumber()
    @ApiProperty()
	public readonly total: number;

    @IsNumber()
    @ApiProperty()
	public readonly survivorStatus: number;

    @IsDate()
    @ApiProperty()
	public readonly completedAt: Date;
}
