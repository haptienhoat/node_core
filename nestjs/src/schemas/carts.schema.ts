import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema({timestamps: true})
export class Cart {
  @Prop({required: true})
  username: string;

  @Prop({required: true})
  item: [{id:string, name: string, quantity: number, price: number}];
}

export const CartSchema = SchemaFactory.createForClass(Cart);