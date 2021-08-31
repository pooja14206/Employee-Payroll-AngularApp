import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'repalce'
})
export class RepalcePipe implements PipeTransform {

  transform(value: any): any  {
    var datePipe = new DatePipe("en-US");
    value = datePipe.transform(value, 'dd MMM yyyy');
    return value; 
  }

}
