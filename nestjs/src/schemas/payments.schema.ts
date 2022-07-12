import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema({timestamps: true})
export class Payment {
  @Prop({required: true})
  username: string;

  @Prop({required: true})
  price: number;

  @Prop({required: true})
  order_id: string;

  @Prop({required: true})
  status: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);