import {Component, OnInit} from '@angular/core';
import {Product} from '../../product/product';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ProductService} from '../../product/product.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Status} from 'tslint/lib/runner';
import {Auction} from '../../auction/auction';
import {AuctionService} from '../../auction/auction.service';

@Component({
  selector: 'app-display-product-aution',
  templateUrl: './display-product-aution.component.html',
  styleUrls: ['../home/home.component.css']
})
export class DisplayProductAutionComponent implements OnInit {
  auctionList: Auction[];
  auctionList1 = [];
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

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private productService: ProductService,
    private auctionService: AuctionService
  ) {
  }

  ngOnInit(): void {
    this.chatbox();
    this.displayProductAuction();
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
    this.auction = Object.assign({}, this.timeoutAuction.value);
    console.log(this.timeoutAuction.value);
    this.auction.auctionId = this.id;
    this.auctionService.editAuction(this.auction).subscribe();
    location.reload();
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
            if (localStorage.getItem('time' + i) == 0) {
              // @ts-ignore
              localStorage.setItem('time' + i, this.auctionList[i].auctionTime);
            }
          }
        }
      }, error1 => {

      }, () => {
        // this.time();
        this.localStoreage();
      }
    );
  }

  // Châu =>  xử lý load trang giữ lại time now
  // localStoreage(): void {
  //   for (let i = 0; i < this.auctionList1.length; i++) {
  //     console.log('cheiu dai mang' + this.auctionList1.length);
  //     console.log('id' + this.auctionList1[i].auctionId);
  //     console.log(this.auctionList1[i].auctionTime + 'get time');
  //
  //     // @ts-ignore
  //     this.auctionList1[i].auctionTime = (localStorage.getItem('time' + (this.auctionList1[i].auctionId - 1)));
  //     // Châu  => Xử lý khi time auction product = 0
  //     if (this.auctionList1[i].auctionTime == 0) {
  //       // this.auctionList1[i].auctionTime = null;
  //       localStorage.setItem('time' + (this.auctionList1[i].auctionId - 1), '0');
  //       this.findProductTimeOutById(this.auctionList1[i].auctionId);
  //     } else {
  //       this.auctionList1[i].auctionTime -= 1;
  //       localStorage.setItem('time' + (this.auctionList1[i].auctionId - 1), this.auctionList1[i].auctionTime);
  //       if (this.auctionList1[i].auctionTime < 0) {
  //         localStorage.setItem('time' + (this.auctionList1[i].auctionId - 1), '0');
  //
  //       }
  //     }
  //   }
  //   setTimeout(() => this.localStoreage(), 1000);
  // }

  localStoreage(): void {
    for (let i = 0; i < this.auctionList1.length; i++) {
      // @ts-ignore
      this.auctionList1[i].auctionTime = (localStorage.getItem('time' + (this.auctionList1[i].auctionId - 1)));
      console.log(this.auctionList1[i].auctionTime);
      this.interval = setInterval(() => {
        if (this.auctionList1[i].auctionTime == 0) {
          this.auctionList1[i].auctionTime = null;
          localStorage.removeItem('time' + (this.auctionList1[i].auctionId - 1));
          this.findProductTimeOutById(this.auctionList1[i].auctionId);
        } else {
          this.auctionList1[i].auctionTime -= 1;
          localStorage.setItem('time' + (this.auctionList1[i].auctionId - 1), this.auctionList1[i].auctionTime);
          if (this.auctionList1[i].auctionTime < 0) {
            localStorage.setItem('time' + (this.auctionList1[i].auctionId - 1), '0');
          }
        }
        this.auctionList1[i].displayTime = this.transformTime(this.auctionList1[i].auctionTime);
      }, 1000);
    }
  }

  transformTime(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return minutes + ':' + (value - minutes * 60);
  }

}
