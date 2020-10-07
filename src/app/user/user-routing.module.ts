import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ListUserComponent} from './list-user/list-user.component';
import {LockUserComponent} from './lock-user/lock-user.component';
import {AddUserComponent} from './add-user/add-user.component';
import {SendMailComponent} from './send-mail/send-mail.component';
import {ActivatedAccountComponent} from './activated-account/activated-account.component';
import {UnlockUserComponent} from './unlock-user/unlock-user.component';
import {DeleteUserComponent} from './delete-user/delete-user.component';

const routes: Routes = [
  {path: '', children: [
      {path: 'list-user', component: ListUserComponent},
      {path: 'lock-user/:ids', component: LockUserComponent},
      {path: 'unlock-user/:ids', component: UnlockUserComponent},
      {path: 'add-user', component: AddUserComponent},
      {path: 'send-email', component: SendMailComponent},
      {path: 'delete/:ids', component: DeleteUserComponent},
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
