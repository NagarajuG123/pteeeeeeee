import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD

import { SitemapRoutingModule } from './sitemap-routing.module';
import { SitemapComponent } from './sitemap.component';
import { SitemapDetailsComponent } from '../sitemap-details/sitemap-details.component';

@NgModule({
  declarations: [SitemapComponent, SitemapDetailsComponent],
  imports: [CommonModule, SitemapRoutingModule],
})
export class SitemapModule {}
=======
import { SitemapComponent } from 'src/app/pages/sitemap/sitemap.component';
import { SitemapDetailComponent } from './sitemap-detail/sitemap-detail.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { SitemapRoutingModule } from './sitemap-routing.module';


@NgModule({
  declarations: [
    SitemapComponent,
    SitemapDetailComponent
  ],
  imports: [
    CommonModule,
    SitemapRoutingModule,
    SharedModule
  ]
})

export class SitemapModule { }
>>>>>>> cc22ff94e7d3c2908354ce718963aa77624b7aeb
