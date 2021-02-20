// *** DÉTAILS DU TRAVAIL:  
// partie champs 'login' réalisée :

// ETAPES :

// **** RÉSOLU: 

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
// bouton de reset du formulaire: OK!

// reset du formulaire après la mise à jour du membre: efface liste de logins: OK !
// reset du formulaire après l'inscription d'un nouveau membre: OK !
// reset du formulaire après la désinscription d'un membre: marche pas... 

// si le membre existe, bouton d'inscription = désactivé: OK !

// boutons de suppressions : message d'avertissement (js): ok !

// bouton de désinscription (pas essentiel: présent dans la liste déroulante et la liste des membres): à revoir plus tard si nécessaire...

// si sélection d'un membre (ex: 'login') > clic en dehors > reclic dans le champs : bouton pré-update disparait et confirmer apparait -> OK! (bouton annulé apparait)


// partie champs 'mail' (update) à réaliser :
// méthode onMailSelect() à créer : OK !

// **** A REVOIR ??

// Touche 'return' = insertion d'un nouveau membre (= problème ??)  -> semble ne pas poser de pb

// si création de membre: bouton de pré-update est là (mais pas activable... donc pas trop de pb): à revoir

// **** PROBLÈMES ACTUELS:

// ???

// ***********************


import { Component, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';

import { debounceTime, map, startWith } from 'rxjs/operators';

import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

import { User } from '../../../shared/todo-class/user';
import { UsersService} from '../../../todo-data-service/users.service';

@Component({
  selector: 'app-autocomplete-form-inscription-clean',
  templateUrl: './autocomplete-form-inscription-clean.component.html',
  styleUrls: ['./autocomplete-form-inscription-clean.component.scss'],
  providers: [  
    UsersService,  //  * utilisation du service restreinte à ce composant (plus sécu ?)
  ]
})

export class AutocompleteFormInscriptionCleanComponent implements OnChanges, OnInit, OnDestroy {

  // Affichage ou non des boutons avec *ngIf :
  private showPreUpdateUserButton: boolean = false; // SI L'ON SOUHAITE UN BOUTON DE PRÉVALIDATION
  private showUpdateUserButton: boolean = false; 
  private showUserInscriptionButton: boolean = true;
  private showCancelButton: boolean = false;

  // CHAMPS AUTO-COMPLETE (MÉTHODE AVEC OBSERVABLE QUI MARCHE AVEC DES DONNÉES RÉELLES = objets en input)
  
  // *** note: Attention ! nécessaire d'instancier l'objet 'user' (vide) et 'editUser' pour l'inscription :
  private user: User;

  private editUser: User;

  // *** note: variables à $ = pour observables (type d'objet = tableau de User[], récupéré à l'API pour avoir les données de l'usager sélectionné)
  private user$: User[] = [];
  private usersList: Observable<User[]> = null;
  

// *** note: valeurs filtrés de la liste "select" en sortie de méthode de filtrage :
  private userFilterLogin: string[] = [];
  private userFilterMail: string[] = [];

// *** note: valeurs filtrés de la liste "select" à l'init:
// *** ATTENTION: noms de variables suffixé obligatoirement par "Options", ici, visiblement...
  private loginFilteredOptions: Observable<string[]> = null;  // modif
  private mailFilteredOptions: Observable<string[]> = null;


// *** note: variable du formulaire (reactive-form):
  private inscriptionForm: FormGroup;

  public constructor(
    private usersService: UsersService,
  ) {

    this.inscriptionForm = new FormGroup (
    {
      login: new FormControl(this.user$, [ // *** note : type d'écriture = pour 'reactive form'
        Validators.required,
        Validators.minLength(4),
      ]),
      mail: new FormControl(this.user$, [
        Validators.required,
        Validators.email,
      ])
    });

    this.usersService = usersService;


    // *** On peut instancier, dans le constructeur, l'appel des utilisateurs (observable) utilisé dans les souscriptions (appels dynamiques des données):
    this.usersList = this.usersService.getUsers();

    // *** On peut instancier ici l'utilisation des filtres sur les champs 'autocomplete':
    this.loginFilteredOptions = this.login.valueChanges
    .pipe(
      startWith(''),
      map(value => this._loginFilter(value)),
      debounceTime(100),
    );

    this.mailFilteredOptions = this.mail.valueChanges
    .pipe(
      startWith(''),
      map(value => this._mailFilter(value)),
      debounceTime(100)
    );

  }


  
  // ECOUTE DES VALEURS DU CHAMPS LOGIN:
  private get login(): FormControl {
    return this.inscriptionForm.get('login') as FormControl;
  }

  // ECOUTE DES VALEURS DU CHAMPS MAIL:
  private get mail(): FormControl {
    return this.inscriptionForm.get('mail') as FormControl;
  }

  // ECOUTE DES ID_USER:
  private get id_user(): FormControl {
    return this.inscriptionForm.get('id_user') as FormControl;
  }


  // ADAPTE LES LISTES 'SELECT' CORRESPONDANTES AUX LETTRES SAISIES AU MOYEN DES MÉTHODES DU FICHIER 'users.service.ts' (= TABLEAU DE STRINGS)
  private _loginFilter(value: string): string[] {

  // *** Note: méthode appelée pour l'update de la liste (select) des logins du champs auto-complete :
    const usersDataSubscription: Subscription = this.usersList
    .subscribe(user$ => {

      const loginDatas: User[] = user$;

      const userData: Array<string> = [];

      for (let i: number = 0; i < loginDatas.length; i++) {
        userData.push(loginDatas[i].login);
      }
      
      const filterValue: string = value.toLowerCase();
      
      this.userFilterLogin = userData.filter(user => user
        .toLowerCase()
        .includes(filterValue));

    });

    setTimeout(() => {
      usersDataSubscription.unsubscribe();
    }, 1000);

    return this.userFilterLogin;      
  }


  private _mailFilter(value: string): string[] {
    
    // *** Note: méthode appelée pour l'update de la liste des logins du champs auto-complete :
    const usersDataSubscription: Subscription = this.usersList
    .subscribe(user$ => {

      const mailDatas: User[] = user$
    
      const userData: Array<string> = [];

      for (let i: number = 0; i < mailDatas.length; i++) {
        userData.push(mailDatas[i].mail);
      }
      
      const filterValue: string = value.toLowerCase();
      
      this.userFilterMail = userData.filter(user => user
        .toLowerCase()
        .includes(filterValue));
    });

    setTimeout(() => {
      usersDataSubscription.unsubscribe();
    }, 10000);
    
    return this.userFilterMail;
  }


  // NECESSAIRE POUR L'UPDATE:
  public ngOnChanges(): void {

      if(this.editUser === null || this.editUser === undefined) {

        this.showPreUpdateUserButton = false; // *** le bouton update (User) ne disparait pas du html 
        this.showUpdateUserButton = false; // *** le bouton update (User) disparait du html 

      } else if(this.editUser !== null && this.editUser !== undefined) {
      
        // *** Note: le bouton Pre-update disparait du html (si utilisé...) :
        this.showUserInscriptionButton = true;
        this.showPreUpdateUserButton = true;
        this.showCancelButton = true;

      }


    return;
  }


  public ngOnInit(): void {
    // console.log("inscription form oninit !");
    return;
  }


  public onInscriptionSubmit(login: string, mail: string): void {

    this.editUser = undefined;

    login = login.trim();

    if(!login) {
      return;
    }

    mail = mail.trim();

    if(!mail) {
      return;
    }

    // Le serveur va générer l'id pour le nouvel utilisateur :
    let newUser: User = { login, mail } as User;

    const usersDataSubscription: Subscription = this.usersService
    .addUser(newUser)
    .subscribe(user => {
      if(newUser) {
        this.user.login = newUser.login;
        this.user.mail = newUser.mail;
      }
      return;
    });

    setTimeout(() => {
      usersDataSubscription.unsubscribe();
    }, 10000);

  // *** RESET DU FORMULAIRE APRÈS INSCRIPTION :
    newUser = undefined;
    this.inscriptionForm.reset({ login: '', mail: '' }); // *** note: le contenu des champs est effacé

    this.showUserInscriptionButton = true; // *** le bouton d'inscription ne disparait pas
    this.showCancelButton = false;  // *** le bouton d'annulation disparait

    return;
  }


  public onLoginSelect(valueLogin: string): void {

  // *** valeur récupérée dans la liste déroulante (select) :
   
    const usersDataSubscription: Subscription = this.usersService.getSingleUserLogin(valueLogin)
    .subscribe(user$ => {

      this.user$ = user$

      if(this.user$) {

        this.editUser = this.user$[0];

        if(this.editUser !== undefined && this.editUser !== null) {
          
          // AFFICHAGE DES DONNÉES DU USER SÉLECTIONNÉ DANS LES CHAMPS DU FORMULAIRE :
          this.inscriptionForm.setValue({ login: this.editUser.login, mail: this.editUser.mail });

          // le bouton d'inscription disparait si le membre sélectionné existe déjà :
          this.showUserInscriptionButton = false; 
          this.showCancelButton = true;

        }

      } else {
        this.editUser = undefined;

        this.inscriptionForm.reset({ login: '', mail: '' }); // *** note: le contenu des champs est effacé

        this.showUserInscriptionButton = true; // le bouton d'inscription ne disparait pas
        this.showCancelButton = false;
      }

    });

    setTimeout(() => {
      usersDataSubscription.unsubscribe();
    }, 10000);

    return;
  }


  public onMailSelect(valueMail: string): void {
    
    // *** Note: paramètre valueMail: valeur récupérée dans la liste déroulante (select):
    const usersDataSubscription: Subscription = this.usersService.getSingleUserMail(valueMail)
      .subscribe(user$ => {

      this.user$ = user$

      if(this.user$) {

        this.editUser = this.user$[0];

        if(this.editUser !== undefined && this.editUser !== null) {

          this.inscriptionForm.setValue({ login: this.editUser.login, mail: this.editUser.mail });
        
        // le bouton d'inscription disparait si le membre sélectionné existe déjà:
          this.showUserInscriptionButton = false; 
          this.showCancelButton = true;

        }

      } else {

        this.inscriptionForm.reset({ login: '', mail: '' }); // le contenu des champs est bien effacé

        this.showUserInscriptionButton = true; // le bouton d'inscription ne disparait pas
        this.showCancelButton = false;

        this.editUser = undefined;
      }

    });
    
    setTimeout(() => {
      usersDataSubscription.unsubscribe();
    }, 10000);

    return;
  }



  // *** note: MÉTHODE similaire à onEdit(user) / ngOnChanges(), appliquée au bouton de pré-update:
  public onPreUpdate(): void {

    if(this.editUser === undefined ) {

      this.showUpdateUserButton = false; // *** le bouton update (User) ne disparait pas

    } else if(this.editUser.id_user === null || this.editUser.id_user === undefined) {

      this.showUpdateUserButton = false; // *** le bouton update (User) disparait

    } else if(this.editUser.id_user !== null || this.editUser.id_user !== undefined) {

      this.editUser.login = this.inscriptionForm.value.login;

      this.editUser.mail = this.inscriptionForm.value.mail;
      
      // le bouton Pre-update disparait (si utilisé...), le bouton Update apparait :
      this.showPreUpdateUserButton = false;
      this.showUpdateUserButton = true;
      this.showCancelButton = true;

    }
    return;
  }

  public onUpdate(): void {
      
    if (this.editUser) {

      const usersDataSubscription: Subscription = this.usersService
        .updateUser(this.editUser)
        .subscribe(user => {
          
          const ix: number = user ? this.user$.findIndex(u => u.id_user === user.id_user) : -1;
          
          if(ix > -1) {
            this.user$[ix] = user;
          }
    
      });

      setTimeout(() => {
        usersDataSubscription.unsubscribe();
      }, 10000);
      
      // *** Note: réinitialisation de la variable après l'update:
      this.editUser = undefined;

    // *** Note: Cette fois, le bouton Update disparait, (le bouton Pre-Update apparait, si utilisé...) :
      this.showUpdateUserButton = false;
      this.showPreUpdateUserButton = true;

      this.inscriptionForm.reset({ login: '', mail: '' }); // *** le contenu des champs est effacé

      this.showUserInscriptionButton = true; // *** le bouton d'inscription ne disparait pas
      this.showCancelButton = false;

    }
    return;

  }


  public ngOnDestroy(): void {

    // *** Note: Reset formulaire:

    // *** le bouton Update disparait, le bouton Pre-Update apparait :
    this.showUpdateUserButton = false;
    this.showPreUpdateUserButton = true;

    this.editUser = undefined; // *** réinitialisation de la variable editUser

    this.inscriptionForm.reset({ login: '', mail: '' }); // *** le contenu des champs est bien effacé

    this.showUserInscriptionButton = true; // *** le bouton d'inscription ne réapparait pas
    this.showCancelButton = false;
   
    return;
  }

  public onPreDelete(login: string): void {
  
    if (confirm('Souhaitez-vous vraiment supprimer ce membre ?')) {

      // *** Nettoyer le champs après delete ou non (avec timeout) : 
      setTimeout(() => {
        this.inscriptionForm.reset({ login: '', mail: '' }); // *** le contenu des champs est effacé
      }, 1);

    // *** APPEL (INDEIRECT) DE LA MÉTHODE 'onDelete(login)':
      this.onDelete(login);

    } else {

    // *** Nettoyer le champs après delete ou non (avec timeout) : 
      setTimeout(() => {
        this.inscriptionForm.reset({ login: '', mail: '' }); // *** le contenu des champs est effacé
      }, 300);

    }
    return;
  }

  // *** DELETE (MARCHE AVEC LE FORMULAIRE, PAR LA LISTE DU CHAMPS LOGIN, OU PAR BOUTONS SUR LE TABLEAU D'ÉLÉMENTS)
  private onDelete(login: string): void {
   
    const usersDataSubscription: Subscription = this.usersService.deleteUserByLogin(login)
    .subscribe();

    setTimeout(() => {
      usersDataSubscription.unsubscribe();
    }, 10000);
    
    this.showUserInscriptionButton = true; // *** le bouton d'inscription ne disparait pas
    this.showCancelButton = false;  // *** le bouton d'annulation disparait

    return;
  }


}
