import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInformationComponent } from './user-information/user-information.component';
import {ReactiveFormsModule} from '@angular/forms';
import {UserService} from './user.service';
import { HistoryPostProductComponent } from './history-post-product/history-post-product.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { HistoryAutionComponent } from './history-aution/history-aution.component';



@NgModule({
  declarations: [UserInformationComponent, HistoryPostProductComponent, HistoryAutionComponent],
  exports: [
    UserInformationComponent,
    HistoryPostProductComponent,
    HistoryAutionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class UserManageModule { }
