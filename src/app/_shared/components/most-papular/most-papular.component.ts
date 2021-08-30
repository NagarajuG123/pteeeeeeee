import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-most-papular',
  templateUrl: './most-papular.component.html',
  styleUrls: ['./most-papular.component.scss'],
})
export class MostPapularComponent implements OnInit {
  customOptions: OwlOptions = {
    autoplay: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 3,
      },
    },
    nav: true,
  };
  list = dummyData;
  constructor() {}

  ngOnInit(): void {}
}

// Dummy data array
const dummyData = [
  {
    img: '../../../../assets/images/img.jpg',
    title: 'Title Lorem Ipsum Conset Ent Umi Abudi Adu Sones',
    detail:
      'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod tempor incididun.A scelerisque purus semper eget..',
    createdBy: 'Paige Ivy',
  },
  {
    img: '../../../../assets/images/img-1.jpg',
    title: 'Title Lorem Ipsum Conset Ent Umi Abudi Adu Sones',
    detail:
      'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod tempor incididun.A scelerisque purus semper eget..',
    createdBy: 'Paige Ivy',
  },
  {
    img: '../../../../assets/images/img-2.jpg',
    title: 'Title Lorem Ipsum: Conset Entumi Abudi',
    detail:
      'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod tempor incididun.A scelerisque purus semper eget..',
    createdBy: 'Paige Ivy',
  },
  {
    img: '../../../../assets/images/img.jpg',
    title: 'Title Lorem Ipsum: Conset Entumi Abudi',
    detail:
      'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod tempor incididun.A scelerisque purus semper eget..',
    createdBy: 'Paige Ivy',
  },
  {
    img: '../../../../assets/images/img.jpg',
    title: 'Title Lorem Ipsum: Conset Entumi Abudi',
    detail:
      'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod tempor incididun.A scelerisque purus semper eget..',
    createdBy: 'Paige Ivy',
  },
  {
    img: '../../../../assets/images/img.jpg',
    title: 'Title Lorem Ipsum: Conset Entumi Abudi',
    detail:
      'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod tempor incididun.A scelerisque purus semper eget..',
    createdBy: 'Paige Ivy',
  },
  {
    img: '../../../../assets/images/img.jpg',
    title: 'Title Lorem Ipsum: Conset Entumi Abudi',
    detail:
      'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod tempor incididun.A scelerisque purus semper eget..',
    createdBy: 'Paige Ivy',
  },
  {
    img: '../../../../assets/images/img.jpg',
    title: 'Title Lorem Ipsum: Conset Entumi Abudi',
    detail:
      'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod tempor incididun.A scelerisque purus semper eget..',
    createdBy: 'Paige Ivy',
  },
  {
    img: '../../../../assets/images/img.jpg',
    title: 'Title Lorem Ipsum: Conset Entumi Abudi',
    detail:
      'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod tempor incididun.A scelerisque purus semper eget..',
    createdBy: 'Paige Ivy',
  },
];
