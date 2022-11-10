import { ClassSerializerInterceptor, Controller, Req, UseGuards, UseInterceptors, Put, Get, Body, Inject, Param, Delete, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { ServiceTypeService } from './service-type.service';
import { ServiceType } from './service-type.entity';
import { CreateServiceTypeDto, UpdateServiceTypeDto } from './service-type.dto';

@ApiBearerAuth()
@Controller('service-type')
@ApiTags('service-type')
export class ServiceTypeController {
  @Inject(ServiceTypeService)
  private readonly service: ServiceTypeService;
  
  @Post('')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: ServiceType,
  })
  private register(@Body() body: CreateServiceTypeDto): Promise<ServiceType | never> {
    return this.service.create(body);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: ServiceType,
    isArray: true,
  })
  private list(@Req() req: Request): Promise<Array<ServiceType> | never> {
    return this.service.list(req);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: ServiceType,
  })
  private fetch(@Param('id') id: string, @Req() req: Request): Promise<ServiceType | never> {
    return this.service.fetch(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: ServiceType,
  })
  private update(@Param('id') id: string, @Body() body: UpdateServiceTypeDto, @Req() req: Request): Promise<ServiceType | never> {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: ServiceType,
  })
  async delete(@Param('id') id: string, @Req() req: Request): Promise<ServiceType | never> {
    return this.service.delete(id)
  }
}
