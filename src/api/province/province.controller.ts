import { ClassSerializerInterceptor, Controller, Req, UseGuards, UseInterceptors, Put, Get, Body, Inject, Param, Delete, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { ProvinceService } from './province.service';
import { Province } from './province.entity';
import { CreateProvinceDto, UpdateProvinceDto } from './province.dto';

@ApiBearerAuth()
@Controller('province')
@ApiTags('province')
export class ProvinceController {
  @Inject(ProvinceService)
  private readonly service: ProvinceService;
  
  @Post('')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Province,
  })
  private register(@Body() body: CreateProvinceDto): Promise<Province | never> {
    return this.service.create(body);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Province,
    isArray: true,
  })
  private list(@Req() req: Request): Promise<Array<Province> | never> {
    return this.service.list(req);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Province,
  })
  private fetch(@Param('id') id: string, @Req() req: Request): Promise<Province | never> {
    return this.service.fetch(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Province,
  })
  private update(@Param('id') id: string, @Body() body: UpdateProvinceDto, @Req() req: Request): Promise<Province | never> {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Province,
  })
  async delete(@Param('id') id: string, @Req() req: Request): Promise<Province | never> {
    return this.service.delete(id)
  }
}
