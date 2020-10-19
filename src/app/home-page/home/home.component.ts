import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ProductService} from '../../product/product.service';
import {Auction} from '../../auction/auction';
import {FormControl, FormGroup} from '@angular/forms';
import {Product} from '../../product/product';
import {AuctionService} from '../../auction/auction.service';
import {DatePipe} from '@angular/common';
import {Category} from '../../product/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  auctionList: Auction[];
  auctionList1 = [];
  auctionList1API = [];
  error: boolean;
  timeoutAuction: FormGroup;
  product: Product;
  auction: Auction;
  id: number;
  timeSet = 5 * 60;
  time = this.timeSet;
  display;
  interval;
  curpage = 1;
  myDate = new Date();
  keyWordProductAuction: string;

  listCategory: Category[];

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private productService: ProductService,
    private auctionService: AuctionService,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    this.chatbox();
    this.displayProductAuction();
    this.getAllCategory();
  }

  getAllCategory(): void {
    this.productService.findAllCategory().subscribe(
      list => this.listCategory = list
    );
  }

  findProductTimeOutById(id: number): void {
    this.auctionService.findById(id).subscribe(
      next => {
        console.log(next);
        this.auction = next;
        this.id = this.auction.auctionId;
        this.timeoutAuction = new FormGroup({
          auctionId: new FormControl(this.auction.auctionId),
          dayTimeStart: new FormControl(this.auction.dayTimeStart),
          dayTimeEnd: new FormControl(this.auction.dayTimeEnd),
          // dayTimeEnd: new FormControl(this.datePipe.transform(this.myDate, 'yyyy-MM-dd HH:mm:ss').toString().split(' ')),
          productId: new FormControl(this.auction.productId),
          statusId: new FormControl(3),
        });

      }, error => {
      }, () => {
        this.onTimeOut();
      });
  }

  // Châu => Nơi nhúng chat box
  chatbox(): void {
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function() {
      var s1 = document.createElement('script'), s0 = document.getElementsByTagName('script')[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/5f6964cef0e7167d001284f1/default';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();
  }

  // Châu => Khi time out thì set lại status
  onTimeOut(): void {
    console.log('toi day chua');
    this.auction = Object.assign({}, this.timeoutAuction.value);
    console.log(this.timeoutAuction.value);
    this.auction.auctionId = this.id;
    this.auctionService.editAuction(this.auction).subscribe();
    // location.reload();
  }

  // Châu => Hiển thị tất cả sản phẩm có status là đang trong phiên đấu giá lên homepage
  displayProductAuction(): void {
    this.auctionService.findAllProductAuction().subscribe(
      list => {
        this.auctionList = list;
        for (let i = 0; i < this.auctionList.length; i++) {
          if (this.auctionList[i].statusId === 2) {
            this.auctionList1.push(this.auctionList[i]);
            this.auctionList[i].auctionTime *= 60;
            // console.log(parseInt(localStorage.getItem('time' + i)));
            // console.log(parseInt(localStorage.getItem('time' + 2)));
            // @ts-ignore
            // localStorage.setItem('time' + i, this.auctionList[i].auctionTime);
            if (localStorage.getItem('time' + this.auctionList[i].auctionId) === undefined || localStorage.getItem('time' + this.auctionList[i].auctionId) === 0) {
              // @ts-ignore
              localStorage.setItem('time' + this.auctionList[i].auctionId, this.auctionList[i].auctionTime);
            }
          }
        }
      }, error1 => {

      }, () => {
        // this.auctionList1API = this.auctionList1;
        this.localStoreage();
      }
    );
  }

  localStoreage(): void {
    for (let i = 0; i < this.auctionList1.length; i++) {
      // @ts-ignore
      this.auctionList1[i].auctionTime = (localStorage.getItem('time' + (this.auctionList1[i].auctionId)));
      console.log(this.auctionList1[i].auctionTime);
      this.interval = setInterval(() => {
        if (this.auctionList1[i].auctionTime == 0) {
          this.auctionList1[i].auctionTime = null;
          console.log('co qua day ko');
          localStorage.removeItem('time' + (this.auctionList1[i].auctionId));
          this.findProductTimeOutById(this.auctionList1[i].auctionId);
        } else {
          this.auctionList1[i].auctionTime -= 1;
          localStorage.setItem('time' + (this.auctionList1[i].auctionId), this.auctionList1[i].auctionTime);
          if (this.auctionList1[i].auctionTime < 0) {
            localStorage.setItem('time' + (this.auctionList1[i].auctionId), '0');
          } else if (this.auctionList1[i].auctionTime < 30) {
            localStorage.getItem('time' + (this.auctionList1[i].auctionId));
          }
        }
        this.auctionList1[i].displayTime = this.transformTime(this.auctionList1[i].auctionTime);
      }, 100);
    }
  }

  transformTime(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return minutes + ':' + (value - minutes * 60);
  }

  search(): void {
    this.auctionList1 = this.auctionList1API.filter(res => {
      return res.productName.match(this.keyWordProductAuction);
      // res.productName.match(this.keyWordProductAuction)
    });
  }
}
