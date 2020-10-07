import {Component, Input, OnInit} from '@angular/core';
import {AuctionService} from '../auction.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Bidder} from '../bidder';



@Component({
  selector: 'app-list-bidder',
  templateUrl: './list-bidder.component.html',
  styleUrls: ['./list-bidder.component.css']
})
export class ListBidderComponent implements OnInit {
  @Input() idProduct: number;

  bidderList: Bidder[];

  constructor(private auctionService: AuctionService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.auctionService.findBidderByAuctionId(this.idProduct).subscribe(
      next => {
        this.bidderList = next;
      }
    );
  }


}
