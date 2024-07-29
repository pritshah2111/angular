import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardLiquidityChartComponent } from './forward-liquidity-chart.component';

describe('ForwardLiquidityChartComponent', () => {
  let component: ForwardLiquidityChartComponent;
  let fixture: ComponentFixture<ForwardLiquidityChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForwardLiquidityChartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForwardLiquidityChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
