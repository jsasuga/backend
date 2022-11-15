import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Case } from '../case/case.entity';
import { AuthModule } from '../user/auth/auth.module';
import { User } from '../user/user.entity';
import { CommentController } from './comment.controller';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Case]), AuthModule],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
