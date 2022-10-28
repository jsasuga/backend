import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../user/auth/auth.module';
import { VictimController } from './victim.controller';
import { Victim } from './victim.entity';
import { VictimService } from './victim.service';

@Module({
  imports: [TypeOrmModule.forFeature([Victim]), AuthModule],
  controllers: [VictimController],
  providers: [VictimService]
})
export class VictimModule {}
