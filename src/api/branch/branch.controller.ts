import { ClassSerializerInterceptor, Controller, Req, UseGuards, UseInterceptors, Put, Get, Body, Inject, Param, Delete, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { CreateBranchDto, UpdateBranchDto } from './branch.dto';
import { Branch } from './branch.entity';
import { BranchService } from './branch.service';

@ApiBearerAuth()
@Controller('branch')
@ApiTags('branch')
export class BranchController {
  @Inject(BranchService)
  private readonly service: BranchService;
  
  @Post('')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Branch,
  })
  private register(@Body() body: CreateBranchDto): Promise<Branch | never> {
    return this.service.create(body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Branch,
    isArray: true,
  })
  private list(@Req() req: Request): Promise<Array<Branch> | never> {
    return this.service.list(req);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Branch,
  })
  private fetch(@Param('id') id: string, @Req() req: Request): Promise<Branch | never> {
    return this.service.fetch(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Branch,
  })
  private update(@Param('id') id: string, @Body() body: UpdateBranchDto, @Req() req: Request): Promise<Branch | never> {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Branch,
  })
  async delete(@Param('id') id: string, @Req() req: Request): Promise<Branch | never> {
    return this.service.delete(id)
  }
}
