import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitArray'
})
export class SplitArrayPipe implements PipeTransform {

  transform(value: any, howMany: number): any {
    const data = JSON.parse(JSON.stringify(value));
    const result = [];
    while (data[0]) {
      result.push(data.splice(0, howMany));
    }
    return result;
  }
}

