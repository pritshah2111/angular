import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { BreadcrumbService } from '../breadcrumb.service';
import { Location } from '@angular/common';
import { USER_DETAILS } from 'src/app/common/common-const';
export interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  public breadcrumbs: Breadcrumb[] = [];
  url: any = [];
  currentUrl: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private location: Location,
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentUrl = this.router.url;
        this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
        const urlSegments = this.router.url.split('/');

        const urlsWithoutQueryParams = urlSegments.map((url) => {
          // Check if the URL contains a query parameter
          const indexOfQuestionMark = url.indexOf('?');
          // If a query parameter exists, remove it
          return indexOfQuestionMark !== -1
            ? url.slice(0, indexOfQuestionMark)
            : url;
        });

        const urlWithOutEditNumber = urlsWithoutQueryParams.filter(
          (segment) => !/\d/.test(segment),
        );
        this.url = urlWithOutEditNumber.filter((segment) => segment !== '');
        this.breadcrumbService.setBreadcrumbs(this.breadcrumbs);
      });
  }

  ngOnInit() {
    this.breadcrumbService.breadcrumbs$.subscribe((breadcrumb) => {
      this.breadcrumbs = breadcrumb;
    });
  }

  back() {
    this.location.back();
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = [],
  ): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');

      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      if (Object.keys(child.snapshot.data).length) {
        breadcrumbs.push({
          label: child.snapshot.data['breadcrumb'],
          url: url,
        });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
