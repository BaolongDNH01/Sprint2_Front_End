import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes} from '@angular/router';
import {ListUserComponent} from './list-user/list-user.component';
import {LockUserComponent} from './lock-user/lock-user.component';

const routes: Routes = [
  {path: '', children: [
      {path: '', component: ListUserComponent},
      {path: 'lock-user/:ids', component: LockUserComponent}
    ]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UserRoutingModule { }
