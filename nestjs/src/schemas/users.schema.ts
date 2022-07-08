import { Role } from './../auth/enums/role.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({timestamps: true})
export class User {
  @Prop({required: true, unique: true})
  username: string;

  @Prop({required: true})
  password: string;

  @Prop({required: true})
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);