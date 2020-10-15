import { Cart } from './../../models/cart';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartResponse: Cart;
  itemList: any[];
  isEmpty = false;
  shipCost =  49000.0;
  total = 0.0;

  // tslint:disable-next-line: radix
  userId = parseInt(window.sessionStorage.getItem('userId'));

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    console.log(this.userId + ' - ' + typeof this.userId);
    this.cartService.getCartByUserId(this.userId).subscribe({
      next: cartData => {
        this.cartResponse = cartData;
        if (this.cartResponse.cartItemList.length === 0) {
          this.isEmpty = true;
        } else {
          this.isEmpty = false;
          this.total = this.shipCost + this.cartResponse.currentTotalPrice;
        }
        console.clear();
        console.log(this.cartResponse);
      },
      error: err => {
        console.log(err),
          this.isEmpty = true;
      }
    });
  }

  onSavedForLater(): void {
    alert('Chức năng này sắp ra mắt. Xin quay lại sau!');
  }

  redirect(): void {
    window.location.href = 'cart/error-page';
  }
}
