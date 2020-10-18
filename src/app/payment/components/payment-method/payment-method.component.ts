import { CartPaymentService } from './../../services/cart-payment.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Order } from '../../models/order';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {

  paymentMethodForm: FormGroup;

  cartId: number;
  shipCost: number;
  totalPrice: number;

  shipMethod: string;
  paymentMethod: string;

  isShipMethodEmpty = false;
  isPaymentMethodEmpty = false;

  constructor(private paymentSerivce: CartPaymentService) { }

  ngOnInit(): void {
    // Thien: This is bad way to get data -  Don't be like me ! ~
    if (window.localStorage.getItem('totalPrice')) {
      // tslint:disable-next-line: radix
      this.totalPrice = parseInt(window.localStorage.getItem('totalPrice'));
      // tslint:disable-next-line: radix
      this.shipCost = parseInt(window.localStorage.getItem('shipCost'));
    } else {
      alert('Có lỗi khi tạo hoá đơn, vui lòng quay lại trang Giỏ hàng !');
      window.location.href = 'cart/get';
    }
  }

  onSubmit(): void {
    if (!this.shipMethod) {
      this.isShipMethodEmpty = true;
    }
    if (!this.paymentMethod) {
      this.isPaymentMethodEmpty = true;
    }
    if (this.shipMethod && this.paymentMethod) {

      // User and Cart is 1-1 => userId = userCart
      // tslint:disable-next-line: radix
      this.cartId = parseInt(window.sessionStorage.getItem('userId'));
      // tslint:disable-next-line: radix
      this.shipCost = parseInt(window.localStorage.getItem('shipCost'));
      // tslint:disable-next-line: radix
      this.totalPrice = parseInt(window.localStorage.getItem('totalPrice'));
      const order = new Order(
        this.cartId,
        window.localStorage.getItem('shipMethod'),
        window.localStorage.getItem('paymentMethod'),
        window.localStorage.getItem('paymentAddress'),
        this.shipCost,
        this.totalPrice
      );
      // call service create order;
      this.paymentSerivce.createOrder(order).subscribe({
        next: data => {
          window.localStorage.setItem('deliveryDate', data.deliveryDate);
          window.localStorage.setItem('orderCode', data.orderCode);
          window.localStorage.setItem('orderStatus', data.orderStatus);
        },
        error: err => console.log(err),
        complete: () => window.location.href = 'cart/payment-order'
      });
    }
  }

  checkMethodShip(): void {
    window.localStorage.setItem('shipMethod', this.shipMethod);
  }

  checkMethodPayment(): void {
    window.localStorage.setItem('paymentMethod', this.paymentMethod);
  }

}
