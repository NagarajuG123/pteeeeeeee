import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_core/services/common.service';

@Component({
  selector: 'app-info-top',
  templateUrl: './info-top.component.html',
  styleUrls: ['./info-top.component.scss'],
})
export class InfoTopComponent implements OnInit {
  @Input('data') data: any = [];
  @Input('brandSlug') brandSlug = '1851';
  @Input('type') type = '';
  constructor(private commonService: CommonService) {}

  ngOnInit(): void { }
   isVideo(item: any) {
    return this.commonService.isVideo(item);
 }
}
