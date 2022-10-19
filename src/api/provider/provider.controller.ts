import { ClassSerializerInterceptor, Controller, Req, UseGuards, UseInterceptors, Put, Get, Body, Inject, Param, Delete, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { UpdateProviderDto, CreateProviderDto } from './provider.dto';
import { Provider } from './provider.entity';
import { ProviderService } from './provider.service';

@ApiBearerAuth()
@Controller('provider')
@ApiTags('provider')
export class ProviderController {
  @Inject(ProviderService)
  private readonly service: ProviderService;
  
  @Post('')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Provider,
  })
  private register(@Body() body: CreateProviderDto): Promise<Provider | never> {
    return this.service.create(body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Provider,
    isArray: true,
  })
  private list(@Req() req: Request): Promise<Array<Provider> | never> {
    return this.service.list(req);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Provider,
  })
  private fetch(@Param('id') id: string, @Req() req: Request): Promise<Provider | never> {
    return this.service.fetch(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Provider,
  })
  private update(@Param('id') id: string, @Body() body: UpdateProviderDto, @Req() req: Request): Promise<Provider | never> {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Provider,
  })
  async delete(@Param('id') id: string, @Req() req: Request): Promise<Provider | never> {
    return this.service.delete(id)
  }
}
