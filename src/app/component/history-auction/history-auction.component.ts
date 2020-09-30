import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {HistoryAuctionService} from '../../service/history-auction.service';
import {HistoryAuctionModel} from '../../model/historyAuction.model';


@Component({
  selector: 'app-history-auction',
  templateUrl: './history-auction.component.html',
  styleUrls: ['./history-auction.component.css']
})
export class HistoryAuctionComponent implements OnInit,OnDestroy {
  public subscription: Subscription;
  public historyAuction: HistoryAuctionModel[] = [];

  constructor(
    public historyAuctionService: HistoryAuctionService
  ) { }

  ngOnInit(): void {
    this.subscription = this.historyAuctionService.findAll().subscribe((data:HistoryAuctionModel[])=>{
      this.historyAuction = data;
    });
  }

  ngOnDestroy(): void {
  }

}
