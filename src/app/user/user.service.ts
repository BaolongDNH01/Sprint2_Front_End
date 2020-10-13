import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './User';
import {RecoverPassword} from './recover-password/RecoverPassword';

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
    return this.httpClient.post<any>(this.API_URL + '/register?g-recaptcha-response=' + response, user );
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
  checkCode(confirmCode: string, username: string): Observable<string>{
    return this.httpClient.post<string>(this.API_URL + '/check-code/' + confirmCode, {username});
  }
  increasePoint(user: User, point: number): Observable<any>{
    user.point = user.point + point;
    if (user.point > 2000){
      user.rank = 'Kim cương';
    }else if (1000 <= user.point && user.point < 2000){
      user.rank = 'Bạch kim';
    }else if (500 <= user.point && user.point < 1000){
      user.rank = 'Vàng';
    }else if (200 <= user.point && user.point < 500){
      user.rank = 'Bạc';
    }else if (0 <= user.point && user.point < 200){
      user.rank = 'Đồng';
    }
    if (user.point > 0) {
      return this.httpClient.post<any>(this.API_URL + '/add-user', user);
    }else if (-30 <= user.point && user.point < 0){
      user.timeLock = 7 * 24 * 60 * 60 * 1000;
      this.httpClient.post<any>(this.API_URL + '/add-user', user);
      return this.httpClient.post<any>(this.API_URL + '/lock-user', user);
    }else if (-50 <= user.point && -30 < user.point){
      user.timeLock = 30 * 24 * 60 * 60 * 1000;
      this.httpClient.post<any>(this.API_URL + '/add-user', user);
      return this.httpClient.post<any>(this.API_URL + '/lock-user', user);
    }else {
      return this.httpClient.delete<User>(this.API_URL + '/delete-user/' + user.userId);
    }
  }
}
