import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { debounceTime, distinctUntilChanged, switchMap, map, startWith } from 'rxjs/operators';

import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

import { User } from '../../../todo-class/user';
import { UsersService} from '../../../todo-data-service/users.service';

@Component({
  selector: 'app-autocomplete-form-inscription-clean',
  templateUrl: './autocomplete-form-inscription-clean.component.html',
  styleUrls: ['./autocomplete-form-inscription-clean.component.scss'],
  providers: [
    UsersService
  ]
})

export class AutocompleteFormInscriptionCleanComponent implements OnInit {

  // Affichage ou non des boutons avec *ngIf :
  showPreUpdateUserButton = true; // SI L'ON SOUHAITE UN BOUTON DE PRÉVALIDATION
  showUpdateUserButton = false; 
  showUserInscriptionButton = true;
  showCancelButton = false;


  // CHAMPS AUTO-COMPLETE (MÉTHODE AVEC OBSERVABLE QUI MARCHE AVEC DES DONNÉES RÉELLES = objets en input)
  
  user = { 
    id_user: '', 
    user_firstname: '',
    user_lastname: '', 
    login: '',
    password: '', 
    mail: ''
  };
  
  // users: User[]; // ?? pour onDelete2()
  editUser: User;

  //  nameSp = new FormControl();

  // pour observables (variables avec $):
  public user$: User[]; 
  public data$: any = []; // nécessaire sous ce type (any - les autres ne semblent pas marcher...) (tableau vide) car utilisé pour filtrer les données saisies (_loginFilter, _mailFilter)


  loginFilteredOptions: Observable<any>;
  mailFilteredOptions: Observable<any>;

  /* MÉTHODE POUR AVOIR UN FORMULAIRE  :*/
  
  // inscriptionForm: FormGroup;

  inscriptionForm = new FormGroup (
  {
    login: new FormControl(this.user.login, [
      Validators.required
    ]),
    mail: new FormControl(this.user.mail, [
      Validators.required,
      Validators.email
    ])
  });

