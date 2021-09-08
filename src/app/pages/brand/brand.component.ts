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

  tabnewsList = tabnewsList;

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

const tabnewsList = [
  {
    media: '../../../assets/dummy-images/f1.jpg',
    title: 'Title Lorem Ipsum',
    detail:
      'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod tempor incididun...',
    by: 'Lorem, ipsum',
  },
  {
    media: '../../../assets/dummy-images/f2.jpg',
    title: 'Title Lorem Ipsum',
    detail:
      'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod tempor incididun...',
    by: 'Lorem, ipsum',
  },
  {
    media: '../../../assets/dummy-images/f3.jpg',
    title: 'Title Lorem Ipsum',
    detail:
      'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod tempor incididun...',
    by: 'Lorem, ipsum',
  },
  {
    media: '../../../assets/dummy-images/f4.jpg',
    title: 'Title Lorem Ipsum',
    detail:
      'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod tempor incididun...',
    by: 'Lorem, ipsum',
  },
];
