import { ClassSerializerInterceptor, Controller, Req, UseGuards, UseInterceptors, Put, Get, Body, Inject, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { DemographicFormService } from './demographic-form.service';
import { DemographicForm } from './demographic-form.entity';
import { CreateDemographicFormDto, UpdateDemographicFormDto } from './demographic-form.dto';

@ApiBearerAuth()
@ApiTags('demographic-form')
@Controller('demographic-form')
export class DemographicFormController {
  @Inject(DemographicFormService)
  private readonly service: DemographicFormService;
  
  @Post('')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: DemographicForm,
  })
  private register(@Body() body: CreateDemographicFormDto): Promise<DemographicForm | never> {
    return this.service.create(body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: DemographicForm,
  })
  private update(@Param('id') id: string, @Body() body: UpdateDemographicFormDto, @Req() req: Request): Promise<DemographicForm> {
    return this.service.update(id, body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: DemographicForm,
    isArray: true,
  })
  private list(@Req() req: Request): Promise<Array<DemographicForm> | never> {
    return this.service.list(req);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: DemographicForm,
  })
  private fetch(@Param('id') id: string, @Req() req: Request): Promise<DemographicForm | never> {
    return this.service.fetch(id);
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: DemographicForm,
    isArray: true,
  })
  private listByUserId(@Param('userId') id: string, @Req() req: Request): Promise<Array<DemographicForm> | never> {
    return this.service.listByUserId(id);
  }
}
