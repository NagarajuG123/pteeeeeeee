import { Component, OnInit } from '@angular/core';
import {
  faFacebookF,
  faLinkedinIn,
  faYoutube,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { ApiService } from 'src/app/_core/services/api.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Footer } from 'src/app/_core/models/footer.model';
const RESULT_KEY = makeStateKey<any>('footerState');

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})

export class FooterComponent implements OnInit {
  footer: any = [];
  slug: string = '1851';
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();

  faFacebookFIcon = faFacebookF;
  faLinkedinInIcon = faLinkedinIn;
  faYoutubeIcon = faYoutube;
  faInstagramIcon = faInstagram;

  constructor(private tstate: TransferState,private apiService:ApiService) {}

  ngOnInit(): void {
    if (this.tstate.hasKey(RESULT_KEY)) {
      const footerData = this.tstate.get(RESULT_KEY, {});
      this.footer = footerData['data'];
    } else {
      const footerData: any = {};

        this.apiService
        .getAPI(`${this.slug}/footer`)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((response) => {
          footerData['data'] = response.data; 
        });

        this.tstate.set(RESULT_KEY, footerData);
    } 
  }
}
