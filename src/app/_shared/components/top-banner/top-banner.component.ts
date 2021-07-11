import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  SimpleChange,
} from '@angular/core';
import { FiveColumn } from 'src/app/_core/models/five';

@Component({
  selector: 'app-top-banner',
  templateUrl: './top-banner.component.html',
  styleUrls: ['./top-banner.component.scss'],
})
export class TopBannerComponent implements OnInit {
  @Input() data: any = [];
  @Input() title: any;
  constructor() {}

  ngOnInit(): void {}

  // ngOnChanges(changes: SimpleChanges) {
  //   const data: SimpleChange = changes.data;

  //   if (
  //     typeof data.currentValue !== 'undefined' &&
  //     typeof data.currentValue.media !== 'undefined'
  //   ) {
  //     this.data = data.currentValue;
  //   }
  // }
}
