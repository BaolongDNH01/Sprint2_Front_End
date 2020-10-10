import {Component, OnInit} from '@angular/core';
import {Product} from '../../product/product';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ProductService} from '../../product/product.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Status} from 'tslint/lib/runner';

@Component({
  selector: 'app-display-product-aution',
  templateUrl: './display-product-aution.component.html',
  styleUrls: ['../home/home.component.css']
})
export class DisplayProductAutionComponent implements OnInit {
  productList: Product[];
  productList1 = [];
  error: boolean;
  timeoutAuction: FormGroup;
  product: Product;
  statusList: Status[];
  id: number;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.chatbox();
    this.getAllProduct();
    this.findAllStatus();
  }

  findProductTimeOutById(id: number): void {
    console.log('ok');
    this.productService.findById(id).subscribe(
      next => {
        this.product = next;
        this.id = this.product.productId;
        console.log(this.product.productId);
        console.log(this.product.productName);
        this.timeoutAuction = new FormGroup({
          productId: new FormControl(this.product.productId),
          productName: new FormControl(this.product.productName),
          initialPrice: new FormControl(this.product.initialPrice),
          eachIncrease: new FormControl(this.product.eachIncrease),
          productDetail: new FormControl(this.product.productDetail),
          categoryId: new FormControl(this.product.categoryId),
          statusId: new FormControl(3),
          timeId: new FormControl(this.product.timeId),
          userId: new FormControl(this.product.userId),
        });

      }, error => {
      }, () => {
        this.onTimeOut();
      });
  }

  getAllProduct(): void {
    this.productService.getAllProduct().subscribe(
      next => {
        this.productList = next;
        for (let j = 0; j < this.productList.length; j++) {
          if (this.productList[j].statusId === 2) {
            console.log(this.productList[j]);
            this.productList1.push(this.productList[j]);
          }
        }
        for (let i = 0; i < this.productList.length; i++) {
          this.productList[i].auctionTime *= 60;
        }
      }, e => console.log(e),
      () => this.time()
    );

  }


  chatbox(): void {
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function() {
      var s1 = document.createElement('script'), s0 = document.getElementsByTagName('script')[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/5f6964cef0e7167d001284f1/default';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();
  }

  time(): void {
    for (let i = 0; i < this.productList1.length; i++) {
      if (this.productList1[i].auctionTime === 0) {
        console.log(this.productList1[i].productId);
        this.findProductTimeOutById(this.productList1[i].productId);
      } else {
        this.productList1[i].auctionTime -= 1;
        console.log(this.productList1[i].auctionTime);
      }
    }
    setTimeout(() => this.time(), 1000);
  }


  onTimeOut(): void {
    this.product = Object.assign({}, this.timeoutAuction.value);
    this.product.productId = this.id;
    this.productService.editProduct(this.product).subscribe();
    return;
  }


  findAllStatus(): void {
    this.productService.findAllStatusProduct().subscribe(
      next => {
        this.statusList = next;
        console.log(this.statusList);
      }, error => {
        this.statusList = new Array();
      }
    );
  }
}
