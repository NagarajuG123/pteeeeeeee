import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = '1851 Franchise';
  constructor(private router: Router, private swUpdate: SwUpdate) {}

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        // if (confirm('New version available. Load New Version?')) {
        window.location.reload();
        // }
      });
    }
  }
}
