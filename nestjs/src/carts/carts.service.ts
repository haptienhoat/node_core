import { Product, ProductDocument } from './../schemas/products.schema';
import { Cart, CartDocument } from './../schemas/carts.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartsService {
  constructor(@InjectModel(Cart.name) private CartModel: Model<CartDocument>,
    @InjectModel(Product.name) private ProductModel: Model<ProductDocument>) { }

  async addToCart(user, updateCartDto: UpdateCartDto) {
    let product = await this.ProductModel.findOne({ _id: updateCartDto.item.id})
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    let cart = await this.CartModel.findOne({ username: user.username })
    if (!cart) {
      cart = new this.CartModel(updateCartDto);
      cart.username = user.username;
      await cart.save();
    } else {
      let itemIndex = cart.item.findIndex(item => item.id == updateCartDto.item.id)
      if (itemIndex == -1) {
        cart.item.push(updateCartDto.item)
      } else if (updateCartDto.item.quantity > 0) {
        cart.item[itemIndex] = updateCartDto.item;
      } else {
        cart.item.splice(itemIndex, 1)
      }
    }
    return await cart.save();
  }

  async removeToCart(user, id: string) {
    let cart = await this.CartModel.findOne({ username: user.username });
    if (!cart) throw new NotFoundException('Cart not found');
    let itemIndex = cart.item.findIndex(item => item.id == id)
    if (itemIndex == -1) {
      throw new NotFoundException('Item not found');
    } else {
      cart.item.splice(itemIndex, 1)
    }
    return await cart.save();
  }

  async getCart(username: string) {
    let cart = await this.CartModel.findOne({ username: username });
    if (!cart) throw new NotFoundException('Cart not found');
    else return cart;
  }
}
