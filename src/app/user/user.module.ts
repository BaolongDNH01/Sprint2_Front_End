import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUserComponent } from './list-user/list-user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { LockUserComponent } from './lock-user/lock-user.component';
import {UserRoutingModule} from './user-routing.module';



@NgModule({
  declarations: [ListUserComponent, LockUserComponent],
  exports: [
    ListUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
