import { IsOptional } from 'class-validator';
export class LoginUserDto {
  @IsOptional()
  username: string;
  @IsOptional()
  password: string;
}
