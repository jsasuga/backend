import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAttentionProtocolDto {
    @IsString()
    @ApiProperty()
    public readonly data: string;
  
    @IsBoolean()
    @ApiProperty()
    public readonly confidentiality: boolean;

    @IsBoolean()
    @ApiProperty()
    public readonly consent: boolean;
  
    @IsBoolean()
    @ApiProperty()
    public readonly treatment: boolean;
  
    @IsString()
    @ApiProperty()
    public readonly security: string;
  
    @IsString()
    @ApiProperty()
    public readonly legalProtection: string;
  
    @IsString()
    @ApiProperty()
    public readonly mental: string;
  
    @IsString()
    @ApiProperty()
    public readonly financial: string;
  
    @IsString()
    @ApiProperty()
    public readonly social: string;
  
    @IsString()
    @ApiProperty()
    public readonly physical: string;
   
    @IsString()
    @ApiProperty()
    public readonly strengths: string;
  
    @IsString()
    @ApiProperty()
    public readonly comments: string;
  
    @IsNumber()
    @ApiProperty()
	public readonly userInChargeId: number;
}

export class UpdateAttentionProtocolDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    public readonly data: string;
  
    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    public readonly confidentiality: boolean;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    public readonly consent: boolean;
  
    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    public readonly treatment: boolean;
  
    @IsString()
    @IsOptional()
    @ApiProperty()
    public readonly security: string;
  
    @IsString()
    @IsOptional()
    @ApiProperty()
    public readonly legalProtection: string;
  
    @IsString()
    @IsOptional()
    @ApiProperty()
    public readonly mental: string;
  
    @IsString()
    @IsOptional()
    @ApiProperty()
    public readonly financial: string;
  
    @IsString()
    @IsOptional()
    @ApiProperty()
    public readonly social: string;
  
    @IsString()
    @IsOptional()
    @ApiProperty()
    public readonly physical: string;
   
    @IsString()
    @IsOptional()
    @ApiProperty()
    public readonly strengths: string;
  
    @IsString()
    @IsOptional()
    @ApiProperty()
    public readonly comments: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    public readonly completed: boolean;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
	public readonly userInChargeId: number;
}
