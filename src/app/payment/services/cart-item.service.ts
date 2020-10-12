import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CartItem} from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {
  URL = 'http://localhost:8080';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getAllCartItem(): Observable<CartItem[]> {
    return this.httpClient.get<CartItem[]>(this.URL + '/getAllCartItem');
  }
}
