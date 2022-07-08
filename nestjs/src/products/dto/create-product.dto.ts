import mongoose from "mongoose";

export class CreateProductDto {
    name: string;
    category: string;
    image: string;
    quantity: number;
    price: number;
    description: string;
}
