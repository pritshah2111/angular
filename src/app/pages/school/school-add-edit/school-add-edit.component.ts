import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/auth/service/api.service';
import { API_END_POINTS } from 'src/app/helper/api.endpoints';
import { Patterns } from 'src/app/helper/helper';
import { onlyWhitespaceValidator } from 'src/app/helper/validatorsNoWhiteSpace';
import { RequestI } from 'src/app/interfaces/api.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-school-add-edit',
  templateUrl: './school-add-edit.component.html',
  styleUrls: ['./school-add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolAddEditComponent implements OnInit {

  @ViewChild('multiSelect') multiSelect: any;

  schoolAddEditForm!: FormGroup;
  investorId: string = '';
  submitted = false;
  borrowerCompanyName: any = [];
  showCompany: boolean = false;
  companyNameInput = '';
  editFormData: any;
  countries: any = [];
  states: any = [];
  cities: any = [];
  allStdArray: any = [];
  selectedCountry: any;
  selectedState: any;
  selectedCity: any;
  selectedStdIds: any = [];
  imageURL: any;
  selectedImage: any;
  public settings = {};
  shipmentApprovalRights = [
    { id: true, title: 'Yes' },
    { id: false, title: 'No' },
  ];
  profileStatus = [
    { id: true, title: 'Active' },
    { id: false, title: 'Inactive' },
  ];
  imagePath: string = environment.assets_url;

  constructor(
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
  ) {
    this.createForm();
    this.loadCountries();
    this.activateRoute.params.subscribe((param: Params) => {
      if (param['id']) {
        this.investorId = param['id'];
        this.getSingleInvestorDetails();
      }
    });
  }

  get imageF() {
    return this.schoolAddEditForm.controls['image'] as FormControl;
  }

  ngOnInit(): void {
    this.settings = {
      singleSelection: false,
      idField: '_id',
      textField: 'stdName',
      enableCheckAll: true,
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 3,
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };

    this.createForm();
    this.getAllStdList();
  }

  createForm() {
    this.schoolAddEditForm = this.fb.group({
      schoolName: [
        '',
        [
          Validators.required,
          Validators.pattern(Patterns.only_string_name),
          onlyWhitespaceValidator(),
        ],
      ],
      email: ['', [Validators.required, Validators.pattern(Patterns.email)]],
      address: ['', [Validators.required]],
      image: ['', [Validators.required]],
      zipCode: [
        '',
        [Validators.required, Validators.pattern(Patterns.italianZip)],
      ],
      countryId: ['', [Validators.required]],
      cityId: ['', [Validators.required]],
      stateId: ['', [Validators.required]],
      stdIds: ['', [Validators.required]]
    });
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

  loadCountries() {
    const payload: RequestI = {
      path: API_END_POINTS.getAllCountries,
    };

    this.apiService.get(payload).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.countries = res.data;
      }
    });
  }

  getSingleInvestorDetails() {
    const request: RequestI = {
      path: API_END_POINTS.getSchoolDetail + this.investorId,
    };

    this.apiService.get(request).subscribe((res: any) => {
      if (res.data) {
        this.editFormData = res.data;
        this.schoolAddEditForm.patchValue({ ...res.data });
        this.schoolAddEditForm.patchValue({ countryId: res.data.countryDetail.id });
        this.schoolAddEditForm.patchValue({ image: res.data.image });
        this.onCountryChange(res.data.countryDetail.id);
        this.schoolAddEditForm.patchValue({ stdIds: res.data.stdDetail });
      }
    });
  }

  async onCountryChange(countryId: any) {
    const selectedCountryId = countryId.target ? countryId.target.value : countryId;

    // Find selected country
    const selectedCountry = this.countries.find((country: any) => country.id == selectedCountryId);
    if (selectedCountry) {
      this.selectedCountry = selectedCountry._id;
      // Fetch states for the selected country
      if (selectedCountryId) {
        const payload: RequestI = {
          path: API_END_POINTS.getAllStatesByCountry + `${selectedCountryId}`,
        };
        this.apiService.get(payload).subscribe((res: any) => {
          if (res.statusCode == 200) {
            this.states = [...res.data];
            this.cdr.detectChanges();

            if (this.editFormData) {
              this.schoolAddEditForm.patchValue({ stateId: this.editFormData.stateDetail?.id });
              this.onStateChange(this.editFormData.stateDetail?.id); // Call onStateChange directly with the stateId
              this.cdr.detectChanges();
            }
          }
        });
      }
    }
  }

  async onStateChange(stateId: any) {
    const selectedStateId = stateId.target ? stateId.target.value : stateId;

    // Find selected state
    const selectedState = this.states.find((state: any) => state.id == selectedStateId);
    if (selectedState) {
      this.selectedState = selectedState._id;

      // Fetch cities for the selected state
      if (selectedStateId) {
        const payload: RequestI = {
          path: API_END_POINTS.getAllCitiesByState + `${selectedStateId}`,
        };
        this.apiService.get(payload).subscribe(async (res: any) => {
          if (res.statusCode == 200) {
            this.cities = [...res.data];
            this.cdr.detectChanges();

            if (this.editFormData) {
              this.schoolAddEditForm.patchValue({ cityId: this.editFormData.cityDetail?.id });
              this.cdr.detectChanges();
              this.onCityChange();
            }
          }
        });
      }
    }
  }

  async onCityChange() {
    const selectedCity = this.cities.find((city: any) => city.id == this.schoolAddEditForm.value.cityId);
    if (selectedCity) {
      this.selectedCity = selectedCity._id;
      this.cdr.detectChanges();
    }
  }

  uploadImage() {
    if (this.selectedImage) {
      const formData = new FormData();
      formData.append('file', this.selectedImage);
      formData.append('moduleName', this.schoolAddEditForm.value.schoolName);

      const payload: RequestI = {
        path: API_END_POINTS.imageUpload,
        data: formData
      };

      this.apiService.post(payload).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.selectedImage = null;
          this.imageF.setValue(res.data.name);
        } else {
          console.error('Image upload failed');
        }
      });
    } else {
      console.error('No image selected.');
    }
  }

  submit() {
    this.submitted = true;
    if (this.schoolAddEditForm.invalid) {
      return;
    }

    this.schoolAddEditForm.value.stdIds.map((element: any) => {
      this.selectedStdIds.push(element._id);
    });

    const data: any = {
      schoolName: this.schoolAddEditForm.value.schoolName,
      email: this.schoolAddEditForm.value.email,
      address: this.schoolAddEditForm.value.address,
      zipCode: this.schoolAddEditForm.value.zipCode,
      countryId: this.selectedCountry,
      cityId: this.selectedCity,
      stateId: this.selectedState,
      stdIds: this.selectedStdIds,
      image: this.imageF.value
    };

    if (!this.investorId) {
      const payload: RequestI = {
        path: API_END_POINTS.createSchool,
        data: data,
      };

      this.apiService.post(payload).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.toastr.success(res.message, "Success");
          this.router.navigate(['/schools']);
        } else {
          this.toastr.error(res.message, 'Error');
        }
      });
    } else {
      data.email = this.schoolAddEditForm.value.email;
      const payload: RequestI = {
        path: API_END_POINTS.updateSchool + `${this.investorId}`,
        data: data,
      };

      this.apiService.patch(payload).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.toastr.success(res.message, "Success");
          this.router.navigate(['/schools']);
        } else {
          this.toastr.error(res.message, 'Error');
        }
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0] as File;
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedImage);
      reader.onload = (_event) => {
        this.imageURL = reader.result;
        this.uploadImage();
      }
    }
  }
}
