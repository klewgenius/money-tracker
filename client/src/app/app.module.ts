import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { ChartExampleComponent } from './chart-example/chart-example.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FirebaseService } from './services/firebase.service';
import { PayedPipe, NotPayedPipe } from './pipes/payed.pipe';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoginComponent } from './login/login.component';
import { AuthService } from './providers/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { FormsModule } from '@angular/forms';

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyClkpZ-kvJgLHdgayql9MJA1lXAVdj28fA',
  authDomain: 'money-tracker-klewgenius.firebaseapp.com',
  databaseURL: 'https://money-tracker-klewgenius.firebaseio.com',
  projectId: 'money-tracker-klewgenius',
  messagingSenderId: '1009722100689',
  storageBucket: 'money-tracker-klewgenius.appspot.com'
};


const appRoutes: Routes = [
  { path: '', component: DashboardComponent, canLoad: [AuthGuardService] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ChartExampleComponent,
    DashboardComponent,
    PayedPipe,
    NotPayedPipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule
  ],
  providers: [AngularFireDatabase, FirebaseService, AuthService, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
