import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFollowUpNoteDto {
    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly description?: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly victimThoughts?: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly observations?: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly topics?: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly comprehension?: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly needs?: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly survivorPlan?: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly evaluatorPlan?: string;

    @IsNumber()
    @ApiProperty()
    public readonly userInChargeId: number;

    @IsNumber()
    @ApiProperty()
    public readonly caseId: number;

    @IsDateString()
    @IsOptional()
    @ApiProperty()
    public readonly dueDate: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
	public readonly completed: boolean;
}

export class UpdateFollowUpNoteDto {
    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly description?: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly victimThoughts?: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly observations?: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly topics?: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly comprehension?: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly needs?: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly survivorPlan?: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    public readonly evaluatorPlan?: string;

    @IsDateString()
    @IsOptional()
    @ApiProperty()
    public readonly dueDate: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
	public readonly completed: boolean;
}
