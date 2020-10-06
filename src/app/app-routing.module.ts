import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageModule} from './home-page/home-page.module';
import {AuctionGuideComponent} from './home-page/auction-guide/auction-guide.component';
import {HomeComponent} from './home-page/home/home.component';
import {DisplayProductAutionComponent} from './home-page/display-product-aution/display-product-aution.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'auction-guide', component: AuctionGuideComponent },
      {path: '', component: DisplayProductAutionComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
