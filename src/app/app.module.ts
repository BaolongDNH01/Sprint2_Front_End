import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {ProductModule} from './product/product.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserModule} from './user/user.module';
import {AuctionModule} from './auction/auction.module';
import {HomePageModule} from './home-page/home-page.module';
import {UserManageModule} from './user-manage/user-manage.module';
// import {ProductListModule} from './product/product-list.module';
import {LoginModule} from './login/login.module';
import {httpInterceptorProviders} from './login/auth/auth-http.interceptor';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialAuthServiceConfig, SocialLoginModule
} from 'angularx-social-login';
import {AuthLoginComponent} from './login/components/auth-login/auth-login.component';
import { TransactionManagementComponent } from './transaction-management/transaction-management.component';
import {ModalServiceService} from './home-page/modal-service.service';
import {
  RECAPTCHA_LANGUAGE,
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule, RecaptchaModule,
  RecaptchaSettings
} from 'ng-recaptcha';
import {PaymentModule} from './payment/payment.module';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { ErrorComponent } from './error/error.component';
import { FunctionAdminComponent } from './function-admin/function-admin.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NgxPaginationModule} from 'ngx-pagination';
import {FunctionUserModule} from './function-user/function-user.module';




@NgModule({
  declarations: [
    AppComponent,
    TransactionManagementComponent,
    ErrorComponent,
    FunctionAdminComponent,
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
    PaymentModule,
    AuctionModule,
    HomePageModule,
    UserManageModule,
    AppRoutingModule,
    LoginModule,
    ProductModule,
    SocialLoginModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    FormsModule,
    Ng2SearchPipeModule,
    DragDropModule,
    NgxPaginationModule,
    FunctionUserModule
  ],

  providers: [AngularFirestore, ModalServiceService,
    httpInterceptorProviders,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6LclFdYZAAAAAIKFeb0k5ViLlQ3Vp37_JVR5_C7M', } as RecaptchaSettings,
    },
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'en',
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '570845823533-rd5op7viidgmviib1mcgh9jqkmqlhf7q.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('242813840370623'),
          },
        ],
      } as SocialAuthServiceConfig,
    }, ],
  bootstrap: [AppComponent],
  entryComponents: [AuthLoginComponent]
})
export class AppModule {
}
