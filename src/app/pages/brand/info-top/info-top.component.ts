import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-top',
  templateUrl: './info-top.component.html',
  styleUrls: ['./info-top.component.scss'],
})
export class InfoTopComponent implements OnInit {
  Sliderlist: any = [
    {
      link: '/#',
      title:
        'MOOYAH Burgers, Fries & Shakes Eyes Columbus, Ohio For Expansion MOOYAH Burgers, Fries & Shakes Eyes Columbus, Ohio For Expansion',
    },
    {
      link: '/#',
      title:
        'MOOYAH Burgers, Fries & Shakes Eyes Columbus, Ohio For Expansion MOOYAH Burgers, Fries & Shakes Eyes Columbus, Ohio For Expansion',
    },
    {
      link: '/#',
      title:
        'MOOYAH Burgers, Fries & Shakes Eyes Columbus, Ohio For Expansion MOOYAH Burgers, Fries & Shakes Eyes Columbus, Ohio For Expansion',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
