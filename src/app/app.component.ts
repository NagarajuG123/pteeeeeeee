import { Component } from '@angular/core';
import { CommonService } from './_core/services/common.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = '1851';
  constructor(public common: CommonService) {}
}
