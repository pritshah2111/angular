import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/auth/service/api.service';
import { USER_DETAILS } from 'src/app/common/common-const';
import { API_END_POINTS } from 'src/app/helper/api.endpoints';
import { RequestI } from 'src/app/interfaces/api.interface';

export interface TableColumnElementsId {
  active_transactions: string;
  total_amount_financed: string;
  total_borrower_loss_reserve: string;
  total_borrower_working_capital: string;
  dvc_ratio: string;
  rlr_at_risk: string;
  rlr_at_risk_percentage?: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashboardSummaryData: any = [];
  selectedInvestorCompanyId: any = 'all'; // Initially select 'All Companies'
  investorCompanyOptions: any = [];
  selectedCompany: string = 'all';
  userType: any;

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    let user_details: any = localStorage.getItem(USER_DETAILS);
    if (user_details) {
      this.userType = Number(JSON.parse(user_details).user_type);
    }
    this.getDashboardSummaryDetails();
    // this.getInvestorCompnaiesList();
  }

  // getInvestorCompnaiesList() {
  //   const payload: RequestI = {
  //     path: API_END_POINTS.investorCompaniesList,
  //   };

  //   this.apiService.get(payload).subscribe((res: any) => {
  //     this.investorCompanyOptions = res.data;
  //   });
  // }

  // onSelectionChange(event: any) {
  //   this.selectedInvestorCompanyId = event.value;

  //   this.getDashboardSummaryDetails();
  // }

  getDashboardSummaryDetails() {
    const payload: RequestI = {
      path: API_END_POINTS.dashboardDetail,

    };

    this.apiService.get(payload).subscribe((res: any) => {
      this.dashboardSummaryData = res.data;
    });
  }

}
