import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from './shared/shared.module';
import { SpotlightComponent } from './components/spotlight/spotlight.component';
import { ServiceComponent } from './components/service/service.component';
import { AwardsComponent } from './components/awards/awards.component';

@NgModule({
  declarations: [AppComponent, LayoutComponent, SpotlightComponent, ServiceComponent, AwardsComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule, HomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
