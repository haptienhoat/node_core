export class UpdateCartDto {
    item: {
        id: string,
        image: string,
        name: string,
        quantity: number,
        price: number
    }
}
