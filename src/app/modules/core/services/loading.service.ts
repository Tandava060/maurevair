import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading$$ = new BehaviorSubject<boolean>(false);
  loading$ = this.loading$$.asObservable();

  constructor() {}

  show() {
    this.loading$$.next(true);
  }

  stop() {
    this.loading$$.next(false);
  }
}
