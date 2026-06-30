import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole } from 'commons/userRoles.common';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true, unique: true, index: true })
  email: string;

  @Prop({ required: true, trim: true })
  password: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.JobSeeker })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
