import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class FirebaseService implements OnDestroy {
  subscription: Subscription;

  public bills: any = [];
  public salary = 0;
  public title = '';
  public amount = 0;
  public pendingAmount = 0;
  public estimation = 0;
  public obResult = new Subject<any>();

  constructor(public db: AngularFireDatabase) {
    this.attachToChanges(0);
    this.buildLatest();
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.obResult.unsubscribe();
    this.subscription.unsubscribe();
  }

  buildLatest() {
    this.obResult.next({
      bills: this.bills,
      salary: this.salary,
      amount: this.amount,
      pendingAmount: this.pendingAmount,
      title: this.title,
      estimation: this.estimation
    });
  }
  whenCatalogChange(id) {
    return this.db.object('catalogs/' + id).valueChanges();
  }


  attachToChanges(id) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.whenCatalogChange(id).subscribe(
      this.ProcessResults
    );
  }

  ProcessResults = result => {
    this.bills = result['gastos'];
    this.salary = result['ingresos'];
    this.title = result['title'];
    this.amount = this.bills
      .filter(bill => bill.payed)
      .reduce((acc, bill) => acc + bill.amount, 0);

    this.pendingAmount = this.bills
      .filter(bill => !bill.payed)
      .reduce((acc, bill) => acc + bill.amount, 0);

    this.estimation = this.bills.reduce((acc, bill) => acc + bill.amount, 0);

    this.buildLatest();
  };

  ChangeSelected(id: string) {
    this.attachToChanges(id);
  }

  latestResults(): Observable<any> {
    return this.obResult.asObservable();
  }

  getCatalogs(): Observable<any[]> {
    return this.db.object('catalogs').valueChanges();
  }
}
