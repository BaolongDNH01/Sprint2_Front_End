import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {AuctionModule} from '../auction/auction.module';
import {ProductCreateComponent} from './product-create/product-create.component';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ApprovalProductComponent} from './approval-product/approval-product.component';
import {ProductManageComponent} from './product-manage/product-manage.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { AdminAddProductComponent } from './admin-add-product/admin-add-product.component';
import {RouterModule} from '@angular/router';

// @ts-ignore
@NgModule({
  declarations: [ProductCreateComponent,
    ProductDetailsComponent,
    ApprovalProductComponent,
    ProductManageComponent,
    AdminAddProductComponent,
  ],
  exports: [
    ProductCreateComponent,
    ProductDetailsComponent,
    ApprovalProductComponent,
    ProductManageComponent,
    AdminAddProductComponent
  ],
    imports: [
        CommonModule,
        AuctionModule,
        MatSelectModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        AngularFirestoreModule.enablePersistence(),
        RouterModule
    ],
  providers: [DatePipe]
})
export class ProductModule {
}
