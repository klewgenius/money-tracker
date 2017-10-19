import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  catalogs: Observable<any[]>;

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
    this.fbSvc.createBill(this.bill_name, this.bill_amount, this.bill_dueDate);
    this.bill_name = '';
    this.bill_amount = 0;
    this.bill_dueDate = null;
  }
}
