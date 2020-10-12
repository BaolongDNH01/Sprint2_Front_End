import {ComponentFactoryResolver, Injectable} from '@angular/core';
import {ModalForm} from './modalForm';
import {AuthLoginComponent} from '../login/components/auth-login/auth-login.component';
import {RegisterComponent} from '../user/register/register.component';
import {RecoverPasswordComponent} from '../user/recover-password/recover-password.component';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {
  private  _load$ = new Subject();
  public load$ = this._load$.asObservable();
  public currentIndex: number;
  getModal(): ModalForm[] {
    return [new ModalForm(AuthLoginComponent),
      new ModalForm(RegisterComponent),
    new ModalForm(RecoverPasswordComponent)];
  }

  handleLoad(index: number): Subject<number>{
    return new Subject<number>();
  }

  load(index: number): void{
    this._load$.next(index);
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

}
