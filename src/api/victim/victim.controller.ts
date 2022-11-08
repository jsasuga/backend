import { ClassSerializerInterceptor, Controller, Req, UseGuards, UseInterceptors, Put, Get, Body, Inject, Param, Delete, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { VictimService } from './victim.service';
import { Victim } from './victim.entity';
import { CreateVictimDto, UpdateVictimDto } from './victim.dto';

@ApiBearerAuth()
@ApiTags('victim')
@Controller('victim')
export class VictimController {
  @Inject(VictimService)
  private readonly service: VictimService;
  
  @Post('')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Victim,
  })
  private register(@Body() body: CreateVictimDto): Promise<Victim | never> {
    return this.service.createNewVictim(body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Victim,
    isArray: true,
  })
  private list(@Req() req: Request): Promise<Array<Victim> | never> {
    return this.service.list(req);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Victim,
  })
  private fetch(@Param('id') id: string, @Req() req: Request): Promise<Victim | never> {
    return this.service.fetch(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Victim,
  })
  private update(@Param('id') id: string, @Body() body: UpdateVictimDto, @Req() req: Request): Promise<Victim | never> {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Victim,
  })
  async delete(@Param('id') id: string, @Req() req: Request): Promise<Victim | never> {
    return this.service.delete(id)
  }
}
