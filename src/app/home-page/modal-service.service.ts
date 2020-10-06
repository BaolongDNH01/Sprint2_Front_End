import {Injectable} from '@angular/core';
import {ModalForm} from './modalForm';
import {AuthLoginComponent} from '../login/components/auth-login/auth-login.component';
import {RegisterComponent} from '../user/register/register.component';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {
  // tslint:disable-next-line:typedef
  getModal() {
    return [new ModalForm(AuthLoginComponent),
      new ModalForm(RegisterComponent)];
  }


  constructor() {
  }
}
