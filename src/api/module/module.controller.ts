import { ClassSerializerInterceptor, Controller, Req, UseGuards, UseInterceptors, Put, Get, Body, Inject, Param, Delete, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { UpdateModuleDto, CreateModuleDto } from './module.dto';
import { Module } from './module.entity';
import { ModuleService } from './module.service';

@ApiBearerAuth()
@ApiTags('modules')
@Controller('module')
export class ModuleController {
  @Inject(ModuleService)
  private readonly service: ModuleService;
  
  @Post('')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Module,
  })
  private register(@Body() body: CreateModuleDto): Promise<Module | never> {
    return this.service.create(body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Module,
    isArray: true,
  })
  private list(@Req() req: Request): Promise<Array<Module> | never> {
    return this.service.list(req);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Module,
  })
  private fetch(@Param('id') id: string, @Req() req: Request): Promise<Module | never> {
    return this.service.fetch(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Module,
  })
  private update(@Param('id') id: string, @Body() body: UpdateModuleDto, @Req() req: Request): Promise<Module | never> {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Module,
  })
  async delete(@Param('id') id: string, @Req() req: Request): Promise<Module | never> {
    return this.service.delete(id)
  }
}
