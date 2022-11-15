import { ClassSerializerInterceptor, Controller, Req, UseGuards, UseInterceptors, Put, Get, Body, Inject, Param, Post, Delete } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';

@Controller('comment')
@ApiTags('comment')
@Controller('comment')
export class CommentController {
  @Inject(CommentService)
  private readonly service: CommentService;
  
  @Post('')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Comment,
  })
  private register(@Body() body: CreateCommentDto): Promise<Comment | never> {
    return this.service.create(body);
  }
  
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Comment,
  })
  private update(@Param('id') id: string, @Body() body: UpdateCommentDto, @Req() req: Request): Promise<Comment> {
    return this.service.update(id, body);
  }
  
  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Comment,
    isArray: true,
  })
  private list(@Req() req: Request): Promise<Array<Comment> | never> {
    return this.service.list(req);
  }
  
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Comment,
  })
  private fetch(@Param('id') id: string, @Req() req: Request): Promise<Comment | never> {
    return this.service.fetch(id);
  }
  
  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Comment,
    isArray: true,
  })
  private listByUserId(@Param('userId') id: string, @Req() req: Request): Promise<Array<Comment> | never> {
    return this.service.listByUserId(id);
  }

  @Get('case/:caseId')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Comment,
    isArray: true,
  })
  private listByCaseId(@Param('caseId') id: string, @Req() req: Request): Promise<Array<Comment> | never> {
    return this.service.listByCaseId(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Comment,
  })
  async delete(@Param('id') id: string, @Req() req: Request): Promise<Comment | never> {
    return this.service.delete(id)
  }
}
