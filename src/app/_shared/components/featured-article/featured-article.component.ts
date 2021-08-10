import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-featured-article',
  templateUrl: './featured-article.component.html',
  styleUrls: ['./featured-article.component.scss'],
})
export class FeaturedArticleComponent implements OnInit {
  constructor() {}

  list: any = [
    {
      label: 'Featured Article',
      detail: 'Title Lorem Ipsum Abudi Lorem Ipsum Yada Sed',
      image: '../../../../assets/img/image 39.jpg',
    },
    {
      label: 'Featured Article',
      detail: 'Title Lorem Ipsum Abudi Lorem Ipsum Yada Sed',
      image: '../../../../assets/img/Rectangle 122.jpg',
    },
    {
      label: 'Featured Article',
      detail: 'Title Lorem Ipsum Abudi Lorem Ipsum Yada Sed',
      image: '../../../../assets/img/Rectangle 148.jpg',
    },
    {
      label: 'Featured Article',
      detail: 'Title Lorem Ipsum Abudi Lorem Ipsum Yada Sed',
      image: '../../../../assets/img/Rectangle 150.jpg',
    },
  ];

  ngOnInit(): void {
    console.log('dd');
  }
}
