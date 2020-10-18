import { OrderRes } from './../models/orderRes';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from './../models/order';

@Injectable({
  providedIn: 'root'
})
export class CartPaymentService {

  private CREATE_ORDER_API = 'http://localhost:8080/payment/create-order';

  constructor(private http: HttpClient) { }

  createOrder(order: Order): Observable<OrderRes> {
    return this.http.post<OrderRes>(`${this.CREATE_ORDER_API}`, order);
  }
}
