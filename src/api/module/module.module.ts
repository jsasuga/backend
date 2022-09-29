import { Module } from '@nestjs/common';
import { Module as ModuleEntity } from './module.entity';
import { ModuleController } from './module.controller';
import { ModuleService } from './module.service';
import { AuthModule } from '../user/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleEntity]), AuthModule],
  controllers: [ModuleController],
  providers: [ModuleService]
})
export class ModuleModule {}
