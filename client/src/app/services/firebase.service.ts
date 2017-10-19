import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subscription, ISubscription } from 'rxjs/Subscription';

@Injectable()
export class FirebaseService implements OnDestroy {
  public catalogDetails = new Subject<any>();
  public catalogs = new Subject<any>();

  private unsubscribeEvent: Subject<any> = new Subject();
  private bills: any = [];
  private salary = 0;
  private title = '';
  private amount = 0;
  private pendingAmount = 0;
  private estimation = 0;

  private userId = '0';
  private catalogId = '0';

  constructor(public db: AngularFireDatabase) {}

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.unsubscribeEvent.next();
    this.unsubscribeEvent.complete();
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

  attachToChanges(id) {
    this.catalogId = id;
    this.db
      .object(this.userId + '/catalogs/' + id)
      .valueChanges()
      .takeUntil(this.unsubscribeEvent)
      .subscribe(result => {
        this.ProcessResults(result);
        this.updateCatalog();
      });
  }

  ProcessResults(result) {
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
  }

  changeCatalog(id: string) {
    this.unsubscribeEvent.next(); // unsubscribe
    this.attachToChanges(id);
  }

  getUpdatedCatalog(): Observable<any> {
    return this.catalogDetails.asObservable();
  }

  setPayed(billId, value) {
    this.db
      .object(this.userId + '/catalogs/' + this.catalogId + '/gastos/' + billId)
      .update({
        payed: value
      })
      .then(
        result => console.log(result)
      );
  }

  // todo: return promise with true/false
  createBill(name, amount, dueDate) {

    this.bills.push({
      name: name,
      amount: amount,
      payed: false
    });

    this.db
      .object(this.userId + '/catalogs/' + this.catalogId + '/gastos')
      .update(this.bills)
      .then(
        r => console.log('createBill success!')
      );

  }

  connect(userId: string) {
    this.userExist(userId).subscribe(exist => {
      console.log('FirebaseService - connect() UserExist: ' + exist);

      const userIdOrDefault = exist ? userId : '0';
      this.init(userIdOrDefault);
    });
  }

  disconnect() {
    this.unsubscribeEvent.next();
    this.catalogs.next([]);
  }

  userExist(userId): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.db
        .object(userId)
        .valueChanges()
        .first()
        .subscribe(result => observer.next(result != null));
    });
  }

  private init(userId) {
    this.userId = userId;
    this.attachToChanges(0);
    this.db
      .object(userId + '/catalogs')
      .valueChanges()
      .takeUntil(this.unsubscribeEvent)
      .subscribe(catalogs => this.catalogs.next(catalogs));
  }
}
