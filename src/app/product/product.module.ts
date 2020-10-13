import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {AuctionModule} from '../auction/auction.module';
import {ProductCreateComponent} from './product-create/product-create.component';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ApprovalProductComponent} from './approval-product/approval-product.component';
import {ProductManageComponent} from './product-manage/product-manage.component';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [ProductCreateComponent,
    ProductDetailsComponent,
    ApprovalProductComponent,
    ProductManageComponent
  ],
  exports: [
    ProductCreateComponent,
    ProductDetailsComponent,
    ApprovalProductComponent,
    ProductManageComponent
  ],
  imports: [
    CommonModule,
    AuctionModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule
  ],
  providers: [DatePipe]
})
export class ProductModule {
}
