import { Component, OnInit } from '@angular/core';
import {
  faFacebookF,
  faLinkedinIn,
  faYoutube,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { ApiService } from 'src/app/_core/services/api.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const FOOTER_KEY = makeStateKey<any>('footerState');

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  footer: any = [];
  slug: string = '';
  socialIcons: any = [
    faFacebookF,
    faInstagram,
    faLinkedinIn,
    faYoutube,
    faTwitter,
  ];

  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  constructor(private state: TransferState, private apiService: ApiService) {}

  ngOnInit(): void {
    this.slug = '1851';
    this.footer = this.state.get(FOOTER_KEY, null as any);
    if (!this.footer) {
      this.apiService
        .getAPI2(`footer`)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((response) => {
          this.footer = response;
          this.state.set(FOOTER_KEY, response as any);
        });
    }
  }
}
