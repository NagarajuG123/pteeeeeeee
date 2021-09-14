import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrandRoutingModule } from './brand-routing.module';
import { BrandComponent } from './brand.component';
import { InfoComponent } from './info/info.component';
<<<<<<< HEAD
import { SharedModule } from 'src/app/_shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BrandComponent, InfoComponent],
  imports: [CommonModule, BrandRoutingModule, FontAwesomeModule,SharedModule,FormsModule,ReactiveFormsModule],
=======
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [BrandComponent, InfoComponent, SearchComponent],
  imports: [CommonModule, BrandRoutingModule, FontAwesomeModule],
>>>>>>> 29883fd1ddb10a41d4be8360dbddd05e58769443
})
export class BrandModule {}
