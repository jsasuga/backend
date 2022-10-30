import { IsBoolean, IsDate, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSurvivorEvaluationDto {
    @IsNumber()
    @ApiProperty()
	public readonly violenceType: number;

    @IsNumber()
    @ApiProperty()
	public readonly provinceId: number;

    @IsString()
    @ApiProperty()
	public readonly place: string;

    @IsNumber()
    @ApiProperty()
	public readonly phase: number;

    @IsNumber()
    @ApiProperty()
	public readonly security1: number;

    @IsNumber()
    @ApiProperty()
	public readonly security2: number;

    @IsNumber()
    @ApiProperty()
	public readonly security3: number;

    @IsString()
    @ApiProperty()
	public readonly securityNotes: string;
    
    @IsNumber()
    @ApiProperty()
	public readonly legalProtection1: number;
    
    @IsNumber()
    @ApiProperty()
	public readonly legalProtection2: number;
    
    @IsNumber()
    @ApiProperty()
	public readonly legalProtection3: number;
    
    @IsString()
    @ApiProperty()
	public readonly legalProtectionNotes: string;
    
    @IsNumber()
    @ApiProperty()
	public readonly mentalWelfare1: number;
    
    @IsNumber()
    @ApiProperty()
	public readonly mentalWelfare2: number;
    
    @IsNumber()
    @ApiProperty()
	public readonly mentalWelfare3: number;
    
    @IsNumber()
    @ApiProperty()
	public readonly mentalWelfare4: number;
    
    @IsString()
    @ApiProperty()
	public readonly mentalWelfareNotes: string;
    
    @IsNumber()
    @ApiProperty()
	public readonly financial1: number;
    
    @IsNumber()
    @ApiProperty()
	public readonly financial2: number;
    
    @IsNumber()
    @ApiProperty()
	public readonly financial3: number;
    
    @IsNumber()
    @ApiProperty()
	public readonly financial4: number;
    
    @IsString()
    @ApiProperty()
	public readonly financialNotes: string;
    
    @IsNumber()
    @ApiProperty()
	public readonly social1: number;
    
    @IsNumber()
    @ApiProperty()
	public readonly social2: number;
    
    @IsNumber()
    @ApiProperty()
	public readonly social3: number;
    
    @IsNumber()
    @ApiProperty()
	public readonly social4: number;
    
    @IsString()
    @ApiProperty()
	public readonly socialNotes: string;
    
    @IsNumber()
    @ApiProperty()
	public readonly physical1: number;
    
    @IsNumber()
    @ApiProperty()
	public readonly physical2: number;
    
    @IsNumber()
    @ApiProperty()
	public readonly physical3: number;
    
    @IsNumber()
    @ApiProperty()
	public readonly physical4: number;

    @IsNumber()
    @ApiProperty()
	public readonly physical5: number;
    
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
    @IsOptional()
    @ApiProperty()
	public readonly violenceType: number;

    @IsString()
    @IsOptional()
    @ApiProperty()
	public readonly place: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
	public readonly phase: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
	public readonly security1: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
	public readonly security2: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
	public readonly security3: number;

    @IsString()
    @IsOptional()
    @ApiProperty()
	public readonly securityNotes: string;
    
    @IsNumber()
    @IsOptional()
    @ApiProperty()
	public readonly legalProtection1: number;
    
    @IsNumber()
    @IsOptional()
    @ApiProperty()
	public readonly legalProtection2: number;
    
    @IsNumber()
    @IsOptional()
    @ApiProperty()
	public readonly legalProtection3: number;
    
    @IsString()
    @IsOptional()
    @ApiProperty()
	public readonly legalProtectionNotes: string;
    
    @IsNumber()
    @IsOptional()
    @ApiProperty()
	public readonly mentalWelfare1: number;
    
    @IsNumber()
    @IsOptional()
    @ApiProperty()
	public readonly mentalWelfare2: number;
    
    @IsNumber()
    @IsOptional()
    @ApiProperty()
	public readonly mentalWelfare3: number;
    
    @IsNumber()
    @IsOptional()
    @ApiProperty()
	public readonly mentalWelfare4: number;
    
    @IsString()
    @IsOptional()
    @ApiProperty()
	public readonly mentalWelfareNotes: string;
    
    @IsNumber()
    @IsOptional()
    @ApiProperty()
	public readonly financial1: number;
    
    @IsNumber()
    @IsOptional()
    @ApiProperty()
	public readonly financial2: number;
    
    @IsNumber()
    @IsOptional()
    @ApiProperty()
	public readonly financial3: number;
    
    @IsNumber()
    @IsOptional()
    @ApiProperty()
	public readonly financial4: number;
    
    @IsString()
    @IsOptional()
    @ApiProperty()
	public readonly financialNotes: string;
    
    @IsNumber()
    @IsOptional()
    @ApiProperty()
	public readonly social1: number;
    
    @IsNumber()
    @IsOptional()
    @ApiProperty()
	public readonly social2: number;
    
    @IsNumber()
    @IsOptional()
    @ApiProperty()
	public readonly social3: number;
    
    @IsNumber()
    @IsOptional()
    @ApiProperty()
	public readonly social4: number;
    
    @IsString()
    @IsOptional()
    @ApiProperty()
	public readonly socialNotes: string;
    
    @IsNumber()
    @IsOptional()
    @ApiProperty()
	public readonly physical1: number;
    
    @IsNumber()
    @IsOptional()
    @ApiProperty()
	public readonly physical2: number;
    
    @IsNumber()
    @IsOptional()
    @ApiProperty()
	public readonly physical3: number;
    
    @IsNumber()
    @IsOptional()
    @ApiProperty()
	public readonly physical4: number;
    
    @IsNumber()
    @IsOptional()
    @ApiProperty()
	public readonly physical5: number;

    @IsString()
    @IsOptional()
    @ApiProperty()
	public readonly physicalNotes: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
	public readonly total: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
	public readonly survivorStatus: number;

    @IsDateString()
    @IsOptional()
    @ApiProperty()
	public readonly completedAt: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
	public readonly completed: boolean;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
	public readonly userInChargeId: number;
}
