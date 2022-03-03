import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'defaultImage',
})
export class DefaultImagePipe implements PipeTransform {
  transform(value: any, width?: any, height?: any): string {
    let image = '';

    if (typeof value === 'undefined' || value === null) {
      return image;
    }
   
    if (typeof value.url.image_url !== 'undefined') {
      image = `${environment.imageResizeUrl}/fit-in/${width}x${height}/${value.url.path}`;
    } else {
      image = `${environment.imageResizeUrl}/fit-in/${width}x${height}/${value.path}`;
    }
    return image;
  }
}
