import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './component/user/user.component';
import {HistoryRegisterComponent} from './component/history-register/history-register.component';
import {HistoryAuctionComponent} from './component/history-auction/history-auction.component';

const routes: Routes = [
  {path: 'user', component: UserComponent},
  {path: 'history-register', component: HistoryRegisterComponent},
  {path: 'history-auction', component: HistoryAuctionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
