import {Component, OnInit} from '@angular/core';
import {Bidder} from '../../auction/bidder';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ProductService} from '../product.service';
import {Product} from '../product';
import {DatePipe} from '@angular/common';
import {UserService} from '../../user/user.service';
import {JwtService} from '../../login/services/jwt.service';
import {AuctionService} from '../../auction/auction.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Auction} from '../../auction/auction';
import {Image} from '../image';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  idAuction: number;
  product: Product;
  bidder: Bidder = new Bidder();
  myDate = new Date();
  interval;
  bidderForm: FormGroup;
  auction: Auction;
  idProduct: number;
  listImg: Image[];
  valueNextBidder: number;
  numbetTesst: number;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private datePipe: DatePipe,
              private userService: UserService,
              private jwt: JwtService,
              private auctionService: AuctionService,
              private fb: FormBuilder) {
    // this.bidderForm = this.fb.group({
    //   bidPrice: ['', [Validators.required]],
    // });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = Number(paramMap.get('id'));
      this.auctionService.findById(id).subscribe((next) => {
        this.auction = next;

      }, error => {
      }, () => {
        this.idAuction = this.auction.auctionId;
        this.idProduct = this.auction.productId;
        this.productService.getListImg(this.auction.productId).subscribe(next => {
          this.listImg = next;

        });
        this.productService.findById(this.auction.productId).subscribe(next => {
          this.product = next;
          this.product.displayTime = parseInt(localStorage.getItem('time' + this.auction.auctionId));
          console.log(this.product.displayTime + 'time hien tai');
        });
        this.auctionService.getBidderMax(this.auction.auctionId).subscribe(next => {
          if (this.auction.initialPrice > next) {
            this.valueNextBidder = this.auction.initialPrice + this.auction.eachIncrease;
          } else {
            this.valueNextBidder = next + this.auction.eachIncrease;
          }
        }, error => {
          this.valueNextBidder = this.auction.initialPrice + this.auction.eachIncrease;
        });
        // console.log(this.auction.auctionId + 'time hien tai');
        // this.product.displayTime = parseInt(localStorage.getItem('time' + this.auction.auctionId));
        // console.log(this.numbetTesst + 'time dang chay cua product');
        this.localStoreage();


      });
    });
  }

  localStoreage(): void {
    this.interval = setInterval(() => {
        if (this.product.displayTime === 0) {
          console.log('co bang ko hay ko bang ko');
          localStorage.removeItem('time' + this.auction.auctionId);

        } else {
          this.product.displayTime -= 1;
          console.log(this.product.displayTime);
          localStorage.setItem('time' + this.auction.auctionId, (this.product.displayTime).toString());
        }
        // console.log(this.product.displayTime);
        // @ts-ignore
        this.product.displayTimeDetail = this.transformTime(this.product.displayTime);
      }, 1000
    );
  }


  transformTime(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return minutes + ':' + (value - minutes * 60);
  }

  onSubmitBid(): void {
    this.bidder.bidPrice = this.valueNextBidder;
    this.bidder.bidDateTime = this.datePipe.transform(this.myDate, 'yyyy-MM-dd HH:mm:ss');
    this.bidder.auctionId = this.auction.auctionId;
    if (this.product.displayTime < 30) {
      this.product.displayTime = 30;
      localStorage.setItem('time' + this.auction.auctionId, (this.product.displayTime).toString());
    }
    this.bidder.userName = this.jwt.getUsername();


    // admin
    console.log(this.bidder);
    this.auctionService.saveBidderDto(this.bidder).subscribe(
      next => {

      }, error => {

      }, () => {
        window.location.reload();
      }
    );

  }
}


