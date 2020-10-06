import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {ProductModule} from './product/product.module';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {UserModule} from './user/user.module';
import {AuctionModule} from './auction/auction.module';
import {HomePageModule} from './home-page/home-page.module';
import {UserManageModule} from './user-manage/user-manage.module';
import {ProductListModule} from './product/product-list.module';
import { NewComponentComponent } from './new-component/new-component.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';


@NgModule({
  declarations: [
    AppComponent,
    NewComponentComponent,
    ProductCreateComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    UserModule,
    ProductListModule,
    AuctionModule,
    HomePageModule,
    UserManageModule,
   AppRoutingModule,
  ProductModule
  ],

  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
