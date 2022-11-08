import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from '../provider/provider.entity';
import { Role } from '../role/role.entity';
import { AuthModule } from '../user/auth/auth.module';
import { User } from '../user/user.entity';
import { VictimController } from './victim.controller';
import { Victim } from './victim.entity';
import { VictimService } from './victim.service';

@Module({
  imports: [TypeOrmModule.forFeature([Victim, User, Provider, Role]), AuthModule],
  controllers: [VictimController],
  providers: [VictimService]
})
export class VictimModule {}
