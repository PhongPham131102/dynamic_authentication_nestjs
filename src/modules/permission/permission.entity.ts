import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Role, RoleDocument } from '../role/role.entity';
export enum ActionEnum {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  MANAGE = 'manage',
}
export enum SubjectEnum {
  ALL = 'all',
  USER = 'user',
  ROLE = 'role',
}
export type PermissionDocument = HydratedDocument<Permission>;
@Schema({ timestamps: true })
export class Permission {
  @Prop({ type: Types.ObjectId, ref: Role.name, required: true })
  role: RoleDocument;
  @Prop({ type: [String], enum: ActionEnum, required: true, default: [] })
  action: string[];

  @Prop({ type: String, enum: SubjectEnum, required: true })
  subject: string;
}
export const PermissionSchema = SchemaFactory.createForClass(Permission);
