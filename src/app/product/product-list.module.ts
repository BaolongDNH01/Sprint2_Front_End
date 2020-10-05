import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManageComponent } from './product-manage/product-manage.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { ApprovalProductComponent } from './approval-product/approval-product.component';



@NgModule({
  declarations: [ProductManageComponent, ApprovalProductComponent],
  exports: [
    ProductManageComponent,
    ApprovalProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class ProductListModule { }
