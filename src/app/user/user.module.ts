import { NgModule } from '@angular/core';
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




@NgModule({
  declarations: [ListUserComponent, LockUserComponent, AddUserComponent, RegisterComponent, SendMailComponent, ActivatedAccountComponent, RecoverPasswordComponent],
  exports: [
    ListUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    UserRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class UserModule { }
