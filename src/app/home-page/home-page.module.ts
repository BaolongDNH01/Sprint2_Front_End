import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AuctionGuideComponent } from './auction-guide/auction-guide.component';
import {RouterModule} from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import {LoginModule} from '../login/login.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {ModalFormDirective} from './modalForm.directive';
import { DisplayProductAutionComponent } from './display-product-aution/display-product-aution.component';
import { DisplayProductAjaxComponent } from './display-product-ajax/display-product-ajax.component';



@NgModule({
  declarations: [HomeComponent, AuctionGuideComponent, DisplayProductAutionComponent,  ModalComponent, NavBarComponent, ModalFormDirective, DisplayProductAjaxComponent],
  exports: [
    HomeComponent,
    AuctionGuideComponent,
    NavBarComponent,
    DisplayProductAjaxComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        LoginModule
    ]
})
export class HomePageModule { }
