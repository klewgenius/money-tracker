import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'payed'
})
export class PayedPipe implements PipeTransform {

  transform(bills: any[]) {
    return bills.filter(bill => bill.payed);
  }

}

@Pipe({
  name: 'notPayed'
})
export class NotPayedPipe implements PipeTransform {

  transform(bills: any[]) {
    return bills.filter(bill => !bill.payed);
  }

}
