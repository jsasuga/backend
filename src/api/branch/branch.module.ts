import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from '../provider/provider.entity';
import { AuthModule } from '../user/auth/auth.module';
import { BranchController } from './branch.controller';
import { Branch } from './branch.entity';
import { BranchService } from './branch.service';

@Module({
  imports: [TypeOrmModule.forFeature([Branch, Provider]), AuthModule],
  controllers: [BranchController],
  providers: [BranchService]
})
export class BranchModule {}
