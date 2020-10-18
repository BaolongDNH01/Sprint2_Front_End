import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-address',
  templateUrl: './payment-address.component.html',
  styleUrls: ['./payment-address.component.css']
})
export class PaymentAddressComponent implements OnInit {

  paymentAddressForm: FormGroup;

  totalPrice: number;
  shipCost: number;

  constructor(private fb: FormBuilder) { }

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

    this.paymentAddressForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      city: ['', [Validators.required]],
      district: ['', [Validators.required]],
      ward: ['', [Validators.required]],
      way: ['', [Validators.required]],
      country: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      hintNote: ['', [Validators.required]]
    });
  }

  valid(field: string, errorCode: string): boolean {
    return this.paymentAddressForm.get(field).hasError(errorCode)
      && this.paymentAddressForm.get(field).touched;
  }

  onContinue(): void {
    console.log(this.paymentAddressForm);
    window.localStorage.setItem('paymentAddress', JSON.stringify(this.paymentAddressForm.value));
    window.location.href = 'cart/payment-method';
  }
}
