import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FiveColumn } from 'src/app/_core/models/five';

@Component({
  selector: 'app-five-column',
  templateUrl: './five-column.component.html',
  styleUrls: ['./five-column.component.scss']
})
export class FiveColumnComponent implements OnInit {
  @Input() contents: FiveColumn[] = [];
  @Input() slug: string = '';
  @Input() type = '';
  @Input() hasMore = false;
  @Output() more = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  getMoreData() {
    this.more.emit('');
  }
}
