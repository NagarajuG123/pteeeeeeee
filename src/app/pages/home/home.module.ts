import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../_shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { FeaturedComponent } from '../../_shared/components/featured/featured.component';
import { SpotlightComponent } from './spotlight/spotlight.component';
import { HomeFeatureComponent } from './home-feature/home-feature.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from '../../_shared/components/carousel/carousel.component';
import { FooterTopComponent } from './footer-top/footer-top.component';

@NgModule({
  declarations: [
    HomeComponent,
    FeaturedComponent,
    SpotlightComponent,
    HomeFeatureComponent,
    CarouselComponent,
    FooterTopComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule, NgbModule],
})
export class HomeModule {}
