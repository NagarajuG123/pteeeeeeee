import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../_shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SpotlightComponent } from './spotlight/spotlight.component';
import { HomeFeatureComponent } from './home-feature/home-feature.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [HomeComponent, SpotlightComponent, HomeFeatureComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule, CarouselModule],
})
export class HomeModule {}
