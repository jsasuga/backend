import { Module } from '@nestjs/common';
import { ServiceTypeController } from './service-type.controller';
import { ServiceTypeService } from './service-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceType } from './service-type.entity';
import { AuthModule } from '../user/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceType]), AuthModule],
  controllers: [ServiceTypeController],
  providers: [ServiceTypeService]
})
export class ServiceTypeModule {}
