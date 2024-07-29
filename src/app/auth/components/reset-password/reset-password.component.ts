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
import { ApiService } from '../../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { API_END_POINTS } from 'src/app/helper/api.endpoints';
import { RequestI, ResponseI } from 'src/app/interfaces/api.interface';
import { ToastrService } from 'ngx-toastr';
import { Patterns } from 'src/app/helper/helper';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  submit = false;
  getYear = new Date().getFullYear();
  id = '';
  token = '';
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.token = params['token'];
    });
  }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group(
      {
        password: ['', [Validators.required, checkPasswordValidation]],
        password_confirmation: ['', [Validators.required]],
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
    this.submit = true;
    if (this.resetPasswordForm.invalid) {
      return;
    }

    const formData: FormData = new FormData();
    formData.append('id', this.id); // Replace with form values
    formData.append('token', this.token); // Replace with form values
    formData.append('pwd', this.resetPasswordForm.value.password);

    const payload: RequestI = {
      path: API_END_POINTS.setNewPassword,
      data: formData,
    };

    this.apiService.post(payload).subscribe((response: ResponseI) => {
      this.toastr.success(response.data, 'Success');
      if (response.status == 200) {
        this.router.navigate(['login']);
      }
    });
  }
}
