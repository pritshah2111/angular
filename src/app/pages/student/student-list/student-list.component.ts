import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { RequestI } from 'src/app/interfaces/api.interface';
import { API_END_POINTS } from 'src/app/helper/api.endpoints';
import { ApiService } from 'src/app/auth/service/api.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { tick } from '@angular/core/testing';
import { DeletePopupComponent } from 'src/app/common/delete-popup/delete-popup.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  searchBox: FormControl = new FormControl('');
  shouldShow: boolean = false;
  input: any;
  pageLimit: number = 10;
  pageIndex: number = 0;
  pageSizeOptions = [10, 25, 50, 100];
  masterListDetailCount: number = 0;
  sortingFieldName = '';
  directionFieldName: any;
  selectedCommoditySector: any;
  studentsForm: any;
  studentsArray: any = [];
  allSchoolArray: any = [];
  selectedSchool: any;
  displayedColumns: string[] = [
    'firstName',
    'schoolName',
    'stdName',
    'status',
    'Action',
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  borrowerFinanceListData: any = [];
  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private crd: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.dataSource = new MatTableDataSource(this.borrowerFinanceListData);
  }

  ngOnInit(): void {
    this.studentsForm = this.formBuilder.group({
      commodity_sector: [''],
    });
    this.getAllStdList();
    this.getAllSchoolList();
    this.getSearchResult();
    this.getBorrowerList();
  }

  onSearchIconClick() {
    if (!this.shouldShow) {
      this.searchBox.reset();
    }
  }

  commoditySectorFilterSubmit() { }

  getAllStdList() {
    const payload: RequestI = {
      path: API_END_POINTS.getAllStdList,
    };

    this.apiService.get(payload).subscribe((res: any) => {
      console.log('res: ', res);
      if (res.statusCode == 200) {
        this.studentsArray = res.data;
      } else {
        this.studentsArray = [];
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

  onCommoditySelectionChange(event: any) {
    this.selectedCommoditySector = event?.value;
    this.getBorrowerList();
  }

  onSchoolChange(event: any) {
    this.selectedSchool = event?.value;
    this.getBorrowerList();
  }

  getSearchResult() {
    this.searchBox.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        this.pageIndex = 0;
        this.getBorrowerList();
      });
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = this.pageLimit !== e.pageSize ? 0 : e.pageIndex;
    this.pageLimit = e.pageSize;
    this.getBorrowerList();
  }

  sortData(event: any) {

    this.directionFieldName = event.direction == 'asc' ? 'asc' : 'desc';


    this.sortingFieldName = event.active
    // (event.direction == 'asc' ? '' : '-') + event.active;
    this.getBorrowerList();
  }

  getBorrowerList() {
    const pageIndex = this.pageIndex;
    const pageLimit = this.pageLimit;

    const data = {
      page: pageIndex,
      limit: pageLimit,
      search: this.searchBox.value,
      column: this.sortingFieldName,
      order: this.directionFieldName,
      stdId: this.selectedCommoditySector ? this.selectedCommoditySector : '',
      schoolId: this.selectedSchool ? this.selectedSchool : ''
    }
    const payload: RequestI = {
      path: API_END_POINTS.getStudentList,
      data
    };
    this.apiService.post(payload).subscribe((res: any) => {
      console.log('res: ', res);
      this.borrowerFinanceListData = [];
      this.borrowerFinanceListData = res.data.studentList;
      this.masterListDetailCount = res.data.total_records;
      this.dataSource = new MatTableDataSource(this.borrowerFinanceListData);
      this.crd.detectChanges();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteStudent(id: number) {
    const dialogRef = this.dialog.open(DeletePopupComponent, {
      data: {
        modalTitle: 'Delete Investor',
        modalMessage: 'Are you sure you want to delete ?',
      },
      width: '400px',
      height: 'auto',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.close) {
        const payload: RequestI = {
          path: API_END_POINTS.deleteStudent + `${id}`,
        };
        this.apiService.delete(payload).subscribe((res: any) => {
          if (res.statusCode == 200) {
            if (this.borrowerFinanceListData.length == 1) {
              this.pageIndex = this.pageIndex > 1 ? this.pageIndex - 1 : 0;
            }
            this.toastr.success(res.message, "Success");
            this.getBorrowerList();
          }
        });
      }
    });
  }

  onChange(event: any, row: any) {
    const payload: RequestI = {
      path: API_END_POINTS.updateStudent + `${row._id}`,
      data: {
        isActive: event.checked
      },
    };

    this.apiService.patch(payload).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.toastr.success(res.message, "Success");
      }
    });
  }
}
