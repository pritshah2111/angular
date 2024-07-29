import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, finalize, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

/**
 * Error Interceptor will check that if any error return in API call.
 * Also Bind token in header when we call API.
 */

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) {}
  userToken = localStorage.getItem('token');
  private activeRequests = 0;
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (request) {
      this.activeRequests++;
      this.spinner.show();
    }

    let authData = localStorage.getItem('authToken');
    if (authData) {
      if (request.url.includes('stage-docs-storage.s3.amazonaws.com')) {
      } else {
        request = request.clone({
          setHeaders: {
            authorization: 'Bearer ' + `${authData}`,
          },
        });
      }
    }
    return next.handle(request).pipe(
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests <= 0) {
          this.activeRequests = 0;
          this.spinner.hide();
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status == 401 || error.status == 403) {
          localStorage.clear();
          this.router.navigateByUrl('/login');
        }
        this.toastr.error(
          error['error']?.message || 'Something went wrong!',
          'Error',
        );

        throw error;
      }),
    );
  }
}
