import { Injectable } from '@angular/core';

import { AngularFireAuth, AngularFireAuthProvider } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  constructor(public af: AngularFireAuth) {}

  loginWithGoogle() {
    return this.af.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider
    );
  }

  logout() {
    return this.af.auth.signOut();
  }

  isLoggedIn() {
    return this.af.auth.currentUser != null;
  }
}
