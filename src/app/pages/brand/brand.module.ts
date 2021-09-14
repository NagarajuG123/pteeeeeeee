import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandRoutingModule } from './brand-routing.module';
import { BrandComponent } from './brand.component';
import { InfoComponent } from './info/info.component';
import { SharedModule } from '../../_shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BrandComponent,InfoComponent],
  imports: [CommonModule, BrandRoutingModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class BrandModule {}
