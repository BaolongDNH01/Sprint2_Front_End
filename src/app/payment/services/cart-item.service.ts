import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CartItem} from '../models/cart-item';
import {JwtService} from '../../login/services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {
  URL = 'http://localhost:8080';

  constructor(
    private httpClient: HttpClient,
    private jwt: JwtService
  ) {
  }

  getAllCartItem(): Observable<CartItem[]> {
    const headerAuth = new HttpHeaders();
    headerAuth.append('admin', 'Bearer' + this.jwt.getToken());
    return this.httpClient.get<CartItem[]>(this.URL + '/cart/getAllCartItem');
  }

  deleteCartItem(cartIds: number[]): Observable<any> {
    const headerAuth = new HttpHeaders();
    headerAuth.append('admin', 'Bearer' + this.jwt.getToken());
    return this.httpClient.post<any>(this.URL + '/cart/removeCartItem', cartIds);
  }
}
