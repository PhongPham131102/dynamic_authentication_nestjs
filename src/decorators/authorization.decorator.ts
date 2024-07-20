import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { RolesGuard } from 'src/guard/role.guard';
import { ActionEnum } from 'src/modules/permission/permission.entity';

export function Authorization(subject?: string, action?: ActionEnum) {
  return applyDecorators(
    SetMetadata('subject', subject),
    SetMetadata('action', action),
    UseGuards(AuthGuard, RolesGuard),
  );
}
