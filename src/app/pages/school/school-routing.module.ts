import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolListComponent } from './school-list/school-list.component';
import { SchoolViewComponent } from './school-view/school-view.component';
import { SchoolAddEditComponent } from './school-add-edit/school-add-edit.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolListComponent,
    data: {
      breadcrumb: 'School List',
    },
  },
  {
    path: 'list',
    component: SchoolListComponent,
    data: {
      breadcrumb: 'School List',
    },
  },
  {
    path: 'view/:id',
    data: {
      breadcrumb: 'View School',
    },
    component: SchoolViewComponent,
  },
  {
    path: 'create',
    data: {
      breadcrumb: 'Create School',
    },
    component: SchoolAddEditComponent,
  },
  {
    path: 'edit/:id',
    data: {
      breadcrumb: 'Edit School',
    },
    component: SchoolAddEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolRoutingModule { }
