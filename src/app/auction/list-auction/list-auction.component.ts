import {Component, OnInit} from '@angular/core';
import {Auction} from '../auction';
import {AuctionService} from '../auction.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Product} from '../../product/product';
import {Router} from '@angular/router';
import {StatusProduct} from '../../product/statusProduct';

@Component({
  selector: 'app-list-auction',
  templateUrl: './list-auction.component.html',
  styleUrls: ['./list-auction.component.css']
})
export class ListAuctionComponent implements OnInit {
  auctionList: Auction[];
  auctionList1: Auction[] = [];
  auctionListShow: Auction[] = [];
  status = new StatusProduct();
  timeoutAuction: FormGroup;
  product: Product;
  auction: Auction;
  id: number;
  statusList: StatusProduct[];
  statusNameDr = 'Tất cả các phiên';
  numberCount = 1;
  curpage = 1;
  public now: Date = new Date();

  constructor(
    private auctionService: AuctionService,
    private router: Router
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
        console.log(this.auctionList);
        this.auctionListShow = this.auctionList;
      }, error => {
      },
      () => {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.auctionList.length; i++) {
          this.auctionList[i].no = this.numberCount++;
        }
        this.auctionService.getAllStatusAuction().subscribe(
          list => {
            this.statusList = list;
          }
        );
      }
    );
  }

  findProductByAuction(id: number): void {
    this.auctionService.findById(id).subscribe(
      next => {
        this.auction = next;
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
    this.auction.auctionId = this.id;
    this.auctionService.editAuction(this.auction).subscribe(
      next => {
      }, error => {

      }, () => {

      }
    );
    // location.reload();
    this.router.navigateByUrl('');
  }

  find(statusName: string): void {
    this.auctionListShow = [];
    this.statusNameDr = statusName;
    console.log(this.auctionList);
    this.auctionList.forEach(q => {
      if (q.statusName === statusName) {
        this.auctionListShow.push(q);
      }
    });
  }
}
