import { Product, ProductDocument } from '../schemas/products.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private ProductModel: Model<ProductDocument>) { }

  async create(createProductDto: CreateProductDto) {
    const newProduct = new this.ProductModel(createProductDto);
    return await newProduct.save()
  }

  async findAll(name: string, category: string) {
    if (name) {
      return await this.ProductModel.find({ name: {$regex: name} });
    }
    if (category) {
      return await this.ProductModel.find({ category: {$regex: category} })
    }
    let categories = await this.ProductModel.distinct('category')
    let products = await this.ProductModel.find();
    return {products: products, categories: categories}
  }

  async findOne(id: string) {
    let product = await this.ProductModel.findOne({ _id: id });
    if (!product) throw new NotFoundException('Product not found');
    else return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    let updateProduct = await this.ProductModel.findByIdAndUpdate(id, updateProductDto)
    if (!updateProduct) throw new NotFoundException('Product not found');
    else return updateProduct;
  }

  async remove(id: string) {
    let deleteProduct = await this.ProductModel.findByIdAndDelete(id);
    if (!deleteProduct) throw new NotFoundException('Product not found');
    else return deleteProduct;
  }
}
