import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from '../provider/provider.entity';
import { Province } from '../province/province.entity';
import { AuthModule } from '../user/auth/auth.module';
import { User } from '../user/user.entity';
import { SurvivorEvaluationController } from './survivor-evaluation.controller';
import { SurvivorEvaluation } from './survivor-evaluation.entity';
import { SurvivorEvaluationService } from './survivor-evaluation.service';

@Module({
  imports: [TypeOrmModule.forFeature([SurvivorEvaluation, User, Province, Provider]), AuthModule],
  controllers: [SurvivorEvaluationController],
  providers: [SurvivorEvaluationService]
})
export class SurvivorEvaluationModule {}
