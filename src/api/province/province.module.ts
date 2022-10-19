import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../user/auth/auth.module';
import { ProvinceController } from './province.controller';
import { Province } from './province.entity';
import { ProvinceService } from './province.service';

@Module({
  imports: [TypeOrmModule.forFeature([Province]), AuthModule],
  controllers: [ProvinceController],
  providers: [ProvinceService]
})
export class ProvinceModule {}
