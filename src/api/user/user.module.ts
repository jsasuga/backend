import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthModule } from './auth/auth.module';
import { Role } from '../role/role.entity';
import { Provider } from '../provider/provider.entity';
import { AuthHelper } from './auth/auth.helper';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Provider]), AuthModule],
  controllers: [UserController],
  providers: [UserService, AuthHelper],
})
export class UserModule {}
