import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { AppInterceptor } from '../services/http.interceptor';

import { AngularFireDatabaseModule } from '@angular/fire/database';
import {
  WpApiModule,
  WpApiLoader,
  WpApiStaticLoader,
} from 'wp-api-angular';
import { Http } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { IonicStorageModule } from '@ionic/storage';
import { 
  WoocommerceProductsService, 
  WoocommerceHelperService, 
  WoocommerceOrderService } from '../services/woo/wooApi';

import { PopoverComponent } from './components/popover/popover.component';
import { ModalComponent } from './components/modal/modal.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

export function WpApiLoaderFactory(http: Http) {
  return new WpApiStaticLoader(http, 'https://www.goiabeirascotland.com/wp-json');
}


@NgModule({
  declarations: [AppComponent, PopoverComponent, ModalComponent],
  entryComponents: [PopoverComponent, ModalComponent],
  imports: [
    IonicStorageModule.forRoot(),
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    WpApiModule.forRoot({
      provide: WpApiLoader,
      useFactory: (WpApiLoaderFactory),
      deps: [Http]
    }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
    WoocommerceProductsService,
    WoocommerceHelperService,
    WoocommerceOrderService
  ],
  bootstrap: [AppComponent],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule {}
