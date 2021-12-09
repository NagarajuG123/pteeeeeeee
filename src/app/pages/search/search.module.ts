import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { SearchRoutingModule } from './search-routing.module';
import { DatePipe } from '@angular/common';
import { SplitArrayPipe } from 'src/app/_core/pipes/split-array.pipe';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxDaterangepickerMd.forRoot(),
    SearchRoutingModule,
  ],
  providers: [DatePipe, SplitArrayPipe],
})
export class SearchModule {}
