import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../product-list/product';
import {ProductService} from '../../product-list/product.service';
import {timeout} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productList: Product[];
  productList1 = [];

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.chatbox();
    this.getAllProduct();
    this.time();

  }

  getAllProduct(): void {
    this.productService.getAllProduct().subscribe(
      next => {
        this.productList = next;
        for (let j = 0; j < this.productList.length; j++) {
          console.log('ok chua');
          console.log(this.productList[j].statusId);
          if (this.productList[j].statusId === 2) {
            console.log('hihhhi');
            console.log(this.productList[j]);
            this.productList1.push(this.productList[j]);
            console.log(this.productList1 + 'sss');
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

  auctionGuide(): void {
    console.log('ok');
    this.router.navigateByUrl('auction-guide');
  }

  time(): void {
    for (let i = 0; i < this.productList.length; i++) {
      if (this.productList[i].auctionTime === 0) {
        this.productList[i].auctionTime += 30;
      } else {
        this.productList[i].auctionTime -= 1;
        console.log(this.productList[i].auctionTime);
      }
    }
    setTimeout(() => this.time(), 1000);
  }


}
