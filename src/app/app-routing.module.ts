import {CartComponent} from './payment/components/cart/cart.component';
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
import { ErrorPageComponent } from './payment/components/error-page/error-page.component';
import {ProductCreateComponent} from './product/product-create/product-create.component';

import {ApprovalProductComponent} from './product/approval-product/approval-product.component';
import {TransactionManagementComponent} from './transaction-management/transaction-management.component';

import { PaymentAddressComponent } from './payment/components/payment-address/payment-address.component';
import {ListUserComponent} from './user/list-user/list-user.component';
import {LockUserComponent} from './user/lock-user/lock-user.component';
import {UnlockUserComponent} from './user/unlock-user/unlock-user.component';
import {DetailUserComponent} from './user/detail-user/detail-user.component';
import {AddUserComponent} from './user/add-user/add-user.component';
import {SendMailComponent} from './user/send-mail/send-mail.component';
import {DeleteUserComponent} from './user/delete-user/delete-user.component';
import {ActivatedAccountComponent} from './user/activated-account/activated-account.component';
import {ErrorComponent} from './error/error.component';
import {ResetPasswordComponent} from './user/reset-password/reset-password.component';
import {FunctionAdminComponent} from './function-admin/function-admin.component';
import {ProductManageComponent} from './product/product-manage/product-manage.component';
import {NavBarUserComponent} from './function-user/nav-bar-user/nav-bar-user.component';
import {UserInformationComponent} from './user-manage/user-information/user-information.component';
import {HistoryPostProductComponent} from './user-manage/history-post-product/history-post-product.component';
import {HistoryAutionComponent} from './user-manage/history-aution/history-aution.component';
import { PaymentMethodComponent } from './payment/components/payment-method/payment-method.component';
import { PaymentOrderComponent } from './payment/components/payment-order/payment-order.component';
import {AdminEditProductComponent} from "./product/admin-edit-product/admin-edit-product.component";
import {AdminAddProductComponent} from "./product/admin-add-product/admin-add-product.component";




const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'auction-guide', component: AuctionGuideComponent},
      {path: '', component: DefaultLoadComponent},
      {path: 'recover-password/:username', component: RecoverPasswordCodeComponent},
      {path: 'reset-password/:username', component: ResetPasswordComponent},
      {path: 'product-details/:id', component: ProductDetailsComponent},
      {path: 'product-create', component: ProductCreateComponent},
      {path: 'approval-product/:id', component: ApprovalProductComponent},
      {path: 'transaction-management', component: TransactionManagementComponent},
      {path: 'activated-account/:token', component: ActivatedAccountComponent},
      {path: 'edit-product/:id', component: AdminEditProductComponent},
      {path: 'add-product', component: AdminAddProductComponent},
      {path: 'fc-admin', component: FunctionAdminComponent, children: [
          {path: '', component: ListUserComponent},
          // link admin bỏ vào đây
          {path: 'list-user', component: ListUserComponent},
          {path: 'delete/:ids', component: DeleteUserComponent},
          {path: 'user/:id', component: DetailUserComponent},
          {path: 'add-user', component: AddUserComponent},
          {path: 'lock-user/:ids', component: LockUserComponent},
          {path: 'unlock-user/:ids', component: UnlockUserComponent},
          {path: 'productManage', component: ProductManageComponent},
          {path: 'send-email', component: SendMailComponent},
          {path: 'list-auction', component: ListAuctionComponent},
          {path: 'transaction-management', component: TransactionManagementComponent},
        ]},
      {path: 'userManage', component: NavBarUserComponent, children: [
          {path: '', component: UserInformationComponent},
          {path: 'historyPostProduct', component: HistoryPostProductComponent},
          {path: 'historyAuction', component: HistoryAutionComponent}
          //  chuc nang user
        ]}
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
      },
      {
        path: 'error-page',
        component: ErrorPageComponent
      },
      {
        path: 'payment-address',
        component: PaymentAddressComponent
      },
      {
        path: 'payment-method',
        component: PaymentMethodComponent
      },
      {
        path: 'payment-order',
        component: PaymentOrderComponent
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
