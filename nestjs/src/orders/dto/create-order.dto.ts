export class CreateOrderDto {
    item: [{
        id: string,
        name: string,
        quantity: number,
        price: number,
        image: string
    }];
    price: number;
    address: string;
    phone: string;
}
