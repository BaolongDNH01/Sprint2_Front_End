import { Injectable } from '@angular/core';
import {CrudService} from './CrudService';
import {UserModel} from '../model/user.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<UserModel,number>{

  constructor(protected http: HttpClient) {
    super(http,'http://localhost:8080/user')
  }
}
