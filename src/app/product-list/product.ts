export interface Product {
  productId: number;
  productName: string;
  initialPrice: number;
  eachIncrease: number;
  image: string;
  productDetail: string;
  category_id: number;
  status_id: number;
  time_id: number;
  user_id: number;
  auctionList_id: number[];
}
