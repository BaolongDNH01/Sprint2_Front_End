import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInformationComponent } from './user-information/user-information.component';
import {ReactiveFormsModule} from '@angular/forms';
import {UserService} from './user.service';



@NgModule({
  declarations: [UserInformationComponent],
  exports: [
    UserInformationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class UserManageModule { }
