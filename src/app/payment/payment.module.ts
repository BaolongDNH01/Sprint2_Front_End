import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { PaymentAddressComponent } from './components/payment-address/payment-address.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { PaymentOrderComponent } from './components/payment-order/payment-order.component';



@NgModule({
  declarations: [CartComponent, PaymentAddressComponent, PaymentMethodComponent, PaymentOrderComponent],
  imports: [
    CommonModule
  ],
  providers: [
  ]
})
export class PaymentModule { }
