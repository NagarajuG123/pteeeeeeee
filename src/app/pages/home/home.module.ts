import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../_shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { EditorialSectionsComponent } from './editorial-sections/editorial-sections.component';
import { SeriesComponent } from './series/series.component';
import { AwardsComponent } from './awards/awards.component';
import { FeaturedCarouselComponent } from './featured-carousel/featured-carousel.component';

@NgModule({
  declarations: [
    HomeComponent,
    EditorialSectionsComponent,
    SeriesComponent,
    AwardsComponent,
    FeaturedCarouselComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
  providers: [],
  exports: [AwardsComponent]
})
export class HomeModule {}
