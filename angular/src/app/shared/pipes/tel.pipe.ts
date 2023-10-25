import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'tel'
})
export class TelPipe implements PipeTransform {

  transform(value: number|string, ...args: unknown[]): string {
    let str = "" + value;
    str = "+" + str.substring(0,1) + " (" + str.substring(1,4) + ") " + str.substring(4,7)+"-"+str.substring(7,9)+"-"+str.substring(9,11);
    return str;
  }

}
