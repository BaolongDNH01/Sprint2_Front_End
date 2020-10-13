import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListBidderComponent} from './list-bidder/list-bidder.component';
import {FormsModule} from '@angular/forms';
import {AuctionService} from './auction.service';
import {ListAuctionComponent} from './list-auction/list-auction.component';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [ListBidderComponent, ListAuctionComponent],
  exports: [
    ListBidderComponent,
    ListAuctionComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        NgxPaginationModule,
    ],
  providers: [AuctionService]
})
export class AuctionModule {
}
