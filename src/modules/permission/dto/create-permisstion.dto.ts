import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ActionEnum, SubjectEnum } from '../permission.entity';
import { IsObjectId } from 'src/validators/isValidObjectId.validator';

export class CreatePermissionDto {
  @IsNotEmpty({ message: 'Role Is Not Empty ' })
  @IsString({ message: 'Role Must Be A String' })
  @IsObjectId({ message: 'Role Value Not Valid' })
  role: string;
  @IsNotEmpty({ message: 'Action Is Not Empty' })
  @IsEnum(ActionEnum, {
    each: true,
    message: 'Action Must A Type Of Action Enum',
  })
  action: ActionEnum[];
  @IsNotEmpty({ message: 'Subject Is Not Empty' })
  @IsEnum(SubjectEnum, { message: 'Subject Must Be A String' })
  subject: string;
}
