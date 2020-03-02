import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup,  NG_VALIDATORS, ValidationErrors, Validators, FormBuilder, Validator, ValidatorFn } from '@angular/forms';

import { UsersService } from '../../../todo-data-service/users.service';
import { User } from '../../../todo-class/user';

import { NgIf } from '@angular/common';

@Component({
  selector: 'app-form-connexion',
  templateUrl: './form-connexion.component.html',
  styleUrls: ['./form-connexion.component.scss']
})


export class FormConnexionComponent {
// export class ReactiveFormConnexionComponent implements OnInit { /* ANCIENNE VERSION */

  // showConnexionForm = true;
  showDatas = false; // Affichage div avec *ngIf (privilégié à la méthode du DOM)
  
  public user$: User[];

    // user = { id_user: 1, user_firstname: 'John', user_lastname: 'The Fisherman', login: 'Primus', password: '1234', mail: 'johnthefish@gmail.com'};

  user = { 
    id_user: '', 
    user_firstname: '', 
    user_lastname: '', 
    login: '', 
    password: '', 
    mail: ''
  };


  // userForm: FormGroup;

  userForm = new FormGroup (
  {
    login: new FormControl(this.user.login, [
      Validators.required,
      Validators.minLength(4),
    ]),
    mail: new FormControl(this.user.mail, [
      Validators.required,
      Validators.email
    ])
  });



  // pas utilisé (pour l'instant ??):

  // ngOnInit(): void {

  // }




  get login() { return this.userForm.get('login'); }
  get mail() { return this.userForm.get('mail'); }


  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
  ) {}
  
  
  onSubmit() {

    const loginValue = this.userForm.get('login').value;
    console.log(loginValue);
    const mailValue = this.userForm.get('mail').value;
    console.log(mailValue);

    this.usersService.getLogin(loginValue, mailValue)
    .subscribe(user$ => {

      this.user$ = user$;

      if(user$[0] !== undefined) {

        const loginCheck = user$[0].login.toString();
        console.log(loginCheck);

        const mailCheck = user$[0].mail.toString();
        console.log(mailCheck);

        if(loginCheck === loginValue && mailCheck === mailValue) {
          console.log("login répertorié dans la BDD : connexion possible !");
          
          this.showDatas = true;
          // this.showConnexionForm = false;

          // si le login existe, la <div> des données "masquées" est révélée :
          // document.getElementById("form-submitted").hidden = false;

          return;
          
        } else {

          this.showDatas = false;

          alert("Votre login ou votre mail semble incorrect. Veuillez nous contacter par mail pour vous inscrire ou obtenir vos informations de connexion...");

          this.userForm.reset({ login: '', mail: '' }); // le contenu des champs est bien effacé

          return;

        }

      } else {  // utile ?? (à retester si nécessaire)
        
        // this.showConnexionForm = true;
        this.showDatas = false;

        this.userForm.reset({ login: '', mail: '' }); // le contenu des champs est bien effacé


        
        // Autre méthode (DOM) pour enlever le composant (plus que le masquer):

        // let formsubmitted = document.getElementById("form-submitted");
        // formsubmitted.parentNode.removeChild(formsubmitted);

        // si le login n'est pas reconnu dans la BDD, la <div> reste masquée :
        // document.getElementById("form-submitted").hidden = true;

        alert("Login ou mail non répertorié...");

        return;

      }

    });
      
  }

  
  onUserDeconnect() {

    this.showDatas = false;
    this.userForm.reset({ login: '', mail: '' }); // le contenu des champs est bien effacé

  }


}