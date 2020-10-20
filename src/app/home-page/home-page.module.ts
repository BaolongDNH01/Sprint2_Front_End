import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {AuctionGuideComponent} from './auction-guide/auction-guide.component';
import {RouterModule} from '@angular/router';
import {ModalComponent} from './modal/modal.component';
import {LoginModule} from '../login/login.module';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {ModalFormDirective} from './modalForm.directive';
import {DisplayProductAutionComponent} from './display-product-aution/display-product-aution.component';
import {AuthLoginComponent} from '../login/components/auth-login/auth-login.component';
import {DisplayProductAjaxComponent} from './display-product-ajax/display-product-ajax.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { DefaultLoadComponent } from './default-load/default-load.component';
import { CarouselComponent } from './home/carousel/carousel/carousel.component';
import { FooterComponent } from './home/footer/footer/footer.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [HomeComponent,
    AuctionGuideComponent,
    DisplayProductAutionComponent,
    ModalComponent,
    NavBarComponent,
    ModalFormDirective,
    DisplayProductAjaxComponent,
    DefaultLoadComponent,
    CarouselComponent,
    FooterComponent],
  exports: [
    HomeComponent,
    AuctionGuideComponent,
    NavBarComponent,
    DisplayProductAjaxComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        LoginModule,
        NgxPaginationModule,
        FormsModule
    ]
})
export class HomePageModule {
}
