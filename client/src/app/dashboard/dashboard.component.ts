import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  bills: any = [];
  amount = 0;
  pendingAmount = 0;
  estimation = 0;
  salary = 0;
  title = '';

  // create new component for this.
  bill_name: string;
  bill_amount: number;
  bill_dueDate: Date;
  bill_id: number;
  bill_payed: boolean;

  constructor(public fbSvc: FirebaseService) {
    this.fbSvc.getUpdatedCatalog().subscribe(latest => {
      console.log('DashboardComponent - getUpdatedCatalog fired! ');
      console.log(latest);

      (this.bills = latest.bills),
        (this.amount = latest.amount),
        (this.pendingAmount = latest.pendingAmount),
        (this.estimation = latest.estimation),
        (this.salary = latest.salary),
        (this.title = latest.title);
    });
  }

  ngOnInit() {}

  pay(index) {
    this.fbSvc.setPayed(index, true);
  }

  unPayed(index) {
    this.fbSvc.setPayed(index, false);
  }

  newBill() {
    this.fbSvc
      .createOrUpdateBill(
        this.bill_id,
        this.bill_name,
        this.bill_amount,
        this.bill_dueDate,
        this.bill_payed
      )
      .subscribe(result => {
        if (result === false) {
          alert('Ocurrió un error intentando guardar.');
        } else {
          this.resetForm();
        }
      });
  }

  openBillInModal(id) {
    if (id) {
      this.bill_id = id;
      this.bill_name = this.bills[id].name;
      this.bill_amount = this.bills[id].amount;
      this.bill_payed = this.bills[id].payed;
    } else {
      this.resetForm();
    }
  }

  deleteBill() {
    if (confirm('Está seguro?')) {
      this.fbSvc.deleteBill(this.bill_id).subscribe(result => {
        if (result === false) {
          alert('Ocurrió un error intentando guardar.');
        } else {
          this.resetForm();
        }
      });
    }
  }

  saveBill() {
    this.fbSvc
      .createOrUpdateBill(
        this.bill_id,
        this.bill_name,
        this.bill_amount,
        this.bill_dueDate,
        this.bill_payed
      )
      .subscribe(result => {
        if (result === false) {
          alert('Ocurrió un error intentando guardar.');
        } else {
          this.resetForm();
        }
      });
  }

  saveAndPay() {

    this.bill_payed = true;
    this.saveBill();

  }

  resetForm() {
    this.bill_id = 0;
    this.bill_name = '';
    this.bill_amount = 0;
    this.bill_dueDate = null;
    this.bill_payed = false;
  }
}
