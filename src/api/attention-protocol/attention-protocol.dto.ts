import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAttentionProtocolDto {    
    @IsNumber()
    @ApiProperty()
	public readonly caseId: number;

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
}
