import {Injectable, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUserComponent } from './list-user/list-user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { LockUserComponent } from './lock-user/lock-user.component';
import {UserRoutingModule} from './user-routing.module';
import { AddUserComponent } from './add-user/add-user.component';
import { RegisterComponent } from './register/register.component';
import {SendMailComponent} from './send-mail/send-mail.component';
import {ActivatedAccountComponent} from './activated-account/activated-account.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { UnlockUserComponent } from './unlock-user/unlock-user.component';
import {DeleteUserComponent} from './delete-user/delete-user.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import {RecaptchaLoaderService, RecaptchaModule} from 'ng-recaptcha';
import { RecoverPasswordCodeComponent } from './recover-password-code/recover-password-code.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AddWalletComponent } from './add-wallet/add-wallet.component';
import {NgxPayPalModule} from "ngx-paypal";


@NgModule({
  declarations: [ListUserComponent,
  LockUserComponent,
  AddUserComponent,
  RegisterComponent,
  SendMailComponent,
  ActivatedAccountComponent,
  UnlockUserComponent,
  RecoverPasswordComponent,
    DeleteUserComponent,
    DetailUserComponent,
    RecoverPasswordCodeComponent,
    ResetPasswordComponent,
    AddWalletComponent],
  exports: [
    ListUserComponent,
    ResetPasswordComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        UserRoutingModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        RecaptchaModule,
        NgxPayPalModule
    ]
})
export class UserModule { }
