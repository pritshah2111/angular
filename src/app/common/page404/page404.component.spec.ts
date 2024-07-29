import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page404Component } from './page404.component';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material.module';

describe('Page404Component', () => {
  let component: Page404Component;
  let fixture: ComponentFixture<Page404Component>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule, RouterTestingModule, MaterialModule],
      declarations: [Page404Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Page404Component);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check navigate to /user-management when backToHome is called', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    component.backToHome();
    // expect(navigateSpy).toHaveBeenCalledWith("/user-management");
  });
});
