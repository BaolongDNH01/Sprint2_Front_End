import {Component, OnInit} from '@angular/core';
import {Auction} from '../auction';
import {AuctionService} from '../auction.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Product} from '../../product/product';

@Component({
  selector: 'app-list-auction',
  templateUrl: './list-auction.component.html',
  styleUrls: ['./list-auction.component.css']
})
export class ListAuctionComponent implements OnInit {
  auctionList: Auction[];
  timeoutAuction: FormGroup;
  product: Product;
  auction: Auction;
  id: number;

  public now: Date = new Date();

  constructor(
    private auctionService: AuctionService,
  ) {
  }

  getTimeNow(): void {
    setInterval(() => {
      this.now = new Date();
    }, 1);
  }

  ngOnInit(): void {
    this.listProductAuction();
  }

  listProductAuction(): void {
    this.auctionService.findAllProductAuction().subscribe(
      list => {
        this.auctionList = list;
      }
    );
  }

  findProductByAuction(id: number): void {
    console.log('toi chua');
    this.auctionService.findById(id).subscribe(
      next => {
        this.auction = next;
        console.log(next);
        this.id = this.auction.auctionId;
        this.timeoutAuction = new FormGroup({
          auctionId: new FormControl(this.auction.auctionId),
          dayTimeStart: new FormControl(this.now),
          dayTimeEnd: new FormControl(this.auction.dayTimeEnd),
          productId: new FormControl(this.auction.productId),
          statusId: new FormControl(2),
        });

      }, error => {
      }, () => {
        this.onEditStatusAuction();
      });
  }

  onStatusAuction(auctionId: number): void {
    this.findProductByAuction(auctionId);
  }

  onEditStatusAuction(): void {
    this.getTimeNow();
    this.auction = Object.assign({}, this.timeoutAuction.value);
    console.log(this.timeoutAuction.value);
    this.auction.auctionId = this.id;
    this.auctionService.editAuction(this.auction).subscribe();
    location.reload();
  }
}
