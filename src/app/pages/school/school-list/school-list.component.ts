import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { RequestI } from 'src/app/interfaces/api.interface';
import { API_END_POINTS } from 'src/app/helper/api.endpoints';
import { ApiService } from 'src/app/auth/service/api.service';
import { DeletePopupComponent } from 'src/app/common/delete-popup/delete-popup.component';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ExcelService } from 'src/app/auth/service/excel-csv.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolListComponent implements OnInit {
  searchBox: FormControl = new FormControl('');
  shouldShow: boolean = false;
  displayedColumns: string[] = [
    'schoolName',
    'email',
    'city',
    'state',
    'country',
    'zipcode',
    'Action',
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  masterListDetailData: any = [];
  paramId: any;
  pageLimit: number = 10;
  pageIndex: number = 0;
  pageSizeOptions = [10, 25, 50, 100];
  masterListDetailCount: number = 0;
  sortingFieldName = '';
  directionFieldName: string = '';
  selectedCity: any;
  addSchoolForm: any;
  allCityArray: any = [];

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private apiService: ApiService,
    private toastr: ToastrService,
    private excelService: ExcelService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
  ) {
    this.route.queryParams.subscribe((params) => {
      this.paramId = params['masterType'];
      this.getInvestorDetailList();
    });

    this.dataSource = new MatTableDataSource(this.masterListDetailData);
  }

  ngOnInit(): void {
    this.addSchoolForm = this.formBuilder.group({
      commodity_sector: [''],
    });

    this.getSearchResult();
    this.getAllCityList();
  }

  getAllCityList() {
    const payload: RequestI = {
      path: API_END_POINTS.getAllCityList,
    };

    this.apiService.get(payload).subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.allCityArray = res.data;
      } else {
        this.allCityArray = [];
      }
    });
  }

  onCommoditySelectionChange(event: any) {
    this.selectedCity = event?.value;
    this.getInvestorDetailList();
  }

  getSearchResult() {
    this.searchBox.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        this.pageIndex = 0;
        this.getInvestorDetailList();
      });
  }

  onSearchIconClick() {
    if (!this.shouldShow) {
      this.searchBox.reset();
    }
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = this.pageLimit !== e.pageSize ? 0 : e.pageIndex;
    this.pageLimit = e.pageSize;
    this.getInvestorDetailList();
  }

  sortData(event: any) {
    this.directionFieldName = event.direction === 'asc' ? 'asc' : 'desc';
    this.sortingFieldName = event.active;
    this.getInvestorDetailList();
  }

  getInvestorDetailList() {
    const data = {
      page: this.pageIndex,
      limit: this.pageLimit,
      search: this.searchBox.value,
      column: this.sortingFieldName,
      order: this.directionFieldName,
      cityId: this.selectedCity || '',
    };

    const payload: RequestI = {
      path: API_END_POINTS.getSchoolList,
      data,
    };

    this.apiService.post(payload).subscribe((res: any) => {
      this.masterListDetailData = res.data.schoolList;
      this.masterListDetailCount = res.data.total_records;
      this.dataSource = new MatTableDataSource(this.masterListDetailData);
      this.cdr.detectChanges();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteInvestorDetail(id: number) {
    const dialogRef = this.dialog.open(DeletePopupComponent, {
      data: {
        modalTitle: 'Delete School',
        modalMessage: 'Are you sure you want to delete?',
      },
      width: '400px',
      height: 'auto',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.close) {
        const payload: RequestI = {
          path: API_END_POINTS.deleteSchool + `${id}/`,
        };
        this.apiService.delete(payload).subscribe((res: any) => {
          if (res.statusCode === 200) {
            if (this.masterListDetailData.length === 1) {
              this.pageIndex = this.pageIndex > 1 ? this.pageIndex - 1 : 0;
            }
            this.toastr.success(res.message, 'Success');
            this.getInvestorDetailList();
          }
        });
      }
    });
  }

  commoditySectorFilterSubmit() { }
}
