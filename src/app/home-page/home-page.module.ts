import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AuctionGuideComponent } from './auction-guide/auction-guide.component';
import {RouterModule} from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import {LoginModule} from '../login/login.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {ModalFormDirective} from './modalForm.directive';


@NgModule({
  declarations: [HomeComponent, AuctionGuideComponent, ModalComponent, NavBarComponent, ModalFormDirective],
  exports: [
    HomeComponent,
    NavBarComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        LoginModule
    ]
})
export class HomePageModule { }
