import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../user/auth/auth.module';
import { ProviderAreasController } from './provider-areas.controller';
import { ProviderAreas } from './provider-areas.entity';
import { ProviderAreasService } from './provider-areas.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProviderAreas]), AuthModule],
  controllers: [ProviderAreasController],
  providers: [ProviderAreasService]
})
export class ProviderAreasModule {}
