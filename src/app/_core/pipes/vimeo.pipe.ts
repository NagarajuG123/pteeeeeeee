import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'vimeo',
})
export class VimeoPipe implements PipeTransform {
  constructor(protected _sanitizer: DomSanitizer) {}

  transform(value: any, args?: any): any {
    let url;
    if (value.indexOf('player') !== -1) {
      url = value;
    } else {
      let url = value.replace('vimeo.com/', 'player.vimeo.com/video/');
    }
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
