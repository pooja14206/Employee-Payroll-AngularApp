import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceCurrency'
})
export class ReplaceCurrencyPipe implements PipeTransform {

  transform(val: number): any {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(Number(val));
   
  }

}
