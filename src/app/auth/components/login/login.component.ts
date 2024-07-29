import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ApiService } from '../../service/api.service';
import { Patterns } from 'src/app/helper/helper';
import { RequestI, ResponseI } from 'src/app/interfaces/api.interface';
import { API_END_POINTS } from 'src/app/helper/api.endpoints';
import { ToastrService } from 'ngx-toastr';
import { TOKEN_STORAGE_KEY, USER_DETAILS } from 'src/app/common/common-const';
import { checkPasswordValidation } from 'src/app/helper/validators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  hide = true;
  isAuthenticated: boolean | undefined;
  getYear = new Date().getFullYear();
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('authToken');
    console.log('token: ', token);
    if (token) {
      this.router.navigate(['/dashboard']);
    }
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(Patterns.email)]],
      password: [null, [Validators.required, checkPasswordValidation]],
      rememberMe: [false],
    });
    this.loadRememberMeValue();
  }

  loadRememberMeValue() {
    const rememberMe = localStorage.getItem('rememberMe');
    const email = localStorage.getItem('rememberMeEmail');
    const password = localStorage.getItem('rememberMePassword');

    this.loginForm.patchValue({
      email: email,
      password: password,
      rememberMe: rememberMe,
    });
  }

  rememberMeCheck() {
    if (!this.loginForm.value.rememberMe) {
      this.authService.forgetUser();
    }
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }

    let Data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    const payload: RequestI = {
      path: API_END_POINTS.login,
      data: Data,
    };

    if (this.loginForm.value.rememberMe) {
      this.authService.login(
        this.loginForm.value.email,
        this.loginForm.value.password,
        this.loginForm.value.rememberMe,
      );
    } else {
      this.authService.forgetUser();
    }
    this.apiService.post(payload).subscribe((response: any) => {
      console.log('response: ', response);
      if (response.statusCode == 200) {
        let loginData = response.data;
        console.log('loginData: ', loginData);
        localStorage.setItem(TOKEN_STORAGE_KEY, response.accessToken);
        console.log('localStorage: ', localStorage);
        delete loginData.accessToken;
        localStorage.setItem(USER_DETAILS, JSON.stringify(loginData));
        // if (response.data.user_type == 1) {
        this.router.navigate(['/dashboard']);
        // } else {
        //   this.router.navigate(['/investors/shipment-list']);
        // }
        // this.toastr.success(response.message, 'Success');
      } else {
        this.toastr.error(response.message, 'Error');
      }
    });
  }
}
