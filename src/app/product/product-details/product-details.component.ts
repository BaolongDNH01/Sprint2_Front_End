import {Component, OnInit} from '@angular/core';
import {Bidder} from '../../auction/bidder';
import {AuctionService} from '../../auction/auction.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ProductService} from '../product.service';
import {Product} from '../product';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  idProduct: number;
  product: Product;
  bidder: Bidder;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = Number(paramMap.get('id'));
      this.productService.findById(id).subscribe((next) => {
        this.product = next;
        this.idProduct = this.product.productId;
      });
    });
  }

  onSubmitBid(){

  }
}
