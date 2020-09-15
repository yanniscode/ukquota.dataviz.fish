import { Component, OnInit, AfterViewInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UsersService } from '../../../todo-data-service/users.service';
import { User } from '../../../shared/todo-class/user';


@Component({
  selector: 'app-form-connexion',
  templateUrl: './form-connexion.component.html',
  styleUrls: ['./form-connexion.component.scss'],
  providers: [
    UsersService,  // *** Note: accès restreint au composant = plus sûr ?
  ]
})


export class FormConnexionComponent implements OnInit, AfterViewInit {

  private showDatas: boolean; // *** Note: Affichage div avec *ngIf (privilégié à la méthode du DOM)  = false à l'init
  private user$: User[];

  private user: User = { 
    id_user: 0, 
    user_firstname: '', 
    user_lastname: '', 
    login: '', 
    password: '', 
    mail: '',
    role: '',
  };

  private userForm: FormGroup;

  public get login(): FormControl { return this.userForm.get('login') as FormControl; }
  public get mail(): FormControl { return this.userForm.get('mail') as FormControl; }

  public constructor(
    private usersService: UsersService,
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

  }


  public ngOnInit(): void {
    console.log('form-connexion : OnInit');
    this.showDatas = false;
  }


  public ngAfterViewInit(): void {

    document.getElementById("dataform-connexion").className ="form-connection-container animated fadeIn"; // transforme la classe de l'élément -> sans fade in

    setTimeout(() => {
      document.getElementById("dataform-connexion").className ="form-connection-container"; // transforme la classe de l'élément -> sans fade in
    }, 1500);

    console.log('form-connexion : AfterViewInit');
  }
   


  private onSubmit(): void {  

    const loginValue: string = this.userForm.get('login').value;
    const mailValue: string = this.userForm.get('mail').value;

    const userDataSubscription = this.usersService.getLogin(loginValue, mailValue)
      .subscribe(user$ => {

      this.user$ = user$;

      if(user$[0] !== undefined) {

        const loginCheck = user$[0].login;

        const mailCheck = user$[0].mail;

        if(loginCheck === loginValue && mailCheck === mailValue) {
          
          setTimeout(() => {
            document.getElementById("dataform-connexion").className ="form-connection-container animated fadeOut";
            document.getElementById("data_table").className ="animated fadeOut"; // *** Note: si tableau et form-connexion sur la même page
          }, 100);

          setTimeout(() => {
            this.showDatas = true;
            document.getElementById("data_table").className ="animated fadeIn"; // *** Note: si tableau et form-connexion sur la même page
          }, 1600);

          return;
          
        } else {
          this.showDatas = false;
          alert("Votre login ou votre mail semble incorrect. Veuillez nous contacter par mail pour vous inscrire ou obtenir vos informations de connexion...");
          return;
        }

      } else { 
        this.showDatas = false;
        alert("Login ou mail non répertorié...");
        return;

      }

    });

    setTimeout(() => {
      userDataSubscription.unsubscribe();
    }, 10000);
      
  }

  
  onUserDeconnect(): void {

    this.userForm.reset({ login: '', mail: '' }); // *** Note: le contenu des champs est  effacé

    console.log("fade button inside function ok !");

    document.getElementById("data_table").className ="animated fadeOut"; // *** Note: si tableau et form-connexion sur la même page
    document.getElementById("form-submitted").className ="animated fadeOut";

    setTimeout(() => {
      this.showDatas = false;
      document.getElementById("dataform-connexion").className ="form-connection-container animated fadeIn";
      document.getElementById("data_table").className ="animated fadeIn";  // *** Note: si tableau et form-connexion sur la même page
    }, 1500);

    setTimeout(() => {
      document.getElementById("dataform-connexion").className ="form-connection-container"; // *** Note: transforme la classe de l'élément >> sans fade in
    }, 3000);

  }


}