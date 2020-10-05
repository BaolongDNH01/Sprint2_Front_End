export interface Product {
  productId: number;
  productName: string;
  initialPrice: number;
  eachIncrease: number;
  image: string;
  productDetail: string;
  category_id: number;
  categoryName: string;
  status_id: number;
  statusName: string;
  time_id: number;
  user_id: number;
  poster: string;
  auctionList_id: number[];
}
