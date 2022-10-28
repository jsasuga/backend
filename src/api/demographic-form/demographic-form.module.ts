import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../user/auth/auth.module';
import { User } from '../user/user.entity';
import { DemographicFormController } from './demographic-form.controller';
import { DemographicForm } from './demographic-form.entity';
import { DemographicFormService } from './demographic-form.service';

@Module({
  imports: [TypeOrmModule.forFeature([DemographicForm, User]), AuthModule],
  controllers: [DemographicFormController],
  providers: [DemographicFormService]
})
export class DemographicFormModule {}
