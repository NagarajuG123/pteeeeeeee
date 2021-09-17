import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

<<<<<<< HEAD
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
=======
import { SharedModule } from '../../_shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SpotlightComponent } from './spotlight/spotlight.component';
import { HomeFeatureComponent } from './home-feature/home-feature.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { VideoComponent } from './video/video.component';

@NgModule({
  declarations: [
    HomeComponent,
    SpotlightComponent,
    HomeFeatureComponent,
    VideoComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule, CarouselModule],
})
export class HomeModule {}
>>>>>>> cc22ff94e7d3c2908354ce718963aa77624b7aeb
