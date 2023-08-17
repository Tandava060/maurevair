import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize, tap } from 'rxjs';
import { User } from '../models/user/user.model';
import { UserLogin } from "../models/user/UserLogin";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api: string = 'api/login';
  private user$$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.user$$.asObservable();

  constructor(private httpClient: HttpClient, private router: Router, private loadingService: LoadingService) {
  }

  refreshUser(): void {
    const jsonUser = localStorage.getItem('user')
    if (!jsonUser) {
      this.user$$.next(null);
      this.router.navigate(['/login']);
      return;
    }

    const user: User = JSON.parse(jsonUser);
    if (user.accessToken) {
      const decodedToken: any = jwt_decode(user.accessToken);
      const expirationDate = new Date(decodedToken.exp * 1000);

      if (expirationDate > new Date()) {
        this.user$$.next(user);
        return;
      }
    }

    localStorage.removeItem('user');
    this.user$$.next(null);
    this.router.navigate(['/login']);
  }

  public get currentUserValue(): User {
    return this.user$$.value!;
  }

  public get isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  login(user: UserLogin) {
    return this.httpClient.post<User>(this.api, user).pipe(
      tap((res) => {
        this.loadingService.show();
        localStorage.setItem('user', JSON.stringify(res));
        this.user$$.next(res);
      }),
      finalize(() => this.loadingService.stop())
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.user$$.next(null);
    this.router.navigate(['/login']);
  }
}
