import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';


@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }
=======
import { SearchComponent } from './search.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { SearchRoutingModule } from './search-routing.module';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxDaterangepickerMd.forRoot(),
    SearchRoutingModule,
  ],
  providers: [DatePipe],
})
export class SearchModule {}
>>>>>>> cc22ff94e7d3c2908354ce718963aa77624b7aeb
