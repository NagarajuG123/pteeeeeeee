import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../_shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { EditorialSectionsComponent } from './editorial-sections/editorial-sections.component';
import { SeriesComponent } from './series/series.component';
import { VideoComponent } from './video/video.component';
import { AwardsComponent } from './awards/awards.component';

@NgModule({
  declarations: [HomeComponent, EditorialSectionsComponent, SeriesComponent, VideoComponent, AwardsComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
  providers: [],
})
export class HomeModule {}
