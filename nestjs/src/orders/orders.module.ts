import { Product, ProductSchema } from './../schemas/products.schema';
import { Cart, CartSchema } from './../schemas/carts.schema';
import { Order, OrderSchema } from './../schemas/orders.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
  MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule { }
