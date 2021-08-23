import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_core/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  room1903Url: string = environment.room1903Url;
  eeUrl: string = environment.eeUrl;
  menu = [
    { label: 'HOME', url: '#' },
    { label: 'ABOUT', url: '#' },
    { label: 'ARTICLES', url: '#' },
    { label: 'COVERS', url: '#' },
    { label: 'LOREM', url: '#' },
  ];
  socialLink = [
    {
      img: '../../../assets/images/facebook-icon-w 1.svg',
      url: '#',
      name: 'facebook',
    },
    {
      img: '../../../assets/images/instagram-icon-w 1.svg',
      url: '#',
      name: 'instagram',
    },
    {
      img: '../../../assets/images/linkedin-icon-W 1.svg',
      url: '#',
      name: 'linkedin',
    },
    { img: '../../../assets/images/youtube.svg', url: '#', name: 'youtube' }, // icon: 'fa fa-youtube',
  ];
  // searchForm: FormGroup;
  sidenav: any;
  isSide: boolean = false;
  constructor(public commonService: CommonService) {}

  ngOnInit(): void {}
  // onSearchSubmit(searchForm: any, type) {
  //   if (type === 'sidebar') {
  //     this.commonService.toggle();
  //   }
  // }
}
