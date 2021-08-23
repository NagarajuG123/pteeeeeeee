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
    window.scrollTo(0, 0);
    // if (this.isMenuOpen) {
    //   this.isMenuOpen = !this.isMenuOpen;
    // }
  }
  readMore1(story: any, type: string) {
    let slug = '';
    if (typeof story?.brand !== 'undefined' && story?.brand?.slug !== '1851') {
      slug = `${story?.brand?.slug}/`;
    }
    return `${slug}${story?.slug}#${type}`;
  }
  readMore(story: any) {
    let slug = '';
    if (typeof story?.brand !== 'undefined' && story?.brand?.slug !== '1851') {
      slug = `${story?.brand?.slug}/`;
    }
    return `${slug}${story?.slug}`;
  }
  isVideo(item: { media: { type: string } | null } | null) {
    if (typeof item !== 'undefined' && item !== null) {
      if (typeof item.media !== 'undefined' && item.media !== null) {
        if (item.media.type === 'video') {
          return true;
        }
      }
    }
    return false;
  }
  isBrand(item:any){
    let slug = '';
    if(typeof item?.slug !== 'undefined' && item?.slug !== '1851'){
      slug = `${item?.slug}/`;
    }
    return `${slug}`;
  }
  isBrandInfo(item:any){
    let slug = '';
    if(typeof item?.slug !== 'undefined' && item?.slug !== '1851'){
      slug = `${item?.slug}/`;
    }
    return `${slug}/info`;
  }
}
