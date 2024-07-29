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
  selector: 'app-standard-view',
  templateUrl: './standard-view.component.html',
  styleUrls: ['./standard-view.component.scss'],
})
export class StandardViewComponent implements OnInit {
  standardViewForm!: FormGroup; // FormGroup to handle the form
  studentId: string = ''; // ID of the current student
  submitted = false; // Flag to indicate form submission status

  countries = Country.getAllCountries(); // List of all countries
  cities: any; // List of cities
  shipmentApprovalRights = [
    { id: true, title: 'Yes' },
    { id: false, title: 'No' },
  ]; // Approval rights options
  profileStatus = [
    { id: true, title: 'Active' },
    { id: false, title: 'Inactive' },
  ]; // Profile status options

  @ViewChild('country') country: ElementRef | any; // Reference to country input
  @ViewChild('city') city: ElementRef | any; // Reference to city input

  allSchoolArray: any; // Array to hold school list
  allStdArray: any; // Array to hold standard list

  constructor(
    private fb: FormBuilder, // Form builder for reactive forms
    private activateRoute: ActivatedRoute, // Activated route to access route parameters
    private router: Router, // Router to navigate
    private apiService: ApiService, // API service to make HTTP requests
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

  /**
   * Creates the form with initial validation and values
   */
  createForm() {
    this.standardViewForm = this.fb.group({
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
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.pattern(Patterns.email)],
      ],
      address: [{ value: '', disabled: true }, [Validators.required]],
      dob: [{ value: '', disabled: true }, [Validators.required]],
    });

    this.standardViewForm.get('dob')!.valueChanges.subscribe((value) => {
      // Value of the date of birth field
    });
  }

  ngOnInit(): void { }

  /**
   * Fetches the list of all standards from the API
   */
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

  /**
   * Fetches the list of all schools from the API
   */
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

  /**
   * Fetches the details of a single investor (student) from the API
   * and patches the form with the retrieved data
   */
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
        this.standardViewForm?.patchValue({ ...res.data });
        this.standardViewForm.patchValue({ countryCode: res.data.countryCode });
        this.standardViewForm.patchValue({ email: res.data.userDetail.email });
        this.standardViewForm.patchValue({ schoolId: res.data.schoolDetail._id });
        this.standardViewForm.patchValue({ stdId: res.data.stdDetail._id });
      }
    });
  }
}
