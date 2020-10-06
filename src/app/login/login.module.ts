import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthLoginComponent} from './components/auth-login/auth-login.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [AuthLoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule

  ],
  exports: [AuthLoginComponent]
})
export class LoginModule { }
