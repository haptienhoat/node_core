import { Injectable ,NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment, PaymentDocument } from 'src/schemas/payments.schema';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(@InjectModel(Payment.name) private PaymentModel: Model<PaymentDocument>) { }
  
  async create(user, createPaymentDto: CreatePaymentDto) {
    const payment = new this.PaymentModel(createPaymentDto);
    payment.username = user.username;
    payment.status = "paid"
    return await payment.save();
  } 

  async findAll(user) {
    return await this.PaymentModel.find({username: user.username});
  }

  async update(user, id: string) {
    let payment = await this.PaymentModel.findOne({ order_id: id , username: user.username});
    if (!payment) throw new NotFoundException('Order not found');
    if (payment.status == "cancel") throw new BadRequestException(`Can not update status order`);
    return await this.PaymentModel.updateOne({ order_id: id }, { status: "cancel" });
  }
}
