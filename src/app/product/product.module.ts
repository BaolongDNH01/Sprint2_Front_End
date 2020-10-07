import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {AuctionModule} from '../auction/auction.module';
import {ProductCreateComponent} from './product-create/product-create.component';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ProductCreateComponent,
    ProductDetailsComponent],
  exports: [
    ProductCreateComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    AuctionModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe]
})
export class ProductModule {
}
