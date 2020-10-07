import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { ProductDetailsComponent } from './product-details/product-details.component';
import {AuctionModule} from '../auction/auction.module';



@NgModule({
    declarations: [ProductDetailsComponent],
    exports: [
        ProductDetailsComponent
    ],
  imports: [
    CommonModule,
    AuctionModule
  ],
  providers:[DatePipe]
})
export class ProductModule { }