  // inscriptionForm = this.fb.group({ // groupe de champs de recherches pour la validation d'un formulaire 'réactif'
  //   //  firstName: ['', Validators.required], // exemple de champs simple, à la différence des tableaux de données utilisés ici :
  //   login: ['', Validators.required]
  // });


  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
  ) {
    // this.usersService.getUsers() // apparemment pas conseillé comme ça (à revoir si possible...)
    // .subscribe(data$ => {  
    //   this.data$ = data$;
    // });
    // this.usersService.getUsers().subscribe(login$ => {  // indiquer ici la route vers l'api choisie
    //   this.login$ = login$;
    // });
    // this.usersService.getUsers().subscribe(mail$ => {
    //   this.mail$ = mail$;
    // });
  }

  // ECOUTE DES VALEURS DU CHAMPS LOGIN
  get login() {
    return this.inscriptionForm.get('login') as FormControl;
  }

  // ECOUTE DES VALEURS DU CHAMPS MAIL
  get mail() {
    return this.inscriptionForm.get('mail') as FormControl;
  }


  // // RECHERCHE LES CHAMPS CORRESPONDANTS AU MOYEN DES MÉTHODES DU FICHIER 'users.service.ts' (= TABLEAU DE STRINGS)
  private _loginFilter(value: string): any {

    this.showUserInscriptionButton = true;
    this.showPreUpdateUserButton = true;
    this.showUpdateUserButton = false; 

    console.log(value);

    // méthode appelée pour l'update de la liste des logins du champs auto-complete : (ÉVITE APPELS DES DONNÉES DANS LE CONSTRUCTEUR...)
    this.usersService.getUsers()
    .subscribe(data$ => {
      this.data$ = data$
      console.log(this.data$);
      return this.data$
    });
    
    console.log(this.data$);

    // const logins = this.users;
    const datas = this.data$;
    console.log(datas);
    const userData = [];

    for (let i = 0; i < datas.length; i++) {
      userData.push(datas[i].login);
    }

    console.log(userData);
    const filterValue = value.toLowerCase();
    
    return userData.filter(user => user
      .toLowerCase()
      .includes(filterValue)
    );

  }



  private _mailFilter(value: string): any {

    this.showUserInscriptionButton = true;
    this.showPreUpdateUserButton = true;
    this.showUpdateUserButton = false;
    
    // TEST: méthode appelée pour l'update de la liste des logins du champs auto-complete :
    this.usersService.getUsers()
    .subscribe(data$ => {
      this.data$ = data$
      console.log(this.data$);
      return this.data$
    });
      
    console.log(this.data$);

    const datas = this.data$;
    console.log(datas);
    const mailData = [];

    for (let i = 0; i < datas.length; i++) {
      mailData.push(datas[i].mail);
    }

    console.log(mailData);
    const filterValue = value.toLowerCase();
    
    return mailData
    .filter(user => user
      .toLowerCase()
      .includes(filterValue)
    );

  }


  // onSubmit() {
  //   // TODO: Use EventEmitter with form value
  //   console.log('VALUE NAME_SPECIE \'ON SUBMIT _\' DANS UN CHAMPS DE FORMULAIRE : ' + this.inscriptionForm.value.login);
  // }

  // APPEL DES DONNÉES GÉNÉRALES SUR LES UTILISATEURS:
  private getUsers(): any {

    return this.usersService.getUsers()
    .subscribe(user$ => (this.user$ = user$));

  }



  ngOnInit() {

    this.getUsers();

    // ÉCOUTER LES CHANGEMENTS DANS LES DONNÉES TAPÉES DANS LE CHAMPS (= STRING):
    this.loginFilteredOptions = this.login.valueChanges
    .pipe(
      startWith(''),
      map(value => this._loginFilter(value)),
      debounceTime(300)
    );

    this.mailFilteredOptions = this.mail.valueChanges
    .pipe(
      startWith(''),
      map(value => this._mailFilter(value)),
      debounceTime(300)
    );

  }


  // NECESSAIRE POUR L'UPDATE:
  onEdit(user: User) {

    console.log(user);
    console.log(this.editUser);

    if(this.editUser === undefined ){

      console.log(this.editUser);

      this.showUpdateUserButton = false; // le bouton update (User) ne disparait pas

    } else if(this.editUser.id_user === null || this.editUser.id_user === undefined) {

      console.log(this.editUser);
      this.editUser = user;
      this.showUpdateUserButton = false; // le bouton update (User) disparait

    } else if(this.editUser.id_user !== null || this.editUser.id_user !== undefined) {

      console.log(this.editUser);

      this.editUser.login = user.login;
      console.log(this.editUser.login);

      this.editUser.mail = user.mail;
      console.log(this.editUser.mail);
      
      // alert('Veuillez penser à valider de nouveau pour confirmer la modification du profil...');

      // le bouton Pre-update disparait (si utilisé...) :
      this.showPreUpdateUserButton = false;
      // this.showUpdateUserButton = true;
      this.showCancelButton = true;

    }

  }


  /* cf: methode add() */
  onInscriptionSubmit(login: string, mail: string): void {

    console.log(login);

    this.getUsers();
    console.log(this.getUsers());

    this.editUser = undefined;

    login = login.trim();

    if(!login) {
      return;
    }


    console.log(mail);

    mail = mail.trim();
    if(!mail) {
      return;
    }

    // The server will generate the id for this new user
    let newUser: User = { login, mail } as User;

    this.usersService
    .addUser(newUser)
    .subscribe(user => {

      if(newUser) {
        this.user.login = newUser.login;
        this.user.mail = newUser.mail;
      }

      return;

    });
    // .subscribe(user => this.users.push(user));

    newUser = undefined;
    this.inscriptionForm.reset({ login: '', mail: '' }); // le contenu des champs est bien effacé

    this.showUserInscriptionButton = true; // le bouton d'inscription ne disparait pas
    this.showCancelButton = false;

  }


  onLoginSelect(valueLogin: string): any {
    
    console.log(valueLogin); // valeur récupérée dans la liste déroulante (auto-complete)

  // partie champs 'login' à réaliser :

    // ETAPES :
    // à la sélection d'un utilisateur(login) dans la liste (mat-auto-complete):
    // le champs 'login' affiche le login sélectionné : OK !

    // on récupère id_user pour l'update():
    //    --> appel à l'API (get) avec pour paramètre le login choisi : OK !
    //    --> 'SELECT 'id_user', 'mail' FROM `users` WHERE login='"+login+"'; : OK !
    // à l'update: mise à jour du login après modification de login: OK !
    // le champs 'mail' affiche le mail correspondant: OK !
    
    // problème de MAJ de la liste des données login sélectionnées: avancé... OK... un peu lent au changement
    // problème : boutons submit update et confirmation disparus après update: Ok ! résolu

    // A ajouter: 
    // bouton d'annulation de la mise à jour en cours (apparaissant avant confirmation): OK !
    // bouton de reset du formulaire: ok!

    // reset du formulaire après la mise à jour du membre: efface liste de logins: OK !
    // reset du formulaire après l'inscription d'un nouveau membre: OK !
    // reset du formulaire après la désinscription d'un membre: marche pas... 

    // si le membre existe, bouton d'inscription = désactivé: OK !
    // bouton de désinscription (pas essentiel: présent dans la liste déroulante): à revoir plus tard si nécessaire...


  // partie champs 'mail' (update) à réaliser :

    // méthode onMailSelect() à créer : OK !

    // problèmes :

    // return = insertion d'un nouveau membre -> IRRÉSOLU
    // si sélection d'un membre (ex: 'login') > clic en dehors > reclic dans le champs : bouton pré-update disparait et confirmer apparait

    this.usersService.getSingleUserLogin(valueLogin)
    .subscribe(user$ => {

      // user$ = objet User[] récupéré à l'API pour avoir les données de l'usager sélectionné
      this.user$ = user$
      console.log(this.user$);

      if(this.user$) {

        this.editUser = this.user$[0];
        console.log(this.editUser);

        if(this.editUser !== undefined || this.editUser !== null) {

          this.inscriptionForm.setValue({ login: this.editUser.login, mail: this.editUser.mail });

          this.showUserInscriptionButton = false; // le bouton d'inscription disparait si le membre sélectionné existe déjà
          this.showCancelButton = true;

        }

      } else {

        this.inscriptionForm.reset({ login: '', mail: '' }); // le contenu des champs est bien effacé
        this.showUserInscriptionButton = true; // le bouton d'inscription ne disparait pas
        this.showCancelButton = false;

      }

    });

  }


  onMailSelect(valueMail: string): any {
    
    console.log(valueMail); // valeur récupérée dans la liste déroulante (auto-complete)

    // partie champs 'mail' (update) à finir :

    this.usersService.getSingleUserMail(valueMail)
    .subscribe(user$ => {

      this.user$ = user$

      if(this.user$) {

        console.log(this.user$);

        this.editUser = this.user$[0];
        console.log(this.editUser);

        if(this.editUser !== undefined || this.editUser !== null) {

          this.inscriptionForm.setValue({ login: this.editUser.login, mail: this.editUser.mail });

          this.showUserInscriptionButton = false; // le bouton d'inscription disparait si le membre sélectionné existe déjà
          this.showCancelButton = true;

        }

      } else {
        this.inscriptionForm.reset({ login: '', mail: '' }); // le contenu des champs est bien effacé

        this.showUserInscriptionButton = true; // le bouton d'inscription ne disparait pas
        this.showCancelButton = false;
      }

    });

  }


  // MÉTHODE similaire à onEdit(user), appliquée au bouton de pré-update:
  onPreUpdate(user: User) {

    console.log(user);
    console.log(this.editUser);

    if(this.editUser === undefined ){

      console.log(this.editUser);

      this.showUpdateUserButton = false; // le bouton update (User) ne disparait pas

    } else if(this.editUser.id_user === null || this.editUser.id_user === undefined) {

      console.log(this.editUser);
      this.editUser = user;

      this.showUpdateUserButton = false; // le bouton update (User) disparait

    } else if(this.editUser.id_user !== null || this.editUser.id_user !== undefined) {

      console.log(this.editUser);

      this.editUser.login = user.login;
      console.log(this.editUser.login);

      this.editUser.mail = user.mail;
      console.log(this.editUser.mail);
      
      // le bouton Pre-update disparait (si utilisé...), le bouton Update apparait :
      this.showPreUpdateUserButton = false;
      this.showUpdateUserButton = true;
      this.showCancelButton = true;

    }

  }

  onUpdate() {
      
    console.log(this.editUser);

    if (this.editUser) {

      this.usersService
      .updateUser(this.editUser)
      .subscribe(user => {
        
        const ix = user ? this.user$.findIndex(u => u.id_user === user.id_user) : -1;
        
        if(ix > -1) {
          this.user$[ix] = user;
        }
  
      });
      
      this.editUser = undefined; // réinitialisation de la variable

      // Cette fois, le bouton Update disparait, (le bouton Pre-Update apparait, si utilisé...) :
      this.showUpdateUserButton = false;
      this.showPreUpdateUserButton = true;

      this.inscriptionForm.reset({ login: '', mail: '' }); // le contenu des champs est bien effacé

      this.showUserInscriptionButton = true; // le bouton d'inscription ne disparait pas
      this.showCancelButton = false;

    }

  }


  onResetAction() {

    // Cette fois, le bouton Update disparait, le bouton Pre-Update apparait :
    this.showUpdateUserButton = false;
    this.showPreUpdateUserButton = true;

    this.editUser = undefined; // réinitialisation de la variable
    // this.user$ = undefined;

    this.inscriptionForm.reset({ login: '', mail: '' }); // le contenu des champs est bien effacé

    this.showUserInscriptionButton = true; // le bouton d'inscription ne réapparait pas
    this.showCancelButton = false;

  }


  // DELETE (MARCHE AVEC LE FORMULAIRE, PAR LA LISTE DU CHAMPS LOGIN, OU PAR BOUTONS SUR LE TABLEAU D'ÉLÉMENTS)
  onDelete(login: string): void {

    console.log(login);
    
    this.usersService
    .deleteUser3(login)
    .subscribe();

    // this.inscriptionForm.reset({ login: '', mail: '' }); // le contenu des champs est bien effacé: A RETESTER

    this.showUserInscriptionButton = true; // le bouton d'inscription ne disparait pas
    this.showCancelButton = false;

  }

  // DELETE2 (AVEC BOUTON) : A REVOIR SI UTILISÉ ICI, SINON, MARCHE DANS 'MEMBERS-LIST': pb ici : "users = undefined"

  // onDelete2(user: User): void {

  //   console.log(user);

  //   this.users = this.users.filter(u => u !== user);

  //   this.usersService
  //   .deleteUser2(user)
  //   .subscribe();

  // }



}
