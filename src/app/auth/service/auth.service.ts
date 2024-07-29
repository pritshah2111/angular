import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FORWARD_SHIPPING_DETAILS, RISK_DETAILS, RISK_SHIPPING_DETAILS, SHIPPING_DETAILS } from 'src/app/common/common-const';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {
    this.checkRememberMe();
  }

  isLoggedIn() {
    return localStorage.getItem('authToken') !== null;
  }

  login(email: string, password: string, rememberMe: boolean) {
    // Remember the user if "Remember Me" is checked
    if (rememberMe) {
      this.rememberUser(email, password);
    }
  }

  logout() {
    this.clearDetails();
    this.router.navigate(['/']);
  }

  rememberUser(email: string, password: string): void {
    localStorage.setItem('rememberMe', 'true');
    localStorage.setItem('rememberMeEmail', email);
    localStorage.setItem('rememberMePassword', password);
  }

  forgetUser(): void {
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('rememberMeEmail');
    localStorage.removeItem('rememberMePassword');
  }

  clearDetails(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userDetails');
    localStorage.removeItem(SHIPPING_DETAILS);
    localStorage.removeItem(FORWARD_SHIPPING_DETAILS);
    localStorage.removeItem(RISK_SHIPPING_DETAILS);
    localStorage.removeItem(RISK_DETAILS);
  }

  checkRememberMe(): void {
    // Check if the user wants to be remembered (e.g., stored in local storage)
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    if (rememberMe) {
    }
  }
}
