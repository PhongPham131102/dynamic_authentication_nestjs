import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
@Controller('auths')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/sign-up')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }
  @Post('/sign-in')
  signIn(@Body() user: LoginUserDto) {
    return this.authService.signIn(user);
  }
}
