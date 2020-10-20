import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private CART_API = 'http://localhost:8080/cart';
  constructor(private http: HttpClient) { }

  getCartByUserId(userId: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.CART_API}/get/${userId}`);
  }

  getInfoProductWinByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.CART_API}/get-product-win/${userId}`);
  }
}
