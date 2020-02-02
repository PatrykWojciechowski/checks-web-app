import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'absValue'
})
export class AbsValuePipe implements PipeTransform {

  transform(value: any): any {
    return Math.abs(value);
  }

}
