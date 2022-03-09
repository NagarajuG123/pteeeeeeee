import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_core/services/common.service';

@Component({
  selector: 'app-layout-one',
  templateUrl: './layout-one.component.html',
  styleUrls: ['./layout-one.component.scss']
})
export class LayoutOneComponent implements OnInit {
  @Input() class: string;
  @Input() widget: any;
  @Input() fragment: string;
  constructor( public commonService: CommonService) { }

  ngOnInit(): void {
  }

}
