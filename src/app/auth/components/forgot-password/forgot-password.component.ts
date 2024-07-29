import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ApiService } from '../../service/api.service';
import { Patterns } from 'src/app/helper/helper';
import { RequestI, ResponseI } from 'src/app/interfaces/api.interface';
import { API_END_POINTS } from 'src/app/helper/api.endpoints';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm!: FormGroup;
  getYear = new Date().getFullYear();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
      email_id: [
        null,
        [
          Validators.required,
          Validators.pattern(Patterns.email),
          Validators.maxLength(100),
          Validators.minLength(2),
        ],
      ],
    });
  }

  onSubmit() {
    this.forgotForm.markAllAsTouched();
    if (this.forgotForm.invalid) {
      return;
    }

    const payload: RequestI = {
      path: API_END_POINTS.forgotPassword,
      data: this.forgotForm.value,
    };

    this.apiService.post(payload).subscribe((response: ResponseI) => {
      this.router.navigate(['/login']);
      if (response.status == 200) {
        // this.toastr.success(response.message, 'Success');
      } else {
        this.toastr.error(response.message, 'Error');
      }
    });
  }
}
