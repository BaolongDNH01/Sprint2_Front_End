import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) { }
  findAllUser(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.API_URL + '/user');
  }
  findUserById(userId: number): Observable<User>{
    return this.httpClient.get<User>(this.API_URL + '/user/' + userId);
  }
  deleteUser(userId: number): Observable<User>{
    return this.httpClient.delete<User>(this.API_URL + '/delete-user/' + userId);
  }
  saveUser(user: User): Observable<any>{
    return this.httpClient.post<any>(this.API_URL + '/add-user', user);
  }
  lockUser(user: User): Observable<any>{
    return this.httpClient.post<any>(this.API_URL + '/lock-user', user);
  }
}
