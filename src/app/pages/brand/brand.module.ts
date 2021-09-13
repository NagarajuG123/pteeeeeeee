import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrandRoutingModule } from './brand-routing.module';
import { BrandComponent } from './brand.component';
import { InfoComponent } from './info/info.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [BrandComponent, InfoComponent, SearchComponent],
  imports: [CommonModule, BrandRoutingModule, FontAwesomeModule],
})
export class BrandModule {}
