import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { AuthModule } from './auth/auth.module';
import { SchoolModule } from './pages/school/school.module';
import { StudentModule } from './pages/student/student.module';
import { AuthGuardService } from './guard/auth-guard.service';
import { ChangePasswordModule } from './pages/change-password/change-password.module';
import { Page404Component } from './common/page404/page404.component';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { StandardModule } from './pages/standard/standard.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    // canActivate: [AuthGuardService],
    loadChildren: () => AuthModule,
  },
  {
    path: '404',
    component: Page404Component,
  },
  {
    path: '',
    canActivate: [AuthGuardService],
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'schools',
        loadChildren: () => SchoolModule,
      },
      {
        path: 'students',
        loadChildren: () => StudentModule,
      },
      {
        path: 'standards',
        loadChildren: () => StandardModule,
      },
      {
        path: 'change-password',
        loadChildren: () => ChangePasswordModule,
      },
      {
        path: 'dashboard',
        loadChildren: () => DashboardModule,
      }
    ],
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => DashboardModule,
      },
    ],
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
