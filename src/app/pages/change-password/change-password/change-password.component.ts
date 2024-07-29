import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  ConfirmPasswordValidator,
  checkPasswordValidation,
} from 'src/app/helper/validators';
import { Router } from '@angular/router';
import { API_END_POINTS } from 'src/app/helper/api.endpoints';
import { RequestI, ResponseI } from 'src/app/interfaces/api.interface';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/auth/service/api.service';
import { Patterns } from 'src/app/helper/helper';
import { AuthService } from 'src/app/auth/service/auth.service';
import { USER_DETAILS } from 'src/app/common/common-const';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  hide = true;
  new_password = true;
  conf_password = true;
  userDetails: any;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    const userDetailsString = localStorage.getItem(USER_DETAILS);
    if (userDetailsString) {
      this.userDetails = JSON.parse(userDetailsString);
    }
    this.resetPasswordForm = this.formBuilder.group(
      {
        old_password: [null, [Validators.required, checkPasswordValidation]],
        password: [null, [Validators.required, checkPasswordValidation]],
        password_confirmation: [null, [Validators.required]],
      },
      {
        validators: ConfirmPasswordValidator(
          'password',
          'password_confirmation',
        ),
      },
    );
  }

  submitResetPassword() {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    const data = {
      id: this.userDetails._id,
      currentPassword: this.resetPasswordForm.value.old_password,
      newPassword: this.resetPasswordForm.value.password,
    };
    const payload: RequestI = {
      path: API_END_POINTS.changePassword,
      data: data,
    };

    this.apiService.post(payload).subscribe((response: any) => {
      if (response.statusCode == 200) {
        this.toastr.success(response.message, 'Success');
        this.resetPasswordForm.reset();
        this.authService.logout();
      }
    });
  }
}
