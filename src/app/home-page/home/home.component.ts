import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {timeout} from 'rxjs/operators';
import {Product} from '../../product/product';
import {ProductService} from '../../product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productList: Product[];
  productList1: number;
  a = [];
  m = 0; // Phút
  h = 0; // Giờ
  s = 0; // Giây
  timeout = null;


  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    // this.chatbox();
    this.getAllProduct();
    this.time();

  }

  getAllProduct(): void {
    this.productService.getAllProduct().subscribe(
      next => {
        this.productList = next;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.productList.length; i++) {
          this.productService.findById(this.productList[i].auctionTime).subscribe();
          this.m = this.productList[i].auctionTime;
          this.a.push(this.m);

          console.log(this.a);

        }
      }
    );

  }


  // chatbox(): void {
  //   // tslint:disable-next-line:variable-name prefer-const
  //   let Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
  //   (function() {
  //     let s1 = document.createElement('script'), s0 = document.getElementsByTagName('script')[0];
  //     s1.async = true;
  //     s1.src = 'https://embed.tawk.to/5f6964cef0e7167d001284f1/default';
  //     s1.charset = 'UTF-8';
  //     s1.setAttribute('crossorigin', '*');
  //     s0.parentNode.insertBefore(s1, s0);
  //   })();
  // }

  auctionGuide(): void {
    this.router.navigateByUrl('/auction-guide');
  }

  time(): void {
    let h = this.h; // Giờ
    let m = this.m; // Phút
    let s = this.s; // Giây

    let timeout = null; // Timeout
    start();

    function start(): void {
      console.log('jii');
      if (s === -1) {
        m -= 1;
        s = 59;
      }

      if (m === -1) {
        h -= 1;
        m = 59;
      }

      if (h === -1) {
        clearTimeout(timeout);
        document.getElementById('show').innerText = 'ending....';
      }

      document.getElementById('h').innerText = h.toString();
      document.getElementById('m').innerText = m.toString();
      document.getElementById('s').innerText = s.toString();
      /*BƯỚC 1: GIẢM PHÚT XUỐNG 1 GIÂY VÀ GỌI LẠI SAU 1 GIÂY */
      timeout = setTimeout(function() {
        s--;
        start();
      }, 1000);
    }

    function stop(): void {
      clearTimeout(timeout);
    }

  }


}
