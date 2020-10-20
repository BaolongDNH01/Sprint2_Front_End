export class Auction {
  no: number;
  auctionId: number;
  dayTimeStart: string;
  dayTimeEnd: string;
  productId: number;
  productName: string;
  imageURL: string;
  eachIncrease: number;
  bidderList: number[];
  auctionTime: number;
  statusId: number;
  statusName: string;
  initialPrice: number;

  // khánh thêm sáng 10/20/2020 xóa comment
  categoryName: string;

  constructor() {
  }
}
