import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { IsObjectId } from 'src/validators/isValidObjectId.validator';
export class CreateUserDto {
  @IsNotEmpty({ message: 'User Name Is Not Empty' })
  @IsString({ message: 'Please Enter User Name' })
  username: string;
  @IsNotEmpty({ message: 'Password Is Not Empty' })
  @IsString({ message: 'Please Enter Password' })
  password: string;
  @IsNotEmpty({ message: 'Your Full Name Is Not Empty' })
  @IsString({ message: 'Please Enter Your Full Name' })
  fullname: string;
  @IsOptional()
  @IsEmail()
  email: string;
  @IsNotEmpty({ message: 'Your Role Is Not Empty' })
  @IsString({ message: 'Please Select Your Role' })
  @IsObjectId({ message: 'Role Is Not Valid Value' })
  role: string;
  @IsOptional()
  @IsString({ message: 'Please Enter Your Phone Number' })
  phoneNumber: string;
}
