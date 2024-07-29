import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Breadcrumb {
  label: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  constructor() { }

  breadcrumbsSubject = new BehaviorSubject<Breadcrumb[]>([]);
  breadcrumbs$: Observable<Breadcrumb[]> =
    this.breadcrumbsSubject.asObservable();

  setBreadcrumbs(breadcrumbs: Breadcrumb[]): void {
    this.breadcrumbsSubject.next(breadcrumbs);
  }
  getBreadcrumb() {
    return this.breadcrumbsSubject.value;
  }

  updateBreadcrumb(breadcrumb: any[]) {
    this.breadcrumbsSubject.next(breadcrumb);
  }
}
