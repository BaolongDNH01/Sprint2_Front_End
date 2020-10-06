import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AuctionGuideComponent } from './auction-guide/auction-guide.component';
import {RouterModule} from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import {LoginModule} from "../login/login.module";



@NgModule({
  declarations: [HomeComponent, AuctionGuideComponent, ModalComponent],
  exports: [
    HomeComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        LoginModule
    ]
})
export class HomePageModule { }
