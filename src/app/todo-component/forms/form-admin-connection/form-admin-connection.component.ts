import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup,  Validators } from '@angular/forms';

import { UsersService } from '../../../todo-data-service/users.service';
import { User } from '../../../shared/todo-class/user';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-admin-connection',
  templateUrl: './form-admin-connection.component.html',
  styleUrls: ['./form-admin-connection.component.scss'],
  providers: [
    UsersService  // *** Note: accès restreint au composant = plus sûr ?
  ]
})


export class FormAdminConnectionComponent implements OnInit, AfterViewInit {

  // *** Note: Affichage de la 'div' avec *ngIf (privilégié à la méthode du DOM)  = false à l'init:
  private showAdminDatas: boolean; 

  private admin$: User[];

  private user: User = { 
    id_user: 0, 
    user_firstname: '', 
    user_lastname: '', 
    login: '', 
    password: '', 
    mail: '',
    role: '',
  };

  private adminForm: FormGroup;

  public get adminLogin(): FormControl { return this.adminForm.get('login') as FormControl; }
  public get adminMail(): FormControl { return this.adminForm.get('mail') as FormControl; }

  public constructor(
    private usersService: UsersService,
  ) {

    this.adminForm = new FormGroup
    (
      {
        login: new FormControl(this.user.login, [
          Validators.required,
        ]),
        mail: new FormControl(this.user.mail, [
          Validators.required,
          Validators.email
        ]),
      }, {}
    );
 
  }


  
  public ngOnInit(): void {

    // console.log('admin form: OnInit');
    this.showAdminDatas = false;
  }


  public ngAfterViewInit(): void {
    // console.log('admin form: AfterViewInit');
  }


  private onAdminSubmit(): void {

    // *** Note: check sur le login et le mail, mais aussi le rôle (dans l'API):
    const loginValue: string = this.adminForm.get('login').value;
    const mailValue: string = this.adminForm.get('mail').value;

    const adminDataSubscription: Subscription = this.usersService.getAdmin(loginValue, mailValue)
      .subscribe(admin$ => {

      this.admin$ = admin$;

      if(admin$[0] !== undefined) {

        const loginCheck: string = admin$[0].login.toString();
        const mailCheck: string = admin$[0].mail.toString();
        const roleCheck: string = admin$[0].role.toString();


        if(loginCheck === loginValue && mailCheck === mailValue && roleCheck === 'admin') {
          
          setTimeout(() => {
            document.getElementById("adminform-connexion").className ="form-connection-container animated fadeOut";
          }, 100);

          setTimeout(() => {
            // *** Note: affichage de l'onglet d'administration :
            this.showAdminDatas = true;
          }, 1600);

          return;

        } else {

          this.showAdminDatas = false;

          alert("Votre login ou votre mail (admin) semble incorrect...");

          return;

        }

      } else {
        
        this.showAdminDatas = false;

        alert("Admin non répertorié...");

        return;
      }

    });

    setTimeout(() => {
      adminDataSubscription.unsubscribe();
    }, 10000);
      
  }

  onAdminDeconnect(): void {
    
    this.adminForm.reset({ login: '', mail: '' }); // *** Note: le contenu des champs est effacé

    document.getElementById("adminform-submitted").className ="animated fadeOut";

    setTimeout(() => {
      this.showAdminDatas = false;

      document.getElementById("adminform-connexion").className ="form-connection-container animated fadeIn";
    }, 1500);

    setTimeout(() => {
      // *** Note: transforme la classe de l'élément >> sans fade in:
      document.getElementById("adminform-connexion").className ="form-connection-container"; 
    }, 3000);

  }


}
