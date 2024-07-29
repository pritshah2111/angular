import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentViewComponent } from './borrower-financial-view.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from 'src/app/auth/service/api.service';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  convertToParamMap,
} from '@angular/router';

describe('StudentViewComponent', () => {
  let component: StudentViewComponent;
  let fixture: ComponentFixture<StudentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterModule],
      declarations: [StudentViewComponent],
      providers: [
        ApiService,
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          },
        },
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
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
