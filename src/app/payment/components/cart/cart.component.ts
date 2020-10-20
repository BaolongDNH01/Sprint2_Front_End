import { Subscription } from 'rxjs';
import { CartItemResponse } from './../../models/cart-item-response';
import { ProductService } from './../../../product/product.service';
import { Cart } from './../../models/cart';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  subscription: Subscription;
  cartResponse: Cart;
  itemList: any[];
  cartItemResponse: CartItemResponse;
  infoProductWon: any[];
  isEmpty = false;
  shipCost = 49000.0;
  total = 0;
  arrId: number;
  winPrice = 0;

  product = new Product();


  // tslint:disable-next-line: radix
  userId = parseInt(window.sessionStorage.getItem('userId'));

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    // this.cartService.getCartByUserId(this.userId).subscribe({
    //   next: cartData => {
    //     this.cartResponse = cartData;
    //     if (this.cartResponse.cartItemList.length === 0) {
    //       this.isEmpty = true;
    //     } else {
    //       this.isEmpty = false;
    //       // this.total = this.shipCost + this.cartResponse.currentTotalPrice;
    //     }
    //     // console.clear();
    //     console.log(this.cartResponse);
    //   },
    //   error: err => {
    //     console.log(err),
    //       this.isEmpty = true;
    //   }
    // });

    this.cartService.getInfoProductWinByUserId(this.userId).subscribe({
      next: data => {
        this.infoProductWon = data;
        this.arrId = this.infoProductWon[0][2];
        this.winPrice = this.infoProductWon[0][1];
        this.total = this.shipCost + this.winPrice;
        console.log(this.total)
        console.log(this.arrId);
      }, complete: () => {
        this.productService.findById(this.arrId).subscribe({
          next: product => {
            this.product = product;
            console.log(this.product);
          }, complete: () => window.localStorage.setItem('imgUrl', this.product.imageURL.toString())
        });
      }
    });

  }



onSavedForLater(): void {
  alert('Chức năng này sắp ra mắt. Xin quay lại sau!');
}

redirect(): void {
  if(this.isEmpty || isNaN(this.userId)) {
  window.location.href = 'cart/error-page';
} else {
  window.localStorage.setItem('totalPrice', this.total.toString());
  window.localStorage.setItem('shipCost', this.shipCost.toString());
  window.location.href = 'cart/payment-address';
}
  }
}

// new CartItemResponse(
//   product.categoryName,
//   product.imageUrl,
//   product.productName,
//   this.winPrice,
//   1)

// console.log(this.infoProductWon);
// this.productService.findById(this.infoProductWon[0][2]).subscribe({
//   next: product => this.product = product,
// });