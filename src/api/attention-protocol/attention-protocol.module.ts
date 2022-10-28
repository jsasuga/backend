import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../user/auth/auth.module';
import { User } from '../user/user.entity';
import { AttentionProtocolController } from './attention-protocol.controller';
import { AttentionProtocol } from './attention-protocol.entity';
import { AttentionProtocolService } from './attention-protocol.service';

@Module({
  imports: [TypeOrmModule.forFeature([AttentionProtocol, User]), AuthModule],
  controllers: [AttentionProtocolController],
  providers: [AttentionProtocolService]
})
export class AttentionProtocolModule {}
