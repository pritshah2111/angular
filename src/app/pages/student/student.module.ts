import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentAddComponent } from './student-add/student-add.component';
import { MaterialModule } from 'src/app/material.module';
import { StudentViewComponent } from './student-view/student-view.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    StudentListComponent,
    StudentAddComponent,
    StudentViewComponent,
  ],
  imports: [CommonModule,
    MatDatepickerModule,
    StudentRoutingModule,
    MaterialModule,
    NgxIntlTelInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class StudentModule { }
