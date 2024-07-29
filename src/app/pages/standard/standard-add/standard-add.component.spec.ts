import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAddComponent } from './borrower-financial-add.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from 'src/app/auth/service/api.service';
import { ToastrModule } from 'ngx-toastr';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  convertToParamMap,
} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

describe('StudentAddComponent', () => {
  let component: StudentAddComponent;
  let fixture: ComponentFixture<StudentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ToastrModule.forRoot(),
        RouterModule,
        ReactiveFormsModule,
      ],
      declarations: [StudentAddComponent],
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
    fixture = TestBed.createComponent(StudentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
