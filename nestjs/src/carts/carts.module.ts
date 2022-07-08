import { Product, ProductSchema } from './../schemas/products.schema';
import { Cart, CartSchema } from './../schemas/Carts.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])
  ],
  controllers: [CartsController],
  providers: [CartsService]
})
export class CartsModule { }
