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
    const content: Element = document.getElementById('dataConvertPdf');
    const options = {
      image: {type: 'jpeg', quality: 2},
      html2canvas: {xPosition: 0, yPosition: 0},
      jsPDF: {unit: 'mm', format: 'a4', orientation: 'p'},
    };

    html2pdf()
      .from(content)
      .set(options)
      .save();
  }

}
