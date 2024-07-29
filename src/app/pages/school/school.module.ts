import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolRoutingModule } from './school-routing.module';
import { SchoolListComponent } from './school-list/school-list.component';
import { SchoolViewComponent } from './school-view/school-view.component';
import { SchoolAddEditComponent } from './school-add-edit/school-add-edit.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  declarations: [
    SchoolListComponent,
    SchoolViewComponent,
    SchoolAddEditComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgxIntlTelInputModule,
    SchoolRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    NgMultiSelectDropDownModule.forRoot(),

  ],
})
export class SchoolModule { }
