import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Inject, Param, Post, Put, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../user/auth/auth.guard';
import { CreateFollowUpDto, UpdateFollowUpDto } from './follow-up.dto';
import { FollowUp } from './follow-up.entity';
import { FollowUpService } from './follow-up.service';

@ApiBearerAuth()
@Controller('follow-up')
@ApiTags('follow-up')
export class FollowUpController {
  @Inject(FollowUpService)
  private readonly service: FollowUpService;

  @Post('')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: FollowUp,
  })
  private register(@Body() body: CreateFollowUpDto): Promise<FollowUp | never> {
    return this.service.create(body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: FollowUp,
  })
  private update(@Param('id') id: string, @Body() body: UpdateFollowUpDto, @Req() req: Request): Promise<FollowUp> {
    return this.service.update(id, body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: FollowUp,
    isArray: true,
  })
  private list(@Req() req: Request): Promise<Array<FollowUp> | never> {
    return this.service.list(req);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: FollowUp,
  })
  private fetch(@Param('id') id: string, @Req() req: Request): Promise<FollowUp | never> {
    return this.service.fetch(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: FollowUp,
  })
  async delete(@Param('id') id: string, @Req() req: Request): Promise<FollowUp | never> {
    return this.service.delete(id)
  }
}
