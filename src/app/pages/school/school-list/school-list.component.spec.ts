import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolListComponent } from './school-list.component';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  convertToParamMap,
} from '@angular/router';
import { CommonModule } from '@angular/common';

describe('SchoolListComponent', () => {
  let component: SchoolListComponent;
  let fixture: ComponentFixture<SchoolListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule, CommonModule],
      declarations: [SchoolListComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                /* provide any required params here */
              }),
            },
          },
        },
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
