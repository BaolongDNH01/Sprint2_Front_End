import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InformationComponent} from './component/information/information.component';
import {HistoryRegisterComponent} from './component/history-register/history-register.component';
import {HistoryAuctionComponent} from './component/history-auction/history-auction.component';

const routes: Routes = [
  {path: 'info', component: InformationComponent},
  {path: 'history-register', component: HistoryRegisterComponent},
  {path: 'history-auction', component: HistoryAuctionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
