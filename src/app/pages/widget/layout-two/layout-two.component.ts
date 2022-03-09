import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_core/services/common.service';

@Component({
  selector: 'app-layout-two',
  templateUrl: './layout-two.component.html',
  styleUrls: ['./layout-two.component.scss']
})
export class LayoutTwoComponent implements OnInit {
  @Input() class: string;
  @Input() widget: any;

  constructor(public commonService: CommonService) { }

  ngOnInit(): void {
  }

}
