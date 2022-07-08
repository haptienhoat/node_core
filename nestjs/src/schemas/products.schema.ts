import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({timestamps: true})
export class Product {
  @Prop({required: true, unique: true})
  name: string;

  @Prop({required: true})
  category: string;

  @Prop({required: true})
  image: string;

  @Prop({default: 0})
  quantity: number;

  @Prop({required: true})
  price: number;

  @Prop()
  description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);