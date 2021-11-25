import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../_shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { VideoComponent } from './video/video.component';
import { EditorialSectionsComponent } from './editorial-sections/editorial-sections.component';
import { SpecialfeatureComponent } from './specialfeature/specialfeature.component';

@NgModule({
  declarations: [HomeComponent, VideoComponent, EditorialSectionsComponent, SpecialfeatureComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
  providers: [],
})
export class HomeModule {}
