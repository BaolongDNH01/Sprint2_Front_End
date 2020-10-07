import { Cart } from './../../models/cart';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartResponse: Cart;
  itemList: any[];
  itemAmount = 0;

  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.cartService.getCartByUserId(1).subscribe({
      next: cartData => {
        this.cartResponse = cartData;
        console.log(this.cartResponse);
      },
      error: err => console.log(err),
    });
  }
}
