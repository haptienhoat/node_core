import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema({timestamps: true})
export class Profile {
  @Prop({required: true, unique: true})
  username: string;

  @Prop()
  address: string;

  @Prop()
  date: string;

  @Prop()
  gender: string;

  @Prop()
  phone: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);