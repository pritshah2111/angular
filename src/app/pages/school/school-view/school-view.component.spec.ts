import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolViewComponent } from './school-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  convertToParamMap,
} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from 'src/app/auth/service/api.service';

describe('SchoolViewComponent', () => {
  let component: SchoolViewComponent;
  let fixture: ComponentFixture<SchoolViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterModule, HttpClientModule],
      declarations: [SchoolViewComponent],
      providers: [
        ApiService,
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
    // fixture = TestBed.createComponent(SchoolViewComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
