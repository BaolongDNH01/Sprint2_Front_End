import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Token} from './token';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  API_URL = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) {}
  findByAll(): Observable<Token[]>{
    return this.httpClient.get<Token[]>(this.API_URL + '/all-token');
  }
  delete(id: number): Observable<Token>{
    return this.httpClient.delete<Token>(this.API_URL + '/delete-token/' + id);
  }
}
