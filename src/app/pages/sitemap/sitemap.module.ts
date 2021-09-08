import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SitemapRoutingModule } from './sitemap-routing.module';
import { SitemapComponent } from './sitemap.component';
import { SitemapDetailsComponent } from '../sitemap-details/sitemap-details.component';

@NgModule({
  declarations: [SitemapComponent, SitemapDetailsComponent],
  imports: [CommonModule, SitemapRoutingModule],
})
export class SitemapModule {}
