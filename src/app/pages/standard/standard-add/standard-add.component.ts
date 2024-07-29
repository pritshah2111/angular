import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/auth/service/api.service';
import { API_END_POINTS } from 'src/app/helper/api.endpoints';
import { RequestI } from 'src/app/interfaces/api.interface';

@Component({
  selector: 'app-standard-add',
  templateUrl: './standard-add.component.html',
  styleUrls: ['./standard-add.component.scss'],
})
export class StandardAddComponent implements OnInit {
  addStdForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<StandardAddComponent>,
  ) {
    this.addStdForm = this.formBuilder.group({
      stdName: ['', [Validators.required]],
    });
  }

  ngOnInit(): void { }

  closeModal() {
    this.dialogRef.close();
  }

  submit() {
    this.submitted = true;
    if (this.addStdForm.invalid) {
      return;
    }

    const data = {
      stdName: this.addStdForm.value.stdName,
    };

    const payload: RequestI = {
      path: API_END_POINTS.addStd,
      data: data,
    };

    this.apiService.post(payload).subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.toastr.success(res.message, "Success");
        this.closeModal();
      } else {
        this.toastr.error(res.message, 'Error');
      }
    });
  }
}
