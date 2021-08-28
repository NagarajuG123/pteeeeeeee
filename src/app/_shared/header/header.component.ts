import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_core/services/common.service';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faLinkedinIn,
  faYoutube,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/_core/services/api.service';
import { Details } from 'src/app/_core/models/details.model';
import { makeStateKey, TransferState } from '@angular/platform-browser';

const RESULT_KEY = makeStateKey<any>('headerState');
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  slug: string = '1851';
  sidebar: any = [];
  publication: any = [];

  faCaretRightIcon = faCaretRight;
  room1903Url: string = environment.room1903Url;
  eeUrl: string = environment.eeUrl;
  menu = [
    { label: 'HOME', url: '#' },
    { label: 'ABOUT', url: '#' },
    { label: 'ARTICLES', url: '#' },
    { label: 'COVERS', url: '#' },
    { label: 'LOREM', url: '#' },
    { label: 'LOREM', url: '#' },
  ];
  socialLink = [
    {
      // img: '../../../assets/img/facebook-icon-w 1.svg',
      icon: faFacebookF,
      url: '#',
      name: 'facebook',
    },
    {
      // img: '../../../assets/img/instagram-icon-w 1.svg',
      icon: faInstagram,
      url: '#',
      name: 'instagram',
    },
    {
      // img: '../../../assets/img/linkedin-icon-W 1.svg',
      icon: faLinkedinIn,
      url: '#',
      name: 'linkedin',
    },
    { url: '#', name: 'youtube', icon: faYoutube }, // icon: 'fa fa-youtube',
  ];
  // searchForm: FormGroup;
  sidenav: any;
  isSide: boolean = false;
  constructor(public commonService: CommonService,
     private apiService: ApiService,private tstate: TransferState,) {}

  ngOnInit(): void {
    if (this.tstate.hasKey(RESULT_KEY)) {
      const sidebarData = this.tstate.get(RESULT_KEY, {});
      this.sidebar = sidebarData['data'];
      this.publication =sidebarData['publication'];
    } else {
      const sidebarData: any = {};

        this.apiService
        .getAPI(`${this.slug}/sidebar?limit=10&offset=0`)
        .subscribe((response) => {
          sidebarData['data'] = response.data; 
        });

        this.apiService
        .getAPI(`1851/publication-instance`)
        .subscribe((response) => {
          sidebarData['publication'] = response;
        });

        this.tstate.set(RESULT_KEY, sidebarData);
    } 
  }

  // onSearchSubmit(searchForm: any, type) {
  //   if (type === 'sidebar') {
  //     this.commonService.toggle();
  //   }
  // }
}
