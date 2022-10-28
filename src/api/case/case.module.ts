import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../user/auth/auth.module';
import { CaseController } from './case.controller';
import { Case } from './case.entity';
import { CaseService } from './case.service';
import { User } from '../user/user.entity';
import { Provider } from '../provider/provider.entity';
import { Victim } from '../victim/victim.entity';
import { DemographicForm } from '../demographic-form/demographic-form.entity';
import { SurvivorEvaluation } from '../survivor-evaluation/survivor-evaluation.entity';
import { AttentionProtocol } from '../attention-protocol/attention-protocol.entity';
import { FollowUpNote } from '../follow-up-note/follow-up-note.entity';
import { Province } from '../province/province.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Case, User, Provider, Victim, DemographicForm, SurvivorEvaluation, AttentionProtocol, FollowUpNote, Province]), AuthModule],
  controllers: [CaseController],
  providers: [CaseService]
})
export class CaseModule {}
