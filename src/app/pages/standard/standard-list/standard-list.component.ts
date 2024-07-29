import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { RequestI } from 'src/app/interfaces/api.interface';
import { API_END_POINTS } from 'src/app/helper/api.endpoints';
import { ApiService } from 'src/app/auth/service/api.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { StandardAddComponent } from '../standard-add/standard-add.component';

@Component({
  selector: 'app-standard-list',
  templateUrl: './standard-list.component.html',
  styleUrls: ['./standard-list.component.scss'],
})
export class StandardListComponent implements OnInit {
  @ViewChild('commodityInput') commodityInput: ElementRef | any;
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
  addCommodityForm: any;
  CommoditySelectorArray: any = [];
  allSchoolArray: any = [];
  selectedSchool: any;
  displayedColumns: string[] = [
    'stdName',
    'Action',
  ];
  dataSource: MatTableDataSource<any>;
  masterListDetailData: any = [];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  inputEditValue = '';
  paramId: any;
  editId = 0;
  isInputDisabled: boolean = true;
  borrowerFinanceListData: any = [];

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private crd: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.dataSource = new MatTableDataSource(this.masterListDetailData);
  }

  ngOnInit(): void {
    this.addCommodityForm = this.formBuilder.group({
      commodity_sector: [''],
    });

    this.getAllStdList();
    this.getSearchResult();
  }

  inputValue(event: any) {
    this.inputEditValue = event.target.value;
  }

  updateMasterDetail(id: number, commodityInput: any) {
    const payload: RequestI = {
      path: API_END_POINTS.updateStd,
      data: {
        stdId: id,
        stdName: commodityInput.nativeElement.value,
      },
    };

    this.apiService.patch(payload).subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.toggleEdit(id);
        this.toastr.success(res.message, "Success");
        this.getAllStdList();
      } else {
        this.toastr.error(res.message, "Error");
      }
    });
  }

  toggleEdit(row: any) {
    this.isInputDisabled = !this.isInputDisabled;
    this.editId = 0;
    if (!this.isInputDisabled) {
      this.editId = row._id;
      this.inputEditValue = row.stdName;
      setTimeout(() => {
        this.commodityInput.nativeElement.focus();
      });
    }
  }

  onSearchIconClick() {
    if (!this.shouldShow) {
      this.searchBox.reset();
    }
  }

  getAllStdList() {
    const pageIndex = this.pageIndex;
    const pageLimit = this.pageLimit;

    const data = {
      page: pageIndex,
      limit: pageLimit,
      search: this.searchBox.value,
      column: this.sortingFieldName,
      order: this.directionFieldName,
    }
    const payload: RequestI = {
      path: API_END_POINTS.getStdList,
      data
    };

    this.apiService.post(payload).subscribe((res: any) => {
      this.masterListDetailData = res.data.stdList || [];
      this.masterListDetailCount = res.data.total_records || 0;
      this.dataSource = new MatTableDataSource(this.masterListDetailData);
      this.crd.detectChanges();
    });
  }

  getSearchResult() {
    this.searchBox.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        this.pageIndex = 0;
        this.getAllStdList();
      });
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = this.pageLimit !== e.pageSize ? 0 : e.pageIndex;
    this.pageLimit = e.pageSize;
    this.getAllStdList();
  }

  sortData(event: any) {
    this.directionFieldName = event.direction === 'asc' ? 'asc' : 'desc';
    this.sortingFieldName = event.active;
    this.getAllStdList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addNewStd() {
    const dialogRef = this.dialog.open(StandardAddComponent, {
      width: '500px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllStdList();
    });
  }
}
