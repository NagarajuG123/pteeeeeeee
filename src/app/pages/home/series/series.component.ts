import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {
  seriesData: any;
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();
  isLoaded:boolean;
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
  this.apiService
    .getAPI(`series`)
      .pipe(takeUntil(this.onDestroy$))
        .subscribe((result) => {
          this.seriesData = result.data;
          if(this.seriesData.length > 0) {
            this.isLoaded = true;
          }
        }); 
  }

  ngOnDestroy() {
    this.onDestroySubject.next(true);
    this.onDestroySubject.complete();
  }
}
