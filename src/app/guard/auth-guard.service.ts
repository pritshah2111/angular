import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})

/**
 *  Route is only open when user is authenticate or base on some condition.
 *  Check condition in if condition.
 **/
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    //check some condition
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
