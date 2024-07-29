import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAddEditComponent } from './school-add-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('SchoolAddEditComponent', () => {
  let component: SchoolAddEditComponent;
  let fixture: ComponentFixture<SchoolAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SchoolAddEditComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
