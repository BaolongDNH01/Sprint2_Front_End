import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ListUserComponent} from './list-user/list-user.component';
import {LockUserComponent} from './lock-user/lock-user.component';
import {AddUserComponent} from './add-user/add-user.component';
import {SendMailComponent} from './send-mail/send-mail.component';
import {ActivatedAccountComponent} from './activated-account/activated-account.component';

const routes: Routes = [
  {path: '', children: [
      {path: '', component: ListUserComponent},
      {path: 'lock-user/:ids', component: LockUserComponent},
      {path: 'add-user', component: AddUserComponent},
      {path: 'send-email', component: SendMailComponent},
      {path: 'activated-account/:token', component: ActivatedAccountComponent}
    ]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class UserRoutingModule { }
