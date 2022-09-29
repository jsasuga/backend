import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { ModuleModule } from './module/module.module';

@Module({
  imports: [UserModule, RoleModule, ModuleModule]
})
export class ApiModule {}
