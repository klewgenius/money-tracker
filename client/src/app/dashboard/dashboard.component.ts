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

  constructor(public fbSvc: FirebaseService) {
    this.fbSvc.getUpdatedCatalog().subscribe(latest => {
      (this.bills = latest.bills),
        (this.amount = latest.amount),
        (this.pendingAmount = latest.pendingAmount),
        (this.estimation = latest.estimation),
        (this.salary = latest.salary),
        (this.title = latest.title);
    });
  }

  ngOnInit() {}
}
