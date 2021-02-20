import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UsersService } from '../../../../todo-data-service/users.service';
import { MainAuthService } from '../main-auth.service';

import { User } from '../../../../shared/todo-class/user';


@Component({
  selector: 'app-main-auth',
  templateUrl: './main-auth.component.html',
  styleUrls: ['./main-auth.component.scss'],
  providers: [
    UsersService,  // *** Note: accès restreint au composant = plus sûr ?
  ]
})


export class MainAuthComponent implements OnInit, AfterViewInit {

  private user$: User[];

  private userForm: FormGroup;

  private user: User = { 
    id_user: 0, 
    user_firstname: '', 
    user_lastname: '', 
    login: '', 
    password: '', 
    mail: '',
    role: '',
  };
  
  private message: string;
  private redirectUrl: string = '';
  private isUserLoggedIn: boolean;
  private loginUserCheck: string;


  public get login(): FormControl { return this.userForm.get('login') as FormControl; }
  public get mail(): FormControl { return this.userForm.get('mail') as FormControl; }

  public constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private mainAuthService: MainAuthService,
  ) {

    this.userForm = new FormGroup
    (
    {
      login: new FormControl(this.user.login, [
        Validators.required,
      ]),
      mail: new FormControl(this.user.mail, [
        Validators.required,
        Validators.email
      ])
    });

    this.setMessage();
  }


  public ngOnInit(): void {

    console.log('form-connection : OnInit');

    this.route.queryParams.subscribe(params => {
      this.loginUserCheck = params['login'];
    });

  }


  public ngAfterViewInit(): void {

    document.getElementById("main-connection").className ="form-connection-container animated fadeIn"; // transforme la classe de l'élément -> sans fade in

    setTimeout(() => {
      document.getElementById("main-connection").className ="form-connection-container"; // transforme la classe de l'élément -> sans fade in
    }, 1500);

    console.log('main-connection : AfterViewInit');
  }
   

  private setMessage() {
    this.message = 'Logged ' + (this.isUserLoggedIn ? 'in' : 'out');
  }


  private connectionTry(loginUserCheck: string): void {

    console.log(this.isUserLoggedIn);

      this.mainAuthService.setUserLogin(this.isUserLoggedIn, loginUserCheck);

      this.mainAuthService.setUserLoginData(this.loginUserCheck); // *** Note: pour envoyer le login en paramètre de l'url
     
      this.setMessage();
    }
  

  public onSubmit(): void {

    this.loginUserCheck = this.userForm.get('login').value;     // *** Note: méthode globale
    const mailValue: string = this.userForm.get('mail').value;  // *** Note: méthode locale

    const userDataSubscription = this.usersService.getUser(this.loginUserCheck, mailValue)
      .subscribe(user$ => {

      this.user$ = user$;

      if(user$[0] !== undefined) {

        const loginCheck = user$[0].login;
        const mailCheck = user$[0].mail;

        if(loginCheck === this.loginUserCheck && mailCheck === mailValue) {
          
          document.getElementById("main-connection").className ="form-connection-container animated fadeOut";

          setTimeout(() => {
            this.isUserLoggedIn = true;
            console.log(this.isUserLoggedIn);

            this.connectionTry(this.loginUserCheck);
          }, 1000);

          setTimeout(() => {
            document.getElementById("main-form-submitted").className ="animated fadeIn";
          }, 1600);

          return;
          
        } else {

          this.isUserLoggedIn = false;
          console.log(this.isUserLoggedIn);

          this.connectionTry(this.loginUserCheck);

          alert("Votre login ou votre mail semble incorrect. Veuillez nous contacter par mail pour vous inscrire ou obtenir vos informations de connection...");

          return;
        }

      } else {
        this.isUserLoggedIn = false;
        console.log(this.isUserLoggedIn);

        this.connectionTry(this.loginUserCheck);

        alert("Login ou mail non répertorié...");

        return;
      }

    });

    setTimeout(() => {
      userDataSubscription.unsubscribe();
    }, 10000);
      
  }

  
  public onUserDeconnect(): void {

    this.mainAuthService.logout();
    
    this.loginUserCheck = undefined;

    this.mainAuthService.setUserLoginData(this.loginUserCheck); // *** Note: pour effacer le login en paramètre de l'url
    
    this.setMessage();

    this.userForm.reset({ login: '', mail: '' }); // *** Note: le contenu des champs est  effacé

    console.log("fade button inside function ok !");

    document.getElementById("main-form-submitted").className ="animated fadeOut";

    setTimeout(() => {
      
      this.isUserLoggedIn = false;
      console.log(this.isUserLoggedIn);

    }, 1500);

    setTimeout(() => {
      document.getElementById("main-connection").className ="form-connection-container"; // *** Note: transforme la classe de l'élément >> nouvel état = sans fade in
    }, 3000);

  }


}
