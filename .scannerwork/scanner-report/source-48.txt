import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { MainAuthService } from '../../todo-component/forms/main-auth/main-auth.service';


@Injectable({
  providedIn: 'root'
})
export class NavlinksService {

  constructor(
    private router: Router,
    private mainAuthService: MainAuthService,
  ) { }

  ScrollTo(myAnchor: string) {

    let isUserLoggedIn = this.mainAuthService.isUserLoggedIn;
    let datasRedirectUrl: string;

    if(isUserLoggedIn){

      datasRedirectUrl = '/main';

      let login: string = this.mainAuthService.getUserLoginData();
      console.log(login);

      // *** Set our navigation extras object that passes on our global query params and fragment:
      let navigationExtras: NavigationExtras = {
        queryParamsHandling: 'preserve',
        preserveFragment: false,
        fragment: myAnchor,
      };

      // *** Redirect the user:
      // *** https://stackoverflow.com/questions/50836497/using-html-anchor-link-id-in-angular-6:
      // *** this.router.onSameUrlNavigation = "reload";
      this.router.navigate([datasRedirectUrl, { 'login': login }], navigationExtras).finally(() => {
        this.router.onSameUrlNavigation = "reload"; // Restore config after navigation completes
      });

    } else if(!isUserLoggedIn) {

      datasRedirectUrl = '/';

      // *** Set our navigation extras object that passes on our global query params and fragment:
      let navigationExtras: NavigationExtras = {
        queryParamsHandling: 'preserve',
        preserveFragment: false,
        fragment: myAnchor,
      };

      this.router.navigate([datasRedirectUrl], navigationExtras).finally(() => {  // *** Note: pas de paramètres de type 'matrix' (= format d'url permettant d'isoler les paramètres appartenant aux routes 'parentes' et 'enfants') dans les urls '/' (ex: 'login' ne passe pas ici...)
        this.router.onSameUrlNavigation = "reload"; // Restore config after navigation completes
      });
        
    }
  
  }

}
