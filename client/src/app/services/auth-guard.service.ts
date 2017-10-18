import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { AuthService } from '../providers/auth.service';

@Injectable()
export class AuthGuardService {
  constructor() {}

  canLoad(route: Route, auth: AuthService): boolean {
    return auth.isLoggedIn();
  }
}
