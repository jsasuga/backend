import { ClassSerializerInterceptor, Controller, Req, UseGuards, UseInterceptors, Put, Get, Body, Inject, Param, Delete, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { CaseService } from './case.service';
import { Case } from './case.entity';
import { CreateCaseDto, UpdateCaseDto } from './case.dto';
import { CreateDemographicFormDto } from '../demographic-form/demographic-form.dto';
import { CreateAttentionProtocolDto } from '../attention-protocol/attention-protocol.dto';
import { CreateSurvivorEvaluationDto } from '../survivor-evaluation/survivor-evaluation.dto';

@ApiBearerAuth()
@Controller('case')
@ApiTags('case')
export class CaseController {
  @Inject(CaseService)
  private readonly service: CaseService;
  
  @Post('')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Case,
  })
  private register(@Body() body: CreateCaseDto): Promise<Case | never> {
    return this.service.create(body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Case,
    isArray: true,
  })
  private list(@Req() req: Request): Promise<Array<Case> | never> {
    return this.service.list(req);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Case,
  })
  private fetch(@Param('id') id: string, @Req() req: Request): Promise<Case | never> {
    return this.service.fetch(id);
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Case,
    isArray: true,
  })
  private listByUserId(@Param('userId') id: string, @Req() req: Request): Promise<Array<Case> | never> {
    return this.service.listByUserId(id);
  }

  @Get('provider/:providerId')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Case,
    isArray: true,
  })
  private listByProviderId(@Param('providerId') id: string, @Req() req: Request): Promise<Array<Case> | never> {
    return this.service.listByProviderId(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Case,
  })
  private update(@Param('id') id: string, @Body() body: UpdateCaseDto, @Req() req: Request): Promise<Case | never> {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Case,
  })
  async delete(@Param('id') id: string, @Req() req: Request): Promise<Case | never> {
    return this.service.delete(id)
  }

  @Post('demographic-form/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Case,
  })
  private addDemographicForm(
    @Param('id') id: string, 
    @Body() body: CreateDemographicFormDto
  ): Promise<Case | never> {
    return this.service.addDemographicForm(id, body);
  }

  @Post('attention-protocol/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Case,
  })
  private addAttentionProtocol(
    @Param('id') id: string, 
    @Body() body: CreateAttentionProtocolDto
  ): Promise<Case | never> {
    return this.service.addAttentionProtocol(id, body);
  }

  @Post('survivor-evaluation/:id/:when')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiParam({name: 'when', required: true, type: 'string', enum: ['initial', 'final', 'post']})
  @ApiResponse({
    status: 200,
    type: Case,
  })
  private addSurvivorEvaluation(
    @Param('id') id: string, 
    @Param('when') when: string, 
    @Body() body: CreateSurvivorEvaluationDto
  ): Promise<Case | never> {
    return this.service.addSurvivorEvaluation(id, when, body);
  }
}
