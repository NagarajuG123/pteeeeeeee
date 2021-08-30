import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'defaultImage'
})
export class DefaultImagePipe implements PipeTransform {

  transform(value: any, width?: any, height?: any): string {
    let image = '';

    if (typeof value === 'undefined' || value === null) {
      return image;
    }
    if (value.type === 'Image' || value.type === 'image') {
      if (typeof value.url.image_url !== 'undefined') {
        image = `${environment.imageResizeUrl}/insecure/fill/${width}/${height}/sm/0/plain/${value.url.image_url}`;
      } else {
        image = `${environment.imageResizeUrl}/insecure/fill/${width}/${height}/sm/0/plain/${value.url}`;
      }
    }
    if (
      value.type === 'VideoURL' ||
      value.type === 'Video' ||
      value.type === 'video'
    ) {
      image = `${environment.imageResizeUrl}/insecure/fill/${width}/${height}/sm/0/plain/${value.placeholder}`;
    }
    return image;
  }

}
