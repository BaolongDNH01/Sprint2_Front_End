import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarUserComponent } from './nav-bar-user/nav-bar-user.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [NavBarUserComponent],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class FunctionUserModule { }
