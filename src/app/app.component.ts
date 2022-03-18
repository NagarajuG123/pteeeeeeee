import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { CommonService } from './_core/services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = '1851';
  constructor(public common: CommonService, private swUpdate: SwUpdate) {}

  public ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe(() => {
        // if (confirm('New version available. Load New Version?')) {
        window.location.reload();
        // }
      });
    }
  }
}
