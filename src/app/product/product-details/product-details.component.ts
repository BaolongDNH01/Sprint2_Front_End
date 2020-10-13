import {Component, OnInit} from '@angular/core';
import {Bidder} from '../../auction/bidder';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ProductService} from '../product.service';
import {Product} from '../product';
import {DatePipe} from '@angular/common';
import {UserService} from '../../user/user.service';
import {JwtService} from '../../login/services/jwt.service';
import {AuctionService} from '../../auction/auction.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  idProduct: number;
  product: Product;
  bidder: Bidder = new Bidder();
  myDate = new Date();
  interval;


  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private datePipe: DatePipe,
              private userService: UserService,
              private jwt: JwtService,
              private auctionService: AuctionService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = Number(paramMap.get('id'));
      this.productService.findById(id).subscribe((next) => {
        this.product = next;
        this.idProduct = this.product.productId;
        this.product.displayTime = parseInt(localStorage.getItem('time' + (this.idProduct - 1)));
        this.localStoreage();
      });
    });
  }

  localStoreage(): void {
    this.interval = setInterval(() => {
        if (this.product.displayTime === 0) {
          console.log('co bang ko hay ko bang ko');
          this.product.displayTime = 0;
        } else {
          this.product.displayTime -= 1;
        }
        console.log(this.product.displayTime);
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
    this.bidder.bidDateTime = this.datePipe.transform(this.myDate, 'yyyy-MM-dd HH:mm:ss');
    // this.bidder.bidPrice=
    this.bidder.userName = this.jwt.getUsername();
    this.auctionService.saveBidderDto(this.bidder);
  }
}
