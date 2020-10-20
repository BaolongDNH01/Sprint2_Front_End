import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CartComponent } from './components/cart/cart.component';
import { PaymentAddressComponent } from './components/payment-address/payment-address.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { PaymentOrderComponent } from './components/payment-order/payment-order.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import {NgxPayPalModule} from 'ngx-paypal';



@NgModule({
  declarations: [CartComponent, PaymentAddressComponent, PaymentMethodComponent, PaymentOrderComponent, ErrorPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPayPalModule
  ],
  providers: [
  ]
})
export class PaymentModule { }
