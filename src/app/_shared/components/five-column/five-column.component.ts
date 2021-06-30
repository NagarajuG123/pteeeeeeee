import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-five-column',
  templateUrl: './five-column.component.html',
  styleUrls: ['./five-column.component.scss']
})
export class FiveColumnComponent implements OnInit {
  @Input() contents: any = [];
  @Input() slug: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
