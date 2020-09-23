import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationExtras } from '@angular/router';import { Observable } from 'rxjs';

import { MainAuthService } from './main-auth.service';

@Injectable({
  providedIn: 'root'
})

export class MainAuthGuard implements CanActivate, CanActivateChild {

  private SESSION_ID: number = null;
  private isUserLoggedIn: boolean = false;

  constructor(
    private mainAuthService: MainAuthService,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    let url: string = state.url;
    let isUserLoggedIn = this.isUserLoggedIn;

    return this.checkUserLogin(url, isUserLoggedIn);
  }


  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    console.log('MainAuthGuard#canActivateChild called');
    return this.canActivate(route, state);
  }


  checkUserLogin(url: string, isUserLoggedIn: boolean): boolean {

    console.log(this.mainAuthService.isUserLoggedIn);
    console.log(this.isUserLoggedIn);

    this.isUserLoggedIn = this.mainAuthService.isUserLoggedIn;
    console.log(url);
    console.log(this.isUserLoggedIn);

    if (this.isUserLoggedIn) {

      return true;

    } else if (!this.isUserLoggedIn) {

      console.log(url);
      console.log(this.isUserLoggedIn);

      // *** Store the attempted URL for redirecting
      this.mainAuthService.redirectUrl = url;

      // *** Create a dummy session id
      this.SESSION_ID = 123456789;

      // *** Set our navigation extras object
      // *** that contains our global query params and fragment
      let navigationExtras: NavigationExtras = {
        queryParams: { 'session_id': this.SESSION_ID },
        fragment: 'gallery',
      };

      console.log(navigationExtras.queryParams);

      // *** Navigate to the login page with extras:
      this.router.navigate(['/'], navigationExtras);
            
      return false;
    }

  }
  
}
