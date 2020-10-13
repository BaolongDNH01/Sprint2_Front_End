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
        console.log(this.product.displayTime );
        // localStorage.setItem('time' + (this.idProduct - 1) , (this.product.displayTime).toString());
      });
    });
  }

  onSubmitBid() {
    this.bidder.bidDateTime = this.datePipe.transform(this.myDate, 'yyyy-MM-dd HH:mm:ss');
    // this.bidder.bidPrice=
    this.bidder.userName = this.jwt.getUsername();
    this.auctionService.saveBidderDto(this.bidder);
  }
}
