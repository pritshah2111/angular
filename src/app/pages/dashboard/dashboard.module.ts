import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForwardLiquidityChartComponent } from './forward-liquidity-chart/forward-liquidity-chart.component';
import { RiskDistributionChartComponent } from './risk-distribution-chart/risk-distribution-chart.component';
import { MaterialModule } from 'src/app/material.module';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    DashboardComponent,
    ForwardLiquidityChartComponent,
    RiskDistributionChartComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    HighchartsChartModule,
  ],
})
export class DashboardModule {}
