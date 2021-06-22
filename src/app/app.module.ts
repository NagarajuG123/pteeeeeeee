import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './_shared/shared.module';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { MonthlyCoversModule } from './pages/monthly-covers/monthly-covers.module';

@NgModule({
  declarations: [AppComponent, LayoutComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    SharedModule,
    HomeModule,
    HttpClientModule,
    MonthlyCoversModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
