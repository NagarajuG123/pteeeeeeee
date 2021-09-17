import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

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
  formatDescription(description: any) {
    if (description && description.length > 118) {
      description = description.slice(0, 118) + '...';
    }
    return description;
  }

  responsiveTextFormating(text: String, textLength: number) {
    if (text && text.length > textLength) {
      text = text.slice(0, 118) + '...';
    }
    return text;
  }
}
