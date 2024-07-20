import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';

export function Authentication() {
  return applyDecorators(UseGuards(AuthGuard));
}
