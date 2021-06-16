import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { DefaultImagePipe } from './pipes/default-image.pipe';
@NgModule({
  declarations: [AppComponent, LayoutComponent, DefaultImagePipe],
  imports: [BrowserModule, AppRoutingModule, SharedModule, HomeModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
