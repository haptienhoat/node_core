import { Product, ProductDocument } from './../schemas/products.schema';
import { Cart, CartDocument } from './../schemas/carts.schema';
import { Order, OrderDocument } from './../schemas/orders.schema';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDto } from './dto/create-order.dto';

import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private OrderModel: Model<OrderDocument>,
    @InjectModel(Cart.name) private CartModel: Model<CartDocument>,
    @InjectModel(Product.name) private ProductModel: Model<ProductDocument>) { }

  async create(user, createOrderDto: CreateOrderDto) {
    for (let index = 0; index < createOrderDto.item.length; index++) {
      let item = createOrderDto.item[index]
      let product = await this.ProductModel.findOne({ _id: item.id })
      if (product.quantity < item.quantity) {
        throw new BadRequestException(`${product.name} does not have enough`);
      }
    }
    for (let index = 0; index < createOrderDto.item.length; index++) {
      let item = createOrderDto.item[index]
      let product = await this.ProductModel.findOne({ _id: item.id })
      product.quantity -= item.quantity
      await this.ProductModel.updateOne({ _id: product.id }, { quantity: product.quantity })
    }
    await this.CartModel.deleteOne({ username: user.username })
    const order = new this.OrderModel(createOrderDto);
    order.username = user.username;
    order.status = "wait"
    return await order.save();
  }

  async findAll() {
    return await this.OrderModel.find({});
  }

  async findOne(id: string) {
    let order = await this.OrderModel.findOne({ _id: id });
    if (!order) throw new NotFoundException('Order not found');
    else return order;
  }

  async update(id: string) {
    let order = await this.OrderModel.findOne({ _id: id });
    if (!order) throw new NotFoundException('Order not found');
    if (order.status == "complete") throw new BadRequestException(`Can not update status order`);

    return await this.OrderModel.updateOne({ _id: id }, { status: "complete" });
  }

  async delete(id: string) {
    let order = await this.OrderModel.findOne({ _id: id });
    if (!order) throw new NotFoundException('Order not found');
    if (order.status == "complete") throw new BadRequestException(`Can not update status order`);
    for (let index = 0; index < order.item.length; index++) {
      let item = order.item[index]
      let product = await this.ProductModel.findOne({ _id: item.id })
      product.quantity += Number(item.quantity)
      await this.ProductModel.updateOne({ _id: product.id }, { quantity: product.quantity })
    }
    return await this.OrderModel.deleteOne({ _id: id });
  }
}
