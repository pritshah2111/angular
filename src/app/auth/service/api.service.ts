import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { RequestI } from 'src/app/interfaces/api.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

/**
 * If you want to use one common service in which you can pass API URL and data then you can use
 * this api service
 */
export class ApiService {
  private options;
  BASE_URL: string = environment.api_url;

  constructor(private http: HttpClient) {
    this.options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
  }

  get(request: RequestI) {
    return this.http.get(this.BASE_URL + request['path']);
    // if(Object.keys(request['data']).length){
    // }else{
    // }
  }

  put(request: RequestI) {
    return this.http.put(this.BASE_URL + request['path'], request['data']);
  }

  post(request: RequestI) {
    return this.http.post(this.BASE_URL + request['path'], request['data']);
  }

  patch(request: RequestI) {
    return this.http.patch(this.BASE_URL + request['path'], request['data']);
  }

  delete(request: RequestI) {
    return this.http.delete(this.BASE_URL + request['path']);
  }

  uploadWithSignedUrl(request: RequestI): Observable<any[]> {
    return this.http.put<any[]>(request['path'], request['data']).pipe(
      map((result: any) => {
        return result;
      }),
    );
  }
}
