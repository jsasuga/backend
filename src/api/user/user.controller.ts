import { ClassSerializerInterceptor, Controller, Req, UseGuards, UseInterceptors, Put, Get, Body, Inject, Param, Delete } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { UpdateNameDto, UpdatePasswordDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: User,
  })
  private update(@Param('id') id: string, @Body() body: UpdateNameDto, @Req() req: Request): Promise<User> {
    return this.service.update(id, body, req);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: User,
    isArray: true,
  })
  private list(@Req() req: Request): Promise<Array<User> | never> {
    return this.service.list(req);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: User,
  })
  private fetch(@Param('id') id: string, @Req() req: Request): Promise<User | never> {
    return this.service.fetch(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: User,
  })
  async delete(@Param('id') id: string, @Req() req: Request): Promise<User | never> {
    return this.service.delete(id)
  }

  @Get('provider/:providerId')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 200,
    type: User,
    isArray: true,
  })
  private listByProviderId(@Param('providerId') id: string, @Req() req: Request): Promise<Array<User> | never> {
    return this.service.listByProviderId(id);
  }
}
