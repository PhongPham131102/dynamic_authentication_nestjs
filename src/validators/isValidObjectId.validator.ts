import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Types } from 'mongoose';

@ValidatorConstraint({ async: false })
class IsObjectIdConstraint implements ValidatorConstraintInterface {
  validate(id: any) {
    return Types.ObjectId.isValid(id);
  }

  defaultMessage() {
    return 'Role must be a valid ObjectId';
  }
}

export function IsObjectId(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsObjectIdConstraint,
    });
  };
}
