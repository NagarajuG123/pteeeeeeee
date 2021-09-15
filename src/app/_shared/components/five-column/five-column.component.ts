import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonService } from 'src/app/_core/services/common.service';

@Component({
  selector: 'app-five-column',
  templateUrl: './five-column.component.html',
  styleUrls: ['./five-column.component.scss'],
})
export class FiveColumnComponent implements OnInit {
  @Input() contents: any;
  @Input() slug: string = '';
  @Input() type = '';
  @Input() hasMore = false;
  @Input() typeSlug!: string;
  @Output() more = new EventEmitter();

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {}
  getMoreData() {
    this.more.emit('');
  }
  readMore(item: any) {
    return this.commonService.readMore(item);
  }
}
