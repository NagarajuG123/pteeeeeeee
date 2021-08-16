import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public showmenu: boolean = false;

  constructor() {}
  toggle() {
    this.showmenu = !this.showmenu;
    window.scrollTo(0, 0);
    // if (this.isMenuOpen) {
    //   this.isMenuOpen = !this.isMenuOpen;
    // }
  }
}
