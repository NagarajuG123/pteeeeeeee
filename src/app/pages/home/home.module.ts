import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../_shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { EditorialSectionsComponent } from './editorial-sections/editorial-sections.component';
import { SeriesComponent } from './series/series.component';

@NgModule({
  declarations: [HomeComponent, EditorialSectionsComponent, SeriesComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
  providers: [],
})
export class HomeModule {}
