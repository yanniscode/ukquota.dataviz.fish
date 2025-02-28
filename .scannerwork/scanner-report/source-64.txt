import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';

import { HandleError, HttpErrorHandler } from '../../../todo-data-service/http-error-handler.service';


@Injectable({
  providedIn: 'root',
})

export class MainAuthService {

  public isLoggedIn = false;

  // store the URL so we can redirect after logging in :
  public redirectUrl: string;

  public isUserLoggedIn: boolean = false;
  private userLogin: string;

  public handleError: HandleError;

  public constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    public router: Router,
  ) { 
    this.http = http;
    this.handleError = httpErrorHandler.createHandleError('AuthDatasService');
  }


  public getUserLoginData(): string {
    return this.userLogin;
  }


  public setUserLoginData(userLogin: string): string {
    return this.userLogin = userLogin;
  }


  private getRandomSessionId(min, max): number {
    
    // *** Note:return Math.random() * (max - min) + min;  // nombre non-entier:
    return Math.ceil(Math.random() * 999999999);
  }


  public setUserLogin(isUserLoggedIn: boolean, loginUserCheck: string): void {
  
    this.isUserLoggedIn = isUserLoggedIn;

    let sessionId = this.getRandomSessionId(0, 999999999);

    let navigationExtras: NavigationExtras = {
      queryParams: { 'session_id': sessionId },
      fragment: 'gallery'  // *** Note: ancre de page
    };

    if(this.isUserLoggedIn) {
      
      console.log(isUserLoggedIn);
      console.log(this.isUserLoggedIn);
      console.log(loginUserCheck);
      this.router.navigate(['/main', { login: loginUserCheck }], navigationExtras);

    } else if(!this.isUserLoggedIn) {

      this.router.navigate(['/']);
      
    }
    
  }


  public login(): Observable<boolean> {

    return of(true).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = true)
    );

  }


  public logout(): void {

    this.isLoggedIn = false;
    this.isUserLoggedIn = false;

    this.router.navigate(['/']);

  }


}