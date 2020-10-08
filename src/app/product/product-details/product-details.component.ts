import {Component, OnInit} from '@angular/core';
import {Bidder} from '../../auction/bidder';
import {AuctionService} from '../../auction/auction.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  bidder: Bidder;

  constructor(private auctionService: AuctionService) {
  }

  ngOnInit(): void {
  }

}
