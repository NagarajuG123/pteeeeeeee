import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../_shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SpotlightComponent } from './spotlight/spotlight.component';
import { HomeFeatureComponent } from './home-feature/home-feature.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { VideoComponent } from './video/video.component';

@NgModule({
  declarations: [HomeComponent, SpotlightComponent, HomeFeatureComponent, VideoComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule, CarouselModule],
})
export class HomeModule {}
