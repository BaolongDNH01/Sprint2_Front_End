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

  // Châu =>  Hàm tính toán thời gian

  time(): void {
    for (let i = 0; i < this.auctionList1.length; i++) {
      if (this.auctionList1[i].auctionTime === 0) {
        this.auctionList1[i].auctionTime = null;
        // // console.log(this.productList1[i].productId);
        this.findProductTimeOutById(this.auctionList1[i].auctionId);
        // xu ly khi = 0
      } else {
        this.auctionList1[i].auctionTime -= 1;
        if (this.auctionList1[i].auctionTime < 0) {
          this.auctionList1[i].auctionTime = null;
        }
        // console.log(this.productList1[i].auctionTime);
      }
    }
    setTimeout(() => this.time(), 100);
  }


  onTimeOut(): void {
    this.auction = Object.assign({}, this.timeoutAuction.value);
    console.log(this.timeoutAuction.value);
    this.auction.auctionId = this.id;
    this.auctionService.editAuction(this.auction).subscribe();
    return;
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
          }
        }
      }, error1 => {

      }, () => {
        this.time();
      }
    );
  }
}
