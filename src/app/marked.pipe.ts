import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'marked'
})
export class MarkedPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
