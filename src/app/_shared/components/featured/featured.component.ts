import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss'],
})
export class FeaturedComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  list: any = [
    {
      label: 'Featured Article',
      detail: 'Title Lorem Ipsum Abudi Lorem Ipsum Yada Sed',
      image: '../../../../assets/images/image 39.jpg',
    },
    {
      label: 'Featured Article',
      detail: 'Title Lorem Ipsum Abudi Lorem Ipsum Yada Sed',
      image: '../../../../assets/images/Rectangle 122.jpg',
    },
    {
      label: 'Featured Article',
      detail: 'Title Lorem Ipsum Abudi Lorem Ipsum Yada Sed',
      image: '../../../../assets/images/Rectangle 148.jpg',
    },
    {
      label: 'Featured Article',
      detail: 'Title Lorem Ipsum Abudi Lorem Ipsum Yada Sed',
      image: '../../../../assets/images/Rectangle 150.jpg',
    },
  ];
  publication: any = [];
  brandNews: any = [
    {
      title: 'Title Lorem Ipsum: Conset Entumi Abudi',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod tempor incididun.A scelerisque purus semper eget..',
      createdBy: 'Paige Ivy',
    },
    {
      title: 'Title Lorem Ipsum: Conset Entumi Abudi',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod tempor incididun.A scelerisque purus semper eget..',
      createdBy: 'Paige Ivy',
    },
    {
      title: 'Title Lorem Ipsum: Conset Entumi Abudi',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod tempor incididun.A scelerisque purus semper eget..',
      createdBy: 'Paige Ivy',
    },
    {
      title: 'Title Lorem Ipsum: Conset Entumi Abudi',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod tempor incididun.A scelerisque purus semper eget..',
      createdBy: 'Paige Ivy',
    },
  ];
  IndustryNews: any = [
    {
      title: 'Title Lorem Ipsum: Conset Entumi Abudi',
      createdBy: 'Paige Ivy',
      image: '../../../assets/images/Rectangle 33.jpg',
    },
    {
      title: 'Title Lorem Ipsum: Conset Entumi Abudi',
      createdBy: 'Paige Ivy',
      image: '../../../assets/images/Rectangle 33.jpg',
    },
    {
      title: 'Title Lorem Ipsum: Conset Entumi Abudi',
      createdBy: 'Paige Ivy',
      image: '../../../assets/images/Rectangle 33.jpg',
    },
    {
      title: 'Title Lorem Ipsum: Conset Entumi Abudi',
      createdBy: 'Paige Ivy',
      image: '../../../assets/images/Rectangle 33.jpg',
    },
  ];
  slug: string = '1851';
  ngOnInit(): void {
    this.getPublication();
  }
  //Publication Instance
  getPublication() {
    this.apiService
      .getAPI(`1851/publication-instance`)
      .subscribe((response) => {
        this.publication = response;
      });
  }
}
