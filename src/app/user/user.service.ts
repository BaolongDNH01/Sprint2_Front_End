import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './User';
import {RecoverPassword} from "./recover-password/RecoverPassword";

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
  lockUser(user: User[]): Observable<any>{
    return this.httpClient.post<any>(this.API_URL + '/lock-user', user);
  }
  sendEmail(user: User, response?: any): Observable<any>{
    return this.httpClient.post<any>(this.API_URL + '/register', user );
  }
  getUserByUserName(userName: string): Observable<User>{
    return this.httpClient.get<User>(this.API_URL + '/getUserByUserName/' + userName);
  }
  findAllUserActivated(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.API_URL + '/user-activated');
  }
  unlockUser(userList: User[]): Observable<any>{
    return this.httpClient.post(this.API_URL + '/unlock-user', userList);
  }
  deleteUsers(ids: string[]): Observable<any>{
    return this.httpClient.delete<any>(this.API_URL + '/delete-users/' + ids);
  }
  recoverRequest(recoverPassword: RecoverPassword): Observable<any>{
    return this.httpClient.post<any>(this.API_URL + '/recover-password', recoverPassword);
  }
}
