import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public showmenu: boolean = false;
  public vtabsItem: number = 5;

  constructor() {
    this.resizeSidebar(window.innerWidth);
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
}
