import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { VideosComponent } from './videos/videos.component';
import { AwardsComponent } from './awards/awards.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [HomeComponent, AwardsComponent, VideosComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule, CarouselModule],
})
export class HomeModule { }
