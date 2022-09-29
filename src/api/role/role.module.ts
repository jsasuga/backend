import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../user/auth/auth.module';
import { RoleController } from './role.controller';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { Module as ModuleEntity } from '../module/module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, ModuleEntity]), AuthModule],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule {}
