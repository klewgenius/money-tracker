import { Injectable } from '@angular/core';
import { OCTUBRE } from '../historic/octubre2017';
import { NOVIEMBRE } from '../historic/noviembre2017';
import { DICIEMBRE } from '../historic/diciembre2017';
import { ENERO } from '../historic/enero2017';
import { COLEGIO } from '../historic/colegio';

@Injectable()
export class BillService {

  constructor() { }

  private obj = DICIEMBRE;

  getBills() {
    return this.obj.gastos;
    // return this.obj.presupuesto;
  }

  getSalary() {
    return this.obj.ingresos;
  }

  getTitle() {
    return this.obj.title;
  }
}
