import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ActionEnum } from '../permission.entity';

export class UpdatePermisstionDto {
  @IsOptional()
  @IsEnum(ActionEnum, {
    each: true,
    message: 'Action Must A Type Of Action Enum',
  })
  action: ActionEnum[];
  @IsOptional()
  @IsString({ message: 'Subject Must Be A String' })
  subject: string;
}
