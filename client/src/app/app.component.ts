import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthService } from './providers/auth.service';

declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
  catalogs: any[];

  constructor(
    public db: FirebaseService,
    private authService: AuthService,
    private router: Router
  ) {

    this.db.catalogs
    .subscribe(cat => this.catalogs = cat);

    this.authService.af.auth.onAuthStateChanged(user => {
      if (user == null) {
        console.log('Logged out');
        this.db.disconnect();
        this.router.navigate(['login']);
      } else {

        this.db.connect(user.uid);

        console.log('Logged in');
        console.log(user.uid);
        this.router.navigate(['']);
      }
    });
  }

  ngAfterViewInit() {
    // Workaround for metis plugin.
    (<any>$('#side-menu')).metisMenu();
  }

  setTarget(id) {
    this.db.changeCatalog(id);
  }

  logout() {
    this.db.disconnect();
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
