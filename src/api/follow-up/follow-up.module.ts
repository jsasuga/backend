import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Case } from '../case/case.entity';
import { AuthModule } from '../user/auth/auth.module';
import { FollowUpController } from './follow-up.controller';
import { FollowUp } from './follow-up.entity';
import { FollowUpService } from './follow-up.service';

@Module({
  imports: [TypeOrmModule.forFeature([FollowUp, Case]), AuthModule],
  controllers: [FollowUpController],
  providers: [FollowUpService]
})
export class FollowUpModule {}
