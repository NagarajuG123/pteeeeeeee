import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/_core/services/api.service';
import { MetaService } from 'src/app/_core/services/meta.service';
@Component({
  selector: 'app-contacteditorial',
  templateUrl: './contacteditorial.component.html',
  styleUrls: ['./contacteditorial.component.scss'],
})
export class ContacteditorialComponent implements OnInit, AfterViewInit {
  data: any = [];
  isBrowser: boolean;
  isServer: boolean;

  constructor(
    private apiService: ApiService,
    private metaService: MetaService,
    @Inject(PLATFORM_ID) platformId: Object,
    fb: FormBuilder
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.isServer = isPlatformServer(platformId);
  }

  ngOnInit(): void {
    this.getContactEditorial();
    this.getMeta();
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
  getContactEditorial() {
    this.apiService.getAPI('1851/contact-editorial').subscribe((response) => {
      this.data = response.data;
    });
  }

  getMeta() {
    this.apiService.getAPI(`1851/meta`).subscribe((response) => {
      this.metaService.setSeo(response.data);
      this.apiService
        .getAPI(`1851/publication-instance`)
        .subscribe((result) => {
          this.metaService.setTitle(`Contact Editorial | ${result.title.toUpperCase()}`);
        });
    });
  }
}
