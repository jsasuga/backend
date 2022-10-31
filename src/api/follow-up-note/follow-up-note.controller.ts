import { ClassSerializerInterceptor, Controller, Req, UseGuards, UseInterceptors, Put, Get, Body, Inject, Param, Post, Delete } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { FollowUpNoteService } from './follow-up-note.service';
import { FollowUpNote } from './follow-up-note.entity';
import { CreateFollowUpNoteDto, UpdateFollowUpNoteDto } from './follow-up-note.dto';

@ApiBearerAuth()
@ApiTags('follow-up-note')
@Controller('follow-up-note')
export class FollowUpNoteController {
  @Inject(FollowUpNoteService)
  private readonly service: FollowUpNoteService;

  @Post('')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: FollowUpNote,
  })
  private register(@Body() body: CreateFollowUpNoteDto): Promise<FollowUpNote | never> {
    return this.service.create(body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: FollowUpNote,
  })
  private update(@Param('id') id: string, @Body() body: UpdateFollowUpNoteDto, @Req() req: Request): Promise<FollowUpNote> {
    return this.service.update(id, body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: FollowUpNote,
    isArray: true,
  })
  private list(@Req() req: Request): Promise<Array<FollowUpNote> | never> {
    return this.service.list(req);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: FollowUpNote,
  })
  private fetch(@Param('id') id: string, @Req() req: Request): Promise<FollowUpNote | never> {
    return this.service.fetch(id);
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: FollowUpNote,
    isArray: true,
  })
  private listByUserId(@Param('userId') id: string, @Req() req: Request): Promise<Array<FollowUpNote> | never> {
    return this.service.listByUserId(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: FollowUpNote,
  })
  async delete(@Param('id') id: string, @Req() req: Request): Promise<FollowUpNote | never> {
    return this.service.delete(id)
  }
}
