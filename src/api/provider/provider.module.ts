import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../user/auth/auth.module';
import { ProviderController } from './provider.controller';
import { Provider } from './provider.entity';
import { Province } from '../province/province.entity';
import { ServiceType } from '../service-type/service-type.entity';
import { ProviderAreas } from '../provider-areas/provider-areas.entity';
import { ProviderService } from './provider.service';

@Module({
  imports: [TypeOrmModule.forFeature([Provider, Province, ServiceType, ProviderAreas]), AuthModule],
  controllers: [ProviderController],
  providers: [ProviderService]
})
export class ProviderModule {}
