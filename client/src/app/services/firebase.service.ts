import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class FirebaseService implements OnDestroy {
  public catalogDetails = new Subject<any>();
  public catalogs = new Subject<any>();

  private subscription: Subscription;
  private bills: any = [];
  private salary = 0;
  private title = '';
  private amount = 0;
  private pendingAmount = 0;
  private estimation = 0;
  private userId = '0';

  constructor(public db: AngularFireDatabase) {}
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.catalogDetails.unsubscribe();
    this.subscription.unsubscribe();
    this.catalogs.unsubscribe();
  }

  updateCatalog() {
    this.catalogDetails.next({
      bills: this.bills,
      salary: this.salary,
      amount: this.amount,
      pendingAmount: this.pendingAmount,
      title: this.title,
      estimation: this.estimation
    });
  }
  whenCatalogChange(id) {
    return this.db.object(this.userId + '/catalogs/' + id).valueChanges();
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

    this.updateCatalog();
  };

  ChangeSelected(id: string) {
    this.attachToChanges(id);
  }

  getUpdatedCatalog(): Observable<any> {
    return this.catalogDetails.asObservable();
  }

  connect(userId: string) {
      this.userExist(userId).subscribe(exist => {
        const userIdOrDefault = exist ? userId : '0';
        this.init(userIdOrDefault);
      });
  }

  disconnect() {
    this.catalogs.next([]);
  }

  userExist(userId): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.db
        .object(userId)
        .valueChanges()
        .subscribe(result => observer.next(result != null));
    });
  }

  init(userId) {
    this.userId = userId;
    this.attachToChanges(0);
    this.db.object(userId + '/catalogs').valueChanges()
    .subscribe(catalogs => this.catalogs.next(catalogs));
  }
}
