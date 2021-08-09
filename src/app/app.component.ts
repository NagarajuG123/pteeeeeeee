import { Component, OnInit } from '@angular/core';
import { CommonService } from './_core/services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = '1851';
  constructor(public common: CommonService) {}

  public ngOnInit(): void {}
}
