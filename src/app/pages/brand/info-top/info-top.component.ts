import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-top',
  templateUrl: './info-top.component.html',
  styleUrls: ['./info-top.component.scss'],
})
export class InfoTopComponent implements OnInit {
  @Input('data') data: any = [];
  @Input('brandSlug') brandSlug = '1851';
  @Input('type') type = '';
  
  constructor() {}

  ngOnInit(): void {}
}
