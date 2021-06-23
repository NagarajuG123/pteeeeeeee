import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../_shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { FeaturedComponent } from '../components/featured/featured.component';
import { SpotlightComponent } from '../components/spotlight/spotlight.component';
import { AwardsComponent } from '../components/awards/awards.component';
import { HomeFeatureComponent } from '../components/home-feature/home-feature.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    HomeComponent,
    FeaturedComponent,
    SpotlightComponent,
    AwardsComponent,
    HomeFeatureComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule, NgbModule],
})
export class HomeModule {}
