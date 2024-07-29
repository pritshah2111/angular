import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/app/auth/service/api.service';
import { API_END_POINTS } from 'src/app/helper/api.endpoints';
import { Patterns } from 'src/app/helper/helper';
import { onlyWhitespaceValidator } from 'src/app/helper/validatorsNoWhiteSpace';
import { RequestI } from 'src/app/interfaces/api.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-school-view',
  templateUrl: './school-view.component.html',
  styleUrls: ['./school-view.component.scss'],
})
export class SchoolViewComponent implements OnInit {
  schoolViewForm!: FormGroup;
  investorId: string = '';
  submitted = false;

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
  imageURL: any;
  selectedImage: any;
  countries: any = [];
  states: any = [];
  cities: any = [];
  allStdArray: any = [];
  selectedCountry: any;
  selectedState: any;
  selectedCity: any;
  selectedStdIds: any = [];
  editFormData: any;
  public settings = {};
  imagePath: string = environment.assets_url;

  constructor(
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) {
    this.createForm();
    this.loadCountries();
    this.activateRoute.params.subscribe((param: Params) => {
      if (param['id']) {
        this.investorId = param['id'];
        this.getSingleInvestorDetails();
      } else {
        this.investorId = '';
      }
    });
  }

  createForm() {
    this.schoolViewForm = this.fb.group({
      schoolName: [
        { value: '', disabled: true },
        [
          Validators.required,
          Validators.pattern(Patterns.only_string_name),
          onlyWhitespaceValidator(),
        ],
      ],
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.pattern(Patterns.email)],
      ],
      address: [{ value: '', disabled: true }, [Validators.required]],
      image: [{ value: '', disabled: true }, [Validators.required]],
      zipCode: [
        { value: '', disabled: true },
        [Validators.required, Validators.pattern(Patterns.italianZip)],
      ],
      countryId: [{ value: '', disabled: true }, [Validators.required]],
      cityId: [{ value: '', disabled: true }, [Validators.required]],
      stateId: [{ value: '', disabled: true }, [Validators.required]],
      stdIds: [{ value: '', disabled: true }, [Validators.required]],
    });
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

  async onCountryChange(countryId: any) {
    const selectedCountryId = countryId.target ? countryId.target.value : countryId;

    const selectedCountry = this.countries.find((country: any) => country.id == selectedCountryId);
    if (selectedCountry) {
      this.selectedCountry = selectedCountry._id;
      if (selectedCountryId) {
        const payload: RequestI = {
          path: API_END_POINTS.getAllStatesByCountry + `${selectedCountryId}`,
        };
        await this.apiService.get(payload).subscribe((res: any) => {
          if (res.statusCode == 200) {
            this.states = [...res.data];
            this.cdr.detectChanges();

            if (this.editFormData) {
              this.schoolViewForm?.patchValue({ stateId: this.editFormData.stateDetail?.id });
              this.onStateChange(this.editFormData.stateDetail?.id);
              this.cdr.detectChanges();
            }
          }
        });
      }
    }
  }

  async onStateChange(stateId: any) {
    const selectedStateId = stateId.target ? stateId.target.value : stateId;

    const selectedState = this.states.find((state: any) => state.id == selectedStateId);
    if (selectedState) {
      this.selectedState = selectedState._id;

      if (selectedStateId) {
        const payload: RequestI = {
          path: API_END_POINTS.getAllCitiesByState + `${selectedStateId}`,
        };
        this.apiService.get(payload).subscribe(async (res: any) => {
          if (res.statusCode == 200) {
            this.cities = [...res.data];
            this.cdr.detectChanges();

            if (this.editFormData) {
              this.schoolViewForm?.patchValue({ cityId: this.editFormData.cityDetail?.id });
              this.cdr.detectChanges();
              this.onCityChange();
            }
          }
        });
      }
    }
  }

  async onCityChange() {
    const selectedCity = this.cities.find((city: any) => city.id == this.schoolViewForm.value.cityId);
    if (selectedCity) {
      this.selectedCity = selectedCity._id;
      this.cdr.detectChanges();
    }
  }

  getSingleInvestorDetails() {
    const request: RequestI = {
      path: API_END_POINTS.getSchoolDetail + this.investorId,
    };

    this.apiService.get(request).subscribe(async (res: any) => {
      if (res.data) {
        this.editFormData = res.data;

        this.schoolViewForm?.patchValue({ ...res.data });
        this.schoolViewForm?.patchValue({ countryId: res.data.countryDetail.id });
        this.schoolViewForm?.patchValue({ image: res.data.image });
        await this.onCountryChange(res.data.countryDetail.id);
        this.schoolViewForm?.patchValue({ stdIds: res.data.stdDetail });
      }
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

  get imageF() {
    return this.schoolViewForm.controls['image'] as FormControl;
  }

  uploadImage() {
    if (this.selectedImage) {
      const formData = new FormData();
      formData.append('file', this.selectedImage);
      formData.append('moduleName', this.schoolViewForm.value.schoolName);

      const payload: RequestI = {
        path: API_END_POINTS.imageUpload,
        data: formData,
      };

      this.apiService.post(payload).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.selectedImage = null;
          this.imageF.setValue(res.data.name);
        }
      });
    } else {
      console.error('No image selected.');
    }
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0] as File;
    this.uploadImage();
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedImage);
    reader.onload = (_event) => {
      this.imageURL = reader.result;
    };
  }
}
