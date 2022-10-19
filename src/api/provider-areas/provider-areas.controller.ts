import { ClassSerializerInterceptor, Controller, Req, UseGuards, UseInterceptors, Put, Get, Body, Inject, Param, Delete, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { ProviderAreasService } from './provider-areas.service';
import { ProviderAreas } from './provider-areas.entity';
import { CreateProviderAreasDto, UpdateProviderAreasDto } from './provider-areas.dto';

@ApiBearerAuth()
@Controller('provider-areas')
@ApiTags('provider-areas')
export class ProviderAreasController {
  @Inject(ProviderAreasService)
  private readonly service: ProviderAreasService;
  
  @Post('')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: ProviderAreas,
  })
  private register(@Body() body: CreateProviderAreasDto): Promise<ProviderAreas | never> {
    return this.service.create(body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: ProviderAreas,
    isArray: true,
  })
  private list(@Req() req: Request): Promise<Array<ProviderAreas> | never> {
    return this.service.list(req);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: ProviderAreas,
  })
  private fetch(@Param('id') id: string, @Req() req: Request): Promise<ProviderAreas | never> {
    return this.service.fetch(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: ProviderAreas,
  })
  private update(@Param('id') id: string, @Body() body: UpdateProviderAreasDto, @Req() req: Request): Promise<ProviderAreas | never> {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: ProviderAreas,
  })
  async delete(@Param('id') id: string, @Req() req: Request): Promise<ProviderAreas | never> {
    return this.service.delete(id)
  }
}
