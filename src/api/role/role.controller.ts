import { ClassSerializerInterceptor, Controller, Req, UseGuards, UseInterceptors, Put, Get, Body, Inject, Param, Delete, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { UpdateRoleDto, CreateRoleDto, UpdateRolePermissionsDto } from './role.dto';
import { Role } from './role.entity';
import { RoleService } from './role.service';

@ApiBearerAuth()
@ApiTags('roles')
@Controller('role')
export class RoleController {
  @Inject(RoleService)
  private readonly service: RoleService;
  
  @Post('')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Role,
  })
  private register(@Body() body: CreateRoleDto): Promise<Role | never> {
    return this.service.create(body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Role,
    isArray: true,
  })
  private list(@Req() req: Request): Promise<Array<Role> | never> {
    return this.service.list(req);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Role,
  })
  private fetch(@Param('id') id: string, @Req() req: Request): Promise<Role | never> {
    return this.service.fetch(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Role,
  })
  private update(@Param('id') id: string, @Body() body: UpdateRoleDto, @Req() req: Request): Promise<Role | never> {
    return this.service.update(id, body);
  }

  @Put(':id/permissions')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Role,
  })
  private updatePermissions(@Param('id') id: string, @Body() body: UpdateRolePermissionsDto, @Req() req: Request): Promise<Role | never> {
    return this.service.updatePermissions(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: Role,
  })
  async delete(@Param('id') id: string, @Req() req: Request): Promise<Role | never> {
    return this.service.delete(id)
  }
}
