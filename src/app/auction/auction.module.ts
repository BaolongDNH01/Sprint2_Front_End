import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBidderComponent } from './list-bidder/list-bidder.component';
import {FormsModule} from '@angular/forms';
import {AuctionService} from './auction.service';



@NgModule({
  declarations: [ ListBidderComponent],
  exports: [
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers:[AuctionService]
})
export class AuctionModule { }
