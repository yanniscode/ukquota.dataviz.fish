import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup,  NG_VALIDATORS, ValidationErrors, Validators, FormBuilder, Validator, ValidatorFn } from '@angular/forms';

import { UsersService } from '../../../todo-data-service/users.service';
import { User } from '../../../todo-class/user';

import { loginUnCheckedValidator } from '../../../todo-directive/login-checked-directive'; // directive qui check le login, mail de l'admin

@Component({
  selector: 'app-form-admin-connexion',
  templateUrl: './form-admin-connexion.component.html',
  styleUrls: ['./form-admin-connexion.component.scss']
})


export class FormAdminConnexionComponent implements OnInit {

  showAdminDatas = false; // Affichage div avec *ngIf (privilégié à la méthode du DOM)

  public admin$: User[];

  user = { 
    id_user: '', 
    user_firstname: '', 
    user_lastname: '', 
    login: '', 
    password: '', 
    mail: ''
  };

  // user = { id_user: 1, user_firstname: 'John', user_lastname: 'The Fisherman', login: 'Primus', password: '1234', mail: 'johnthefish@gmail.com'};

  // adminForm: FormGroup;
  adminForm = new FormGroup ({
    login: new FormControl(this.user.login, [
      Validators.required,
      // Validators.minLength(4),
    ]),
    mail: new FormControl(this.user.mail, [
      Validators.required,
      Validators.email
    ]),
  }, 
  {
    validators: loginUnCheckedValidator 
  }); // vérifier si l'administrateur (login, mail) est celui déclaré dans le formulaire


  ngOnInit(): void {

    // test mail :
    // const control = new FormControl('bad*@* — ', Validators.email);
    // console.log(control.errors); // {email: true}

    // this.adminForm = new FormGroup (
    // {
    //   login: new FormControl(this.user.login, [
    //     Validators.required,
    //     // Validators.minLength(4),
    //   ]),
    //   mail: new FormControl(this.user.mail, [
    //     Validators.required,
    //     Validators.email
    //   ]),
    // }, { validators: loginUnCheckedValidator }); // vérifier si l'administrateur (login, mail) est celui déclaré dans le formulaire

  }

  get adminLogin() { return this.adminForm.get('login'); }
  get adminMail() { return this.adminForm.get('mail'); }

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
  ) {}

  onAdminSubmit() {

    const loginValue = this.adminForm.get('login').value;
    console.log(loginValue);
    const mailValue = this.adminForm.get('mail').value;
    console.log(mailValue);

    this.usersService.getLogin(loginValue, mailValue)
    .subscribe(admin$ => {

      this.admin$ = admin$;

      if(admin$[0] !== undefined) {

        const loginCheck = admin$[0].login.toString();
        console.log(loginCheck);

        const mailCheck = admin$[0].mail.toString();
        console.log(mailCheck);

        // VERSION 1: directive "loginUnCheckedValidator" utilisée (pour test)
        if(loginCheck === loginValue && mailCheck === mailValue) {

        // VERSION 2: si la directive "loginUnCheckedValidator" n'est pas utilisée (plus sécu ?? le bouton n'apparait pas valide dès que les infos admin sont bonnes, et non seulement après validation...)
        // if(loginValue === "Kasparov29" && loginCheck === loginValue && mailValue === "quotauk@gmail.com" && mailCheck === mailValue) {
          console.log("login répertorié dans la BDD : connexion possible !");
          
          this.showAdminDatas = true;
          // si le login existe, la <div> des données "masquées" est révélée :
          // document.getElementById("form-submitted2").hidden = false;

          return;

        } else {

          this.showAdminDatas = false;

          alert("Votre login ou votre mail (admin) semble incorrect...");

          return;

        }

      } else {  // utile ?? (à retester si nécessaire)
        
        console.log("Aucun login répertorié : connexion impossible !");

        this.showAdminDatas = false;

        // méthode (DOM) pour enlever le composant (plus que le masquer):
        // let formsubmitted2 = document.getElementById("form-submitted2");
        // formsubmitted2.parentNode.removeChild(formsubmitted2);

        // si le login n'est pas reconnu dans la BDD, la <div> reste masquée :
        // document.getElementById("form-submitted2").hidden = true;

        alert("Admin non répertorié...");

        return;
      }

    });
      
  }

  onAdminDeconnect(){

    this.showAdminDatas = false;
    this.adminForm.reset({ login: '', mail: '' }); // le contenu des champs est bien effacé
    
  }


}