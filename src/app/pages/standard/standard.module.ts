import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { StandardListComponent } from './standard-list/standard-list.component';
import { StandardAddComponent } from './standard-add/standard-add.component';
import { StandardViewComponent } from './standard-view/standard-view.component';
import { StudentRoutingModule } from './standard-routing.module';

@NgModule({
  declarations: [
    StandardListComponent,
    StandardAddComponent,
    StandardViewComponent,
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
export class StandardModule { }
