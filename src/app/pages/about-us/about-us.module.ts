import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';
import { BannerComponent } from './banner/banner.component';
import { FranchiseComponent } from './franchise/franchise.component';
import { PublicationComponent } from './publication/publication.component';
import { PartnerComponent } from './partner/partner.component';


@NgModule({
  declarations: [
    AboutUsComponent,
    BannerComponent,
    FranchiseComponent,
    PublicationComponent,
    PartnerComponent
  ],
  imports: [
    CommonModule,
    AboutUsRoutingModule
  ]
})
export class AboutUsModule { }
