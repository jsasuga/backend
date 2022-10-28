import { ClassSerializerInterceptor, Controller, Req, UseGuards, UseInterceptors, Put, Get, Body, Inject, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { SurvivorEvaluationService } from './survivor-evaluation.service';
import { SurvivorEvaluation } from './survivor-evaluation.entity';
import { CreateSurvivorEvaluationDto, UpdateSurvivorEvaluationDto } from './survivor-evaluation.dto';

@ApiBearerAuth()
@ApiTags('survivor-evaluation')
@Controller('survivor-evaluation')
export class SurvivorEvaluationController {
  @Inject(SurvivorEvaluationService)
  private readonly service: SurvivorEvaluationService;

  @Post('')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: SurvivorEvaluation,
  })
  private register(@Body() body: CreateSurvivorEvaluationDto): Promise<SurvivorEvaluation | never> {
    return this.service.create(body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: SurvivorEvaluation,
  })
  private update(@Param('id') id: string, @Body() body: UpdateSurvivorEvaluationDto, @Req() req: Request): Promise<SurvivorEvaluation> {
    return this.service.update(id, body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: SurvivorEvaluation,
    isArray: true,
  })
  private list(@Req() req: Request): Promise<Array<SurvivorEvaluation> | never> {
    return this.service.list(req);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: SurvivorEvaluation,
  })
  private fetch(@Param('id') id: string, @Req() req: Request): Promise<SurvivorEvaluation | never> {
    return this.service.fetch(id);
  }

  @Get('provider/:userId')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: SurvivorEvaluation,
    isArray: true,
  })
  private listByUserId(@Param('userId') id: string, @Req() req: Request): Promise<Array<SurvivorEvaluation> | never> {
    return this.service.listByUserId(id);
  }
}
