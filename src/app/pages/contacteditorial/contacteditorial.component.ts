import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/_core/services/api.service';

const RESULT_KEY = makeStateKey<any>('contactEditorialState');

@Component({
  selector: 'app-contacteditorial',
  templateUrl: './contacteditorial.component.html',
  styleUrls: ['./contacteditorial.component.scss'],
})
export class ContacteditorialComponent implements OnInit, AfterViewInit {
  data: any = [];
  isBrowser: boolean;
  isServer: boolean;
  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();
  
  constructor(
    private apiService: ApiService,
    private tstate: TransferState,
    @Inject(PLATFORM_ID) platformId: Object,
    fb: FormBuilder
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.isServer = isPlatformServer(platformId);
  }

  ngOnInit(): void {
    if(this.tstate.hasKey(RESULT_KEY)){
      const contactData = this.tstate.get(RESULT_KEY,{});
      this.data = contactData['data'];
    }
    else{
      const contactData: any = {};
      this.apiService.getAPI('1851/contact-editorial')
      .pipe(takeUntil(this.onDestroy$)).subscribe((response) => {
        contactData['data'] = response.data;
      });
      this.tstate.set(RESULT_KEY,contactData);
    }
  }
  ngAfterViewInit() {
    if (this.isBrowser) {
      $(document).ready(function () {
        $('.text-field').click(function (e) {
          $(this).closest('ul>li').find('.editors-details').slideToggle();
          $(this).closest('ul> li').find('.form-group').addClass('active');
          $(this)
            .closest('ul> li')
            .siblings()
            .find('.form-group')
            .removeClass('active');
        });

        $('.sucess-message a').click(function (e) {
          $('.editors').show();
          $('.sucess-message').hide();
        });
      });
    }
  }
}
