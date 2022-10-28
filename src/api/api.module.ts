import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { ModuleModule } from './module/module.module';
import { ServiceTypeModule } from './service-type/service-type.module';
import { ProvinceModule } from './province/province.module';
import { ProviderModule } from './provider/provider.module';
import { ProviderAreasModule } from './provider-areas/provider-areas.module';
import { BranchModule } from './branch/branch.module';
import { VictimModule } from './victim/victim.module';
import { DemographicFormModule } from './demographic-form/demographic-form.module';
import { SurvivorEvaluationModule } from './survivor-evaluation/survivor-evaluation.module';
import { AttentionProtocolModule } from './attention-protocol/attention-protocol.module';

@Module({
  imports: [UserModule, RoleModule, ModuleModule, ServiceTypeModule, ProvinceModule, ProviderModule, ProviderAreasModule, BranchModule, VictimModule, DemographicFormModule, SurvivorEvaluationModule, AttentionProtocolModule]
})
export class ApiModule {}
