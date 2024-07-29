import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentAddComponent } from './student-add/student-add.component';
import { StudentViewComponent } from './student-view/student-view.component';

const routes: Routes = [
  {
    path: '',
    component: StudentListComponent,
    data: {
      breadcrumb: 'Student List',
    },
  },
  {
    path: 'add',
    component: StudentAddComponent,
    data: {
      breadcrumb: 'Add Student Details',
    },
  },
  {
    path: 'edit/:id',
    component: StudentAddComponent,
    data: {
      breadcrumb: 'Edit Student Details',
    },
  },
  {
    path: 'view/:id',
    component: StudentViewComponent,
    data: {
      breadcrumb: 'View  Student Details',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule { }
