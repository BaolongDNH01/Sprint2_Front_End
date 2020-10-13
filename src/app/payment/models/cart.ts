export class Cart {
  cartId: number;
  currentTotalPrice: number;
  cartStatus: string;
  cartItemList: any[];

  constructor(cartId: number, currentTotalPrice: number,  cartStatus: string, cartItemList: any[]) {
    this.cartId = cartId;
    this.currentTotalPrice = currentTotalPrice;
    this.cartStatus = cartStatus;
    this.cartItemList = cartItemList;
  }
}
