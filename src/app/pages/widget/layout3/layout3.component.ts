import { Component, Input, OnInit } from '@angular/core';
import { Details } from 'src/app/_core/models/details.model';
import { CommonService } from 'src/app/_core/services/common.service';

@Component({
  selector: 'app-layout3',
  templateUrl: './layout3.component.html',
  styleUrls: ['./layout3.component.scss']
})
export class Layout3Component implements OnInit {
 @Input() type: string;
 @Input() class: string;
 @Input() widget: string;
 @Input() stories: Details[] =[];
  constructor(public commonService: CommonService) { }

  ngOnInit(): void {
    console.log(this.widget);
  }

}
