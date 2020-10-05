import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details/product-details.component';



@NgModule({
    declarations: [ProductDetailsComponent],
    exports: [
        ProductDetailsComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ProductModule { }
