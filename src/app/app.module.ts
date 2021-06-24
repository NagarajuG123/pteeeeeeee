import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './pages/home/home.module';
import { SharedModule } from './_shared/shared.module';

import { AppComponent } from './app.component';
import { MonthlyCoversModule } from './pages/monthly-covers/monthly-covers.module';
import { AboutUsModule } from './pages/about-us/about-us.module';
import { BrandModule } from './pages/brand/brand.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    SharedModule,
    HomeModule,
    HttpClientModule,
    MonthlyCoversModule,
    AboutUsModule,
    BrandModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
