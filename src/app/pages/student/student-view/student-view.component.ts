import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Country } from 'country-state-city';
import { ApiService } from 'src/app/auth/service/api.service';
import { currencyArray } from 'src/app/common/common-const';
import { API_END_POINTS } from 'src/app/helper/api.endpoints';
import { Patterns } from 'src/app/helper/helper';
import { onlyWhitespaceValidator } from 'src/app/helper/validatorsNoWhiteSpace';
import { RequestI } from 'src/app/interfaces/api.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.scss'],
})
export class StudentViewComponent implements OnInit {
  studentsViewForm!: FormGroup;
  studentId: string = '';
  submitted = false;
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
  allSchoolArray: any;
  allStdArray: any;

  constructor(
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
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
  }

  createForm() {
    this.studentsViewForm = this.fb.group({
      firstName: [
        { value: '', disabled: true },
        [
          Validators.required,
          Validators.pattern(Patterns.only_string_name),
          onlyWhitespaceValidator(),
        ],
      ],
      lastName: [
        { value: '', disabled: true },
        [
          Validators.required,
          Validators.pattern(Patterns.only_string_name),
          onlyWhitespaceValidator(),
        ],
      ],

      schoolId: [{ value: '', disabled: true }, [Validators.required]],
      stdId: [{ value: '', disabled: true }, [Validators.required]],
      countryCode: [{ value: 'US', disabled: true }],
      parentNumber: [{ value: '', disabled: true }, [Validators.required]],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(Patterns.email)]],
      address: [{ value: '', disabled: true }, [Validators.required]],
      dob: [{ value: '', disabled: true }, [Validators.required]]
    });

    this.studentsViewForm.get('dob')!.valueChanges.subscribe(value => {
      // Value of the date of birth field
    });

  }
  ngOnInit(): void { }

  getAllStdList() {
    const payload: RequestI = {
      path: API_END_POINTS.getAllStdList,
    };

    this.apiService.get(payload).subscribe((res: any) => {
      console.log('res: ', res);
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
      console.log('res: ', res);
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
      console.log('res: ', res);
      if (res.data) {
        this.studentsViewForm?.patchValue({ ...res.data });
        this.studentsViewForm.patchValue({ countryCode: res.data.countryCode });
        this.studentsViewForm.patchValue({ email: res.data.userDetail.email });
        this.studentsViewForm.patchValue({ schoolId: res.data.schoolDetail._id });
        this.studentsViewForm.patchValue({ stdId: res.data.stdDetail._id });
      }
    });
  }
}
