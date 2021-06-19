import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../_shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { FeaturedComponent } from '../components/featured/featured.component';
import { SpotlightComponent } from '../components/spotlight/spotlight.component';
import { AwardsComponent } from '../components/awards/awards.component';
import { ServiceComponent } from '../components/service/service.component';

@NgModule({
  declarations: [
    HomeComponent,
    FeaturedComponent,
    SpotlightComponent,
    AwardsComponent,
    ServiceComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
