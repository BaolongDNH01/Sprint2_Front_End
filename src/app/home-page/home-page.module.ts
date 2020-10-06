import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AuctionGuideComponent } from './auction-guide/auction-guide.component';
import {RouterModule} from '@angular/router';
import { DisplayProductAutionComponent } from './display-product-aution/display-product-aution.component';



@NgModule({
  declarations: [HomeComponent, AuctionGuideComponent, DisplayProductAutionComponent],
  exports: [
    HomeComponent,
    AuctionGuideComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class HomePageModule { }
