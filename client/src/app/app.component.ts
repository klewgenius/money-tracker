import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { Observable } from 'rxjs/Observable';

declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {

  catalogs: Observable<any[]>;

  constructor(public db: FirebaseService) {
    this.catalogs = this.db.getCatalogs();
  }

  ngAfterViewInit() {
    // Workaround for metis plugin.
    (<any>$('#side-menu')).metisMenu();
  }

  setTarget(id) {
    this.db.ChangeSelected(id);
  }
}
