import { Component, OnInit } from '@angular/core';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-payment-order',
  templateUrl: './payment-order.component.html',
  styleUrls: ['./payment-order.component.css']
})
export class PaymentOrderComponent implements OnInit {

  orderCode: string;
  deliveryDate: string;
  orderStatus: string;
  fullName: string;
  userInfo: any;
  address: string;
  totalPrice: string;
  shipCost: string;
  paymentMethod: string;
  shipMethod: string;
  imgUrl: string;

  constructor() {
  }

  ngOnInit(): void {
    this.imgUrl = window.localStorage.getItem('imgUrl');
    this.orderCode = window.localStorage.getItem('orderCode');
    this.deliveryDate = window.localStorage.getItem('deliveryDate');
    this.orderStatus = window.localStorage.getItem('orderStatus');
    this.totalPrice = window.localStorage.getItem('totalPrice');
    this.shipCost = window.localStorage.getItem('shipCost');
    this.paymentMethod = window.localStorage.getItem('paymentMethod');
    this.shipMethod = window.localStorage.getItem('shipMethod');

    this.userInfo = JSON.parse(window.localStorage.getItem('paymentAddress'));
    this.address = window.localStorage.getItem('address');
    console.log(this.userInfo);
  }

  onBackToHomePage(): void {
    window.location.href = 'home';
  }

  convertPdf(): void {
    document.documentElement.scrollTop = 0;
    const content: Element = document.getElementById('data');
    const options = {
      image: { type: 'jpeg', quality: 3, imageTimeout: 0 },
      html2canvas: { width: 810, height: 810 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'p' },
    };

    html2pdf()
      .from(content)
      .set(options)
      .save();
  }

}
