import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Details } from 'src/app/_core/models/details.model';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';

@Component({
  selector: 'app-franchise-research',
  templateUrl: './franchise-research.component.html',
  styleUrls: ['./franchise-research.component.scss']
})
export class FranchiseResearchComponent implements OnInit {
  @Input() slug: string;
  brandInfoNews: Details[] = [];
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(private apiService: ApiService,
    public commonService: CommonService) { }

  ngOnInit(): void {
    this.apiService
      .getAPI(`info?slug=${this.slug}`)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        this.brandInfoNews = result;
      });
  }

}
