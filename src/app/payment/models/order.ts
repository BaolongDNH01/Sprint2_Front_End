export class Order {
    cartId: number;
    shipMethod: string;
    paymentMethod: string;
    paymentAddress: string;
    shipCost: number;
    totalPrice: number;

    constructor(cartId: number, shipMethod: string, paymentMethod: string, paymentAddress: string, shipCost: number, totalPrice: number) {
      this.cartId = cartId;
      this.shipMethod = shipMethod;
      this.paymentMethod = paymentMethod;
      this.paymentAddress = paymentAddress;
      this.shipCost = shipCost;
      this.totalPrice = totalPrice;
    }
}
