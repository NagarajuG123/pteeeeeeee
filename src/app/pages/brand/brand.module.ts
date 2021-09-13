import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrandRoutingModule } from './brand-routing.module';
import { BrandComponent } from './brand.component';
import { InfoComponent } from './info/info.component';
import { SharedModule } from 'src/app/_shared/shared.module';

@NgModule({
  declarations: [BrandComponent, InfoComponent],
  imports: [CommonModule, BrandRoutingModule, FontAwesomeModule,SharedModule],
})
export class BrandModule {}
