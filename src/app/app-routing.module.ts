import { CartComponent } from './payment/components/cart/cart.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageModule} from './home-page/home-page.module';
import {AuctionGuideComponent} from './home-page/auction-guide/auction-guide.component';
import {HomeComponent} from './home-page/home/home.component';
import {DisplayProductAutionComponent} from './home-page/display-product-aution/display-product-aution.component';
import {ListAuctionComponent} from './auction/list-auction/list-auction.component';
import {RecoverPasswordCodeComponent} from './user/recover-password-code/recover-password-code.component';
import {DefaultLoadComponent} from './home-page/default-load/default-load.component';
import {ProductDetailsComponent} from './product/product-details/product-details.component';
import {ErrorComponent} from './error/error.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'auction-guide', component: AuctionGuideComponent },
      {path: '', component: DefaultLoadComponent},
      {path: 'list-auction', component: ListAuctionComponent},
      {path: 'recover-password', component: RecoverPasswordCodeComponent},
      {path: 'product-details/:id', component: ProductDetailsComponent}
    ]
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'cart',
    children: [
      {
        path: 'get',
        component: CartComponent
      }
    ]
  },
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
