import { Component, OnInit } from '@angular/core';
import { CommonService } from './_core/services/common.service';
import { SwUpdate } from '@angular/service-worker';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = '1851';
  constructor(
    public common: CommonService,
    private swUpdate: SwUpdate,
    public swPush: SwPush
  ) {}

  public ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe((evt) => {
        // if (confirm('New version available. Load New Version?')) {
        //   window.location.reload(true);
        //   }
        console.log('Site updated', new Date());
        history.go(0);
      });
    }
  }
}
