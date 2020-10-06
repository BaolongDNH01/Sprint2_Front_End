import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAuctionComponent } from './add-auction/add-auction.component';
import { ListBidderComponent } from './list-bidder/list-bidder.component';
import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';



@NgModule({
  declarations: [AddAuctionComponent, ListBidderComponent],
  exports: [
    AddAuctionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class AuctionModule { }
