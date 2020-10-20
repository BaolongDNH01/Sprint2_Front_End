export class CartItemResponse {
  categoryName: string;
  imageUrl: string;
  productName: string;
  winPrice: number;
  quantity: number;

  constructor(categoryName: string, imageUrl: string, productName: string, winPrice: number, quantity: number) {
    this.categoryName = categoryName;
    this.imageUrl = imageUrl;
    this.productName = productName;
    this.winPrice = winPrice;
    this.quantity = quantity;
  }
}
