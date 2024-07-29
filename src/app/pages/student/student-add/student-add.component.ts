import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Country } from 'country-state-city';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/auth/service/api.service';
import { currencyArray } from 'src/app/common/common-const';
import { API_END_POINTS } from 'src/app/helper/api.endpoints';
import { Patterns } from 'src/app/helper/helper';
import { onlyWhitespaceValidator } from 'src/app/helper/validatorsNoWhiteSpace';
import { RequestI } from 'src/app/interfaces/api.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.scss'],
})
export class StudentAddComponent implements OnInit {
  studentAddForm!: FormGroup;
  studentId: string = '';
  submitted = false;
  borrowerCompanyName: any = [];

  countries = Country.getAllCountries();
  cities: any;
  shipmentApprovalRights = [
    { id: true, title: 'Yes' },
    { id: false, title: 'No' },
  ];
  profileStatus = [
    { id: true, title: 'Active' },
    { id: false, title: 'Inactive' },
  ];
  @ViewChild('country') country: ElementRef | any;
  @ViewChild('city') city: ElementRef | any;

  showCompany: boolean = false;
  companyNameInput = '';

  allSchoolArray: any;
  allStdArray: any;

  maxDob: Date;

  constructor(
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
  ) {
    this.createForm();
    this.activateRoute.params.subscribe((param: Params) => {
      if (param['id']) {
        this.studentId = param['id'];
        this.getSingleInvestorDetails();
      } else {
        this.studentId = '';
      }
    });
    const today = new Date();
    this.maxDob = new Date(
      today.getFullYear() - 6,
      today.getMonth(),
      today.getDate()
    );
  }

  createForm() {
    this.studentAddForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.pattern(Patterns.only_string_name),
          onlyWhitespaceValidator(),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.pattern(Patterns.only_string_name),
          onlyWhitespaceValidator(),
        ],
      ],
      schoolId: ['', [Validators.required]],
      stdId: ['', [Validators.required]],
      countryCode: ['us'],
      parentNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(Patterns.email)]],
      address: ['', [Validators.required]],
      dob: ['', [Validators.required]]
    });

    this.studentAddForm.get('dob')!.valueChanges.subscribe(value => {
      // Value of the date of birth field
    });

  }

  ngOnInit(): void {
    this.getAllSchoolList();
    this.getAllStdList();
  }

  getAllStdList() {
    const payload: RequestI = {
      path: API_END_POINTS.getAllStdList,
    };

    this.apiService.get(payload).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.allStdArray = res.data;
      } else {
        this.allStdArray = [];
      }
    });
  }

  getAllSchoolList() {
    const payload: RequestI = {
      path: API_END_POINTS.getAllSchoolList,
    };

    this.apiService.get(payload).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.allSchoolArray = res.data;
      } else {
        this.allSchoolArray = [];
      }
    });
  }

  getSingleInvestorDetails() {
    const request: RequestI = {
      path: API_END_POINTS.getStudentDetail + this.studentId,
      data: {
        id: this.studentId,
      },
    };
    this.apiService.get(request).subscribe((res: any) => {
      if (res.data) {
        this.studentAddForm?.patchValue({ ...res.data });
        this.studentAddForm.patchValue({ countryCode: res.data.countryCode});
        this.studentAddForm.patchValue({ parentNumber: res.data.parentNumber });
        this.studentAddForm.patchValue({ email: res.data.userDetail.email });
        this.studentAddForm.patchValue({ schoolId: res.data.schoolDetail._id });
        this.studentAddForm.patchValue({ stdId: res.data.stdDetail._id });
      }
    });
  }

  submit() {
    this.submitted = true;
    if (this.studentAddForm.invalid) {
      return;
    }

    const data: any = {
      schoolId: this.studentAddForm.value.schoolId,
      stdId: this.studentAddForm.value.stdId,
      firstName: this.studentAddForm.value.firstName,
      lastName: this.studentAddForm.value.lastName,
      parentNumber: this.studentAddForm.value.parentNumber.number,
      countryCode: this.studentAddForm.value.parentNumber.countryCode,
      address: this.studentAddForm.value.address,
      dob: this.studentAddForm.value.dob,
    };

    if (this.studentId) {
      const payload: RequestI = {
        path: API_END_POINTS.updateStudent + this.studentId,
        data: data,
      };

      this.apiService.patch(payload).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.toastr.success(
            res.message, "Success"
          );
          this.router.navigate(['/students']);
        } else {
          this.toastr.error(res.message, 'Error');
        }
      });
    } else {
      data.email = this.studentAddForm.value.email;
      const payload: RequestI = {
        path: API_END_POINTS.createStudent,
        data: data,
      };

      this.apiService.post(payload).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.toastr.success(
            res.message, "Success"
          );
          this.router.navigate(['/students']);
        } else {
          this.toastr.error(res.message, 'Error');
        }
      });
    }
  }
}
