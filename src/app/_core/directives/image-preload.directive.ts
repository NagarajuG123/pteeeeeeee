import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'img[appYoutubeImage]',
  host: {
    '(error)': 'updateUrl()',
    '[src]': 'src',
    '[srcset]': 'srcset',
  },
})
export class ImagePreloadDirective {
  constructor() {}
  @Input() src: string;
  @Input() srcset = '';

  updateUrl() {
    if (this.src != null && typeof this.src !== 'undefined') {
      if (this.src.includes('maxresdefault')) {
        this.src = this.src.replace(/maxresdefault/g, 'hqdefault');
      } else if (this.src.includes('sddefault')) {
        this.src = this.src.replace(/sddefault/g, 'hqdefault');
      } else if (this.src.includes('hqdefault')) {
        this.src = this.src.replace(/hqdefault/g, 'mqdefault');
      }
    }
    if (typeof this.srcset !== 'undefined' && this.srcset !== null) {
      if (this.srcset.includes('maxresdefault')) {
        this.srcset = this.srcset.replace(/maxresdefault/g, 'hqdefault');
      } else if (this.srcset.includes('sddefault')) {
        this.srcset = this.srcset.replace(/sddefault/g, 'hqdefault');
      } else if (this.srcset.includes('hqdefault')) {
        this.srcset = this.srcset.replace(/hqdefault/g, 'mqdefault');
      }
    } else {
      this.srcset = '';
    }
  }
}
