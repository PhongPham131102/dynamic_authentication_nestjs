import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';
import { PermissionModule } from '../permission/permission.module';
@Module({
  imports: [UserModule, RoleModule, PermissionModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
