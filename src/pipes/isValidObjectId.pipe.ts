import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform<string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    const { data } = metadata;
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`Param "${data}" Is Not Valid Value`);
    }
    return value;
  }
}
