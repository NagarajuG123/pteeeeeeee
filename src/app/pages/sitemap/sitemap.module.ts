import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitemapComponent } from 'src/app/pages/sitemap/sitemap.component';
import { DetailsComponent } from './details/details.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { SitemapRoutingModule } from './sitemap-routing.module';

@NgModule({
  declarations: [SitemapComponent, DetailsComponent],
  imports: [CommonModule, SitemapRoutingModule, SharedModule],
})
export class SitemapModule {}
