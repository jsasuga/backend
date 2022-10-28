import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Case } from '../case/case.entity';
import { AuthModule } from '../user/auth/auth.module';
import { User } from '../user/user.entity';
import { FollowUpNoteController } from './follow-up-note.controller';
import { FollowUpNote } from './follow-up-note.entity';
import { FollowUpNoteService } from './follow-up-note.service';

@Module({
  imports: [TypeOrmModule.forFeature([FollowUpNote, User, Case]), AuthModule],
  controllers: [FollowUpNoteController],
  providers: [FollowUpNoteService]
})
export class FollowUpNoteModule {}
