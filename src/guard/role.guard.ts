import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionService } from 'src/modules/permission/permission.service';
import { ActionEnum } from 'src/modules/permission/permission.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly permissionService: PermissionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const action = this.reflector.getAllAndOverride<ActionEnum>('action', [
      context.getHandler(),
      context.getClass(),
    ]);
    const subject = this.reflector.getAllAndOverride<string>('subject', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!action || !subject) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (!user.permission || !user.permission.length) {
      throw new ForbiddenException('Bạn không có quyền truy cập');
    }

    const checkRoleAdmin = await this.permissionService.findOneBy({
      role: user.role._id,
      subject: 'all',
      action: 'manage',
    });
    if (checkRoleAdmin) {
      return true;
    }

    const getRolePermission = await this.permissionService.findOneBy({
      role: user.role._id,
      subject: subject,
      action: action,
    });

    if (getRolePermission) {
      return true;
    }

    throw new ForbiddenException('Bạn không có quyền truy cập');
  }
}
