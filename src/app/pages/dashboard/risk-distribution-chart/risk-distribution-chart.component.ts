import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as Highcharts from 'highcharts';
import { ApiService } from 'src/app/auth/service/api.service';
import { API_END_POINTS } from 'src/app/helper/api.endpoints';
import { RequestI } from 'src/app/interfaces/api.interface';

@Component({
  selector: 'app-risk-distribution-chart',
  templateUrl: './risk-distribution-chart.component.html',
  styleUrls: ['./risk-distribution-chart.component.scss'],
})
export class RiskDistributionChartComponent implements OnInit, OnChanges {
  @ViewChild('riskDistributionChart') riskDistributionChart!: ElementRef;
  @Input() selectedInvestorCompanyId: any;
  riskDistributionChartData: any = [];
  chartOptions: any = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
    },
    title: {
      text: 'School',
    },  
  }

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
  ) { }

  Highcharts: typeof Highcharts = Highcharts;

  ngOnInit(): void {
  }

  // ngAfterViewInit(): void {
  //   const chartContainer = this.riskDistributionChart?.nativeElement;
  //   if (chartContainer) {
  //     this.setChartWidth(chartContainer.offsetWidth);
  //     window.addEventListener('resize', () => {
  //       this.setChartWidth(chartContainer.offsetWidth);
  //     });
  //   }
  // }

  // setChartWidth(width: number): void {
  //   if (this.chartOptions.chart) {
  //     this.chartOptions.chart.width = width - 123;
  //   }
  //   this.riskDistributionChart.nativeElement.style.width = width + 'px';
  //   Highcharts.chart(
  //     this.riskDistributionChart.nativeElement,
  //     this.chartOptions,
  //   );
  // }

  ngOnChanges(): void {
    this.getRiskDistributionChartDetails();
  }

  getRiskDistributionChartDetails() {
    const payload: RequestI = {
      path:  API_END_POINTS.getStudentsCountBySchool ,
    };

    this.apiService.get(payload).subscribe((res: any) => {
      this.riskDistributionChartData = res.data;
      this.initializeChartOptions();
    });
  }

  initializeChartOptions(): void {
    if (!this.riskDistributionChartData || this.riskDistributionChartData.length === 0) {
      // Handle empty data, perhaps show a message or default chart
      return;
    }
    this.chartOptions = {
      ...this.chartOptions,
      tooltip: {
        headerFormat: `<div>{series.name}: {point.key}</div>`,
        pointFormat: `<div>Total Students: <b>{point.y}</b></div>`,
        shared: true,
        useHTML: true,
       },
      xAxis: {
        scrollbar: {
          enabled: false,
        },
        categories: this.riskDistributionChartData.map((item: any) => item.key),
      },
      yAxis: {
        title: {
          text: 'Total No. of Students',
        },
        tickInterval: 5, // Set the interval between ticks on the y-axis
      },
      series: [
        {
          name: 'School',
          color: '#074992',
          data: this.riskDistributionChartData.map((item: any) => Number(Number(item.value))),
        }
      ],
    };

    // Update chart width
    // const chartContainer = this.riskDistributionChart?.nativeElement;
    // if (chartContainer) {
    //   this.setChartWidth(chartContainer.offsetWidth);
    // }

    // Draw chart
    Highcharts.chart(
      this.riskDistributionChart.nativeElement,
      this.chartOptions,
    );
  }
}
