import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private CART_API = 'http://localhost:8080/cart/get';

  constructor(private http: HttpClient) { }

  getCartByUserId(userId: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.CART_API}/${userId}`);
  }
}
