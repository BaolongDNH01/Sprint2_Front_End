import {Component, OnInit} from '@angular/core';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-payment-order',
  templateUrl: './payment-order.component.html',
  styleUrls: ['./payment-order.component.css']
})
export class PaymentOrderComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  convertPdf(): void {
    document.documentElement.scrollTop = 0;
    const content: Element = document.getElementById('data');
    const options = {
      image: {type: 'jpeg', quality: 3, imageTimeout: 0},
      html2canvas: {width: 810, height: 810},
      jsPDF: {unit: 'mm', format: 'a4', orientation: 'p'},
    };

    html2pdf()
      .from(content)
      .set(options)
      .save();
  }

}
