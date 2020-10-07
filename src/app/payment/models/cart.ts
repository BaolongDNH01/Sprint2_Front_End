export class Cart {
  cartId: number;
  totalPrice: number;
  shipCost: number;
  cartItemList: any[];

  constructor(cartId: number, totalPrice: number, shipCost: number, cartItemList: any[]) {
    this.cartId = cartId;
    this.totalPrice = totalPrice;
    this.shipCost = shipCost;
    this.cartItemList = cartItemList;
  }
}
