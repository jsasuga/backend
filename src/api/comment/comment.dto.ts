import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
    @IsString()
    @ApiProperty()
    public readonly text: string;

    @IsNumber()
    @ApiProperty()
    public readonly userId: number;

    @IsNumber()
    @ApiProperty()
    public readonly caseId: number;
}

export class UpdateCommentDto {
    @IsString()
    @ApiProperty()
    public readonly text: string;
}