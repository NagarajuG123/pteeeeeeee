import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_core/services/common.service';

@Component({
  selector: 'app-layout-three',
  templateUrl: './layout-three.component.html',
  styleUrls: ['./layout-three.component.scss']
})
export class LayoutThreeComponent implements OnInit {
  @Input() class: string;
  @Input() widget: any;

  constructor(public commonService: CommonService) { }

  ngOnInit(): void {
  }

}
