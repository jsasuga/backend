import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { ModuleModule } from './module/module.module';
import { ServiceTypeModule } from './service-type/service-type.module';
import { ProvinceModule } from './province/province.module';
import { ProviderModule } from './provider/provider.module';
import { ProviderAreasModule } from './provider-areas/provider-areas.module';

@Module({
  imports: [UserModule, RoleModule, ModuleModule, ServiceTypeModule, ProvinceModule, ProviderModule, ProviderAreasModule]
})
export class ApiModule {}
