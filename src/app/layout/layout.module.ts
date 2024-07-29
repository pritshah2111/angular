import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CapitalizePipe } from '../pipe/capitalize.pipe';

@NgModule({
  declarations: [
    DefaultLayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BreadcrumbComponent,
    CapitalizePipe,
  ],
  imports: [CommonModule, RouterModule, MaterialModule],
})
export class LayoutModule { }
