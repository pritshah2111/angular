import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {
  private feedSearchSource = new BehaviorSubject('');
  currentFeedSearchVal = this.feedSearchSource.asObservable();
  private listners = new Subject<any>();

  constructor() {}

  listen(): Observable<any> {
    return this.listners.asObservable();
  }

  assignValue(data: any) {
    this.listners.next(data);
  }
}
