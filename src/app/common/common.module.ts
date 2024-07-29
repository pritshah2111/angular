import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessPopupComponent } from './success-popup/success-popup.component';
import { MaterialModule } from '../material.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { DeletePopupComponent } from './delete-popup/delete-popup.component';
import { Page404Component } from './page404/page404.component';

@NgModule({
  declarations: [
    SuccessPopupComponent,
    DeletePopupComponent,
    Page404Component,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxIntlTelInputModule,
  ],
})
export class CommonModulePopUP {}
