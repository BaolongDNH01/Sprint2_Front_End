import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManageComponent } from './product-manage/product-manage.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [ProductManageComponent],
  exports: [
    ProductManageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ProductListModule { }
