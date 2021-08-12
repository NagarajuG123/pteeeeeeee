import { Component, OnInit } from '@angular/core';
import { MetaService } from 'src/app/_core/services/meta.service';
import { ApiService } from 'src/app/_core/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
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
      image: '../../../assets/img/Rectangle 33.jpg',
    },
    {
      title: 'Title Lorem Ipsum: Conset Entumi Abudi',
      createdBy: 'Paige Ivy',
      image: '../../../assets/img/Rectangle 33.jpg',
    },
    {
      title: 'Title Lorem Ipsum: Conset Entumi Abudi',
      createdBy: 'Paige Ivy',
      image: '../../../assets/img/Rectangle 33.jpg',
    },
    {
      title: 'Title Lorem Ipsum: Conset Entumi Abudi',
      createdBy: 'Paige Ivy',
      image: '../../../assets/img/Rectangle 33.jpg',
    },
  ];
  slug: string = '1851';

  constructor(
    private metaService: MetaService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.getMeta();
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
  getMeta() {
    this.apiService.getAPI(`1851/meta`).subscribe((response) => {
      this.metaService.setSeo(response.data);
    });
  }
}
