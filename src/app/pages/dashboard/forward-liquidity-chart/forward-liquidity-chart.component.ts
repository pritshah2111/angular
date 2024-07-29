import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as Highcharts from 'highcharts';
import { ApiService } from 'src/app/auth/service/api.service';
import { API_END_POINTS } from 'src/app/helper/api.endpoints';
import { RequestI } from 'src/app/interfaces/api.interface';

@Component({
  selector: 'app-forward-liquidity-chart',
  templateUrl: './forward-liquidity-chart.component.html',
  styleUrls: ['./forward-liquidity-chart.component.scss'],
})
export class ForwardLiquidityChartComponent implements OnInit, OnChanges {
  @ViewChild('forwardLiquidityChart') forwardLiquidityChart!: ElementRef;
  @Input() selectedInvestorCompanyId: any;
  forwardLiquidityChartData: any = [];
  chartOptions: any = {

    title: {
      text: 'Standards',
    },
  }
  Highcharts: typeof Highcharts = Highcharts;

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.getForwardLiquidityChartDetails();
  }

  getForwardLiquidityChartDetails() {
    const payload: RequestI = {
      path: API_END_POINTS.getStudentsCountByStandard,
    };

    this.apiService.get(payload).subscribe((res: any) => {
      this.forwardLiquidityChartData = res.data;
      this.drawChart();
    });
  }

  drawChart(): void {
    if (!this.forwardLiquidityChartData || this.forwardLiquidityChartData.length === 0) {
      return;
    }

    this.chartOptions = {
   ...this.chartOptions,
      chart: {
        type: 'line',
        backgroundColor: 'transparent',
        renderTo: this.forwardLiquidityChart.nativeElement
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      yAxis: {
        title: {
          text: 'Total No. of Students',
        },
        tickInterval: 5, // Set the interval between ticks on the y-axis
      },
      xAxis: {
        scrollbar: {
          enabled: false,
        },
        categories: this.forwardLiquidityChartData.map((item: any) => item.key),
      },
      tooltip: {
        headerFormat: `<div>Standard: {point.key}</div>`,
        pointFormat: `<div>{series.name}: <b>{point.y}</b></div>`,
        shared: true,
        useHTML: true,
      },
      series: [
        {
          name: 'Total No. of Students',
          data: this.forwardLiquidityChartData.map((item: any) => Number(item.value)),
        },
      ],
    };

    Highcharts.chart(this.chartOptions);
  }
}