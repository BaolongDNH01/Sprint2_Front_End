import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user';
import {Product} from './product';
import {Bidder} from './bidder';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private getUserByUserNameApi = 'http://localhost:8080/getUserByUserName';
  private editUserApi = 'http://localhost:8080/editUserInfo';
  private getAllProductByUNameApi = 'http://localhost:8080/getAllProductByUserName';
  private getAllBidderByUNameApi = 'http://localhost:8080/getAllBidderByUserName';
  private changStatusProductToPostApi = 'http://localhost:8080/changStatusProductToPost';
  private checkPasswordApi = 'http://localhost:8080/checkPassword';

  constructor(private httpClient: HttpClient) {
  }

  getUserByUName(userName: string): Observable<User> {
    return this.httpClient.get<User>(this.getUserByUserNameApi + '/' + userName);
  }

  editUserInfo(user: User, userNAme: string): Observable<void> {
    return this.httpClient.post<void>(`${this.editUserApi}/${userNAme}`, user);
  }

  getAllProductByUName(userName: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.getAllProductByUNameApi + '/' + userName);
  }

  getAllBidderByUName(userName: string): Observable<Bidder[]> {
    return this.httpClient.get<Bidder[]>(this.getAllBidderByUNameApi + '/' + userName);
  }

  postProduct(productId: number): Observable<void> {
    return this.httpClient.get<void>(this.changStatusProductToPostApi + '/' + productId);
  }

  checkPassword(userName: string, password: string): Observable<boolean> {
    return this.httpClient.post<boolean>(this.checkPasswordApi + '/' + password, userName);
  }
}
