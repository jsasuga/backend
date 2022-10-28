import { ClassSerializerInterceptor, Controller, Req, UseGuards, UseInterceptors, Put, Get, Body, Inject, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { AttentionProtocol } from './attention-protocol.entity';
import { AttentionProtocolService } from './attention-protocol.service';
import { CreateAttentionProtocolDto, UpdateAttentionProtocolDto } from './attention-protocol.dto';

@ApiBearerAuth()
@ApiTags('attention-protocol')
@Controller('attention-protocol')
export class AttentionProtocolController {
  @Inject(AttentionProtocolService)
  private readonly service: AttentionProtocolService;

  @Post('')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: AttentionProtocol,
  })
  private register(@Body() body: CreateAttentionProtocolDto): Promise<AttentionProtocol | never> {
    return this.service.create(body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: AttentionProtocol,
  })
  private update(@Param('id') id: string, @Body() body: UpdateAttentionProtocolDto, @Req() req: Request): Promise<AttentionProtocol> {
    return this.service.update(id, body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: AttentionProtocol,
    isArray: true,
  })
  private list(@Req() req: Request): Promise<Array<AttentionProtocol> | never> {
    return this.service.list(req);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: AttentionProtocol,
  })
  private fetch(@Param('id') id: string, @Req() req: Request): Promise<AttentionProtocol | never> {
    return this.service.fetch(id);
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: AttentionProtocol,
    isArray: true,
  })
  private listByUserId(@Param('userId') id: string, @Req() req: Request): Promise<Array<AttentionProtocol> | never> {
    return this.service.listByUserId(id);
  }
}
