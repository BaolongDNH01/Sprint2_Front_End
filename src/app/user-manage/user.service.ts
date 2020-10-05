import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private getUserByUserNameApi = 'http://localhost:8080/getUserByUserName';
  private editUserApi = 'http://localhost:8080/editUserInfo';

  constructor(private httpClient: HttpClient) {
  }

  getUserByUName(userName: string): Observable<User> {
    return this.httpClient.get<User>(this.getUserByUserNameApi + '/' + userName);
  }

  editUserInfo(user: User, userNAme: string): Observable<void>{
    return this.httpClient.post<void>(`${this.editUserApi}/${userNAme}`, user);
  }
}
