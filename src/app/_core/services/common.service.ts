import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public showmenu: boolean = false;
  // public isMenuOpen: boolean = true;
  constructor() {}

  toggle() {
    this.showmenu = !this.showmenu;
    // if (this.isMenuOpen) {
    //   this.isMenuOpen = !this.isMenuOpen;
    // }
  }
}
