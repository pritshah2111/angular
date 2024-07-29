import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandardAddComponent } from './standard-add/standard-add.component';
import { StandardListComponent } from './standard-list/standard-list.component';
import { StandardViewComponent } from './standard-view/standard-view.component';
// import { StudentListComponent } from './borrower-list/borrower-list.component';
// import { StudentAddComponent } from './borrower-financial-add/borrower-financial-add.component';
// import { StudentViewComponent } from './borrower-financial-view/borrower-financial-view.component';

const routes: Routes = [
  {
    path: '',
    component: StandardListComponent,
    data: {
      breadcrumb: 'Standard List',
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule { }
