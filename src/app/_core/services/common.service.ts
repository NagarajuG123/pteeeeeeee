import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public showmenu: boolean = false;
  public vtabsItem: number = 5;
  isBrowser: boolean = false;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.resizeSidebar(window.innerWidth);
    }
  }

  toggle() {
    this.showmenu = !this.showmenu;
    window.scrollTo(0, 0);
    // if (this.isMenuOpen) {
    //   this.isMenuOpen = !this.isMenuOpen;
    // }
  }

  resizeSidebar(val: any) {
    if (val > 992) this.vtabsItem = 5;
    else if (val < 993 && val > 767) this.vtabsItem = 3;
    else if (val < 768 && val > 575) this.vtabsItem = 2;
    else if (val < 576) this.vtabsItem = 1;
    else this.vtabsItem = 5;
  }

  formatTitle(title: any) {
    if (title && title.length > 40) {
      title = title.slice(0, 50) + '...';
    }
    return title;
  }
}
