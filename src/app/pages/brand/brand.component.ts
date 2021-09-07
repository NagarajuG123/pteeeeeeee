import { Component, OnInit } from '@angular/core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faLinkedinIn,
  faYoutube,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
})
export class BrandComponent implements OnInit {
  faFacebookFIcon = faFacebookF;
  faLinkedinInIcon = faLinkedinIn;
  faYoutubeIcon = faYoutube;
  faInstagramIcon = faInstagram;
  faCaretDown = faCaretDown;

  relatedArticles = [
    {
      media: '../../../assets/dummy-images/Rectangle 221.jpg',
      title: 'Lorem ipsum morbi tristia con flubet o lemase...',
      by: 'LOREM IPSUM',
    },
    {
      media: '../../../assets/dummy-images/Rectangle 222.jpg',
      title: 'Lorem ipsum morbi tristia con flubet o lemase...',
      by: 'LOREM IPSUM',
    },
    {
      media: '../../../assets/dummy-images/Rectangle 223.jpg',
      title: 'Lorem ipsum morbi tristia con flubet o lemase...',
      by: 'LOREM IPSUM',
    },
    {
      media: '../../../assets/dummy-images/Rectangle 224.jpg',
      title: 'Lorem ipsum morbi tristia con flubet o lemase...',
      by: 'LOREM IPSUM',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
