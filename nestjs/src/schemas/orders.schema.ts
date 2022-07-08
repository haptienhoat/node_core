import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({timestamps: true})
export class Order {
  @Prop({required: true})
  username: string;

  @Prop({required: true})
  item: [{id:string, name: string,quantity: number,price: number}];

  @Prop({required: true})
  price: number;

  @Prop({required: true})
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);