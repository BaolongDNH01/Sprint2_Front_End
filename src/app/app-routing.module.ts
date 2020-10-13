import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageModule} from './home-page/home-page.module';
import {AuctionGuideComponent} from './home-page/auction-guide/auction-guide.component';
import {HomeComponent} from './home-page/home/home.component';
import {DisplayProductAutionComponent} from './home-page/display-product-aution/display-product-aution.component';
import {ListAuctionComponent} from './auction/list-auction/list-auction.component';
import {RecoverPasswordCodeComponent} from './user/recover-password-code/recover-password-code.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'auction-guide', component: AuctionGuideComponent },
      {path: '', component: DisplayProductAutionComponent},
      {path: 'list-auction', component: ListAuctionComponent},
      {path: 'recover-password', component: RecoverPasswordCodeComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
