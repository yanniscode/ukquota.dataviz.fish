import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartUpdateComponent } from '../../../todo-class/chart-update/chart-update.component';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import Chart from 'chart.js';

import { FishService } from '../../../todo-data-service/fish.service';
import { Fish } from '../../../todo-class/fish';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
const moment = _moment;

import { LinechartOptionsService } from '../../../todo-class/linechart-options';


@Component({
  selector: 'app-dates-chart',
  templateUrl: './dates-chart.component.html',
  styleUrls: ['./dates-chart.component.scss'],
  providers: [
    FishService
  ]
})


export class DatesChartComponent<D> implements OnInit {

  @ViewChild(ChartUpdateComponent) chartUpdateComponent: ChartUpdateComponent;

  public fishing$: Fish[];
  public nameSp$: Fish[]; // ou Object;
  public superZone$: Fish[];
  public zone$: Fish[];
  public date$: Fish[];
  public date2$: Fish[];
  begin: D | null;
  end: D | null;
  // searchForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private fishService: FishService,
    private linechartOptionsService: LinechartOptionsService
    ) {}



  // ************ METHODE 1 : ******************

  searchForm = this.fb.group({ // pour ajouter des champs de recherche
    nameSp: this.fb.array([
      this.fb.control('Toutes Espèces'),
      //  this.fb.control('', Validators.required),
    ]),
    superZ: this.fb.array([
      this.fb.control('')
    ]),
    zone: this.fb.array([
      this.fb.control('Toutes Zones')
    ]),
    date: this.fb.array([
      this.fb.control('')
    ]),
    date2: [{ begin: new Date(2018, 1, 7), end: new Date() }], // 2018, 1, 7 / 2018, 9, 31 // ancienne version : pb input (ordre )
    // date range : version avec Moment.js : marche pas !
    // date2: [{
    //   begin: new FormControl(moment('01-04-2017', 'DD-MM-YYYY')),
    //   end: new FormControl(moment(new Date()))
    // }], // 2018, 1, 7 / 2018, 9, 31

    // begin: new Date(2018, 1, 7) / moment([2018, 1, 7]) - end: new Date()

    // test Moment date :
    date3 : new FormControl(moment('01-04-2017', 'DD-MM-YYYY')) // marche : April 4, 2017
    // date3 : new FormControl(moment('20170131', 'YYYYDDMM')), // marche : January 1, 2019
    // date3 : new FormControl(moment([2017, 0, 1])), // marche : January 1, 2019
});



//  MyControl = new FormControl();
//  filteredOptions: Observable<String[]>;
//  nameSp: string[] = ['One', 'Two', 'Three'];

// ***************

/*
  get fishings() {
    return this.searchForm.get('fishings') as FormArray;
  }
*/

// ******************

  get nameSp() {
  //  console.log(this.searchForm.get('nameSp') as FormArray);
  //  return this.searchForm.value;
    return this.searchForm.get('nameSp') as FormArray;
  }
  get superZ() {
    return this.searchForm.get('superZ') as FormArray;
  }
  get zone() {
    return this.searchForm.get('zone') as FormArray;
  }
  get date() {
    return this.searchForm.get('date') as FormArray;
  }
  get date2() {
    return this.searchForm.get('date2') as FormArray;
  }
  // test : champs simple date avec Moment.js (marche, mais pas pour un range datepicker)
  // get date3() {
  //   return this.searchForm.get('date3') as FormArray;
  // }


// *****************************

  // MODÈLE DU GRAPHIQUE :

// *****************************

  type = 'line';
  data: any;
  options = this.linechartOptionsService.options;

  ngOnInit(): any {

// *********************************************************************************** //

// ENVOI DES DONNÉES POUR LES DIFFÉRENTES OPTIONS 'SELECT' DU FORMULAIRE DE RECHERCHE  //

// *********************************************************************************** //


  this.fishService.getFishes()
    .subscribe(nameSp$ => { // indiquer ici la route vers l'api choisie : getSomeFishes()...
      this.nameSp$ = nameSp$;

      this.nameSp$.unshift({ // AJOUT d'un choix "toutes zones" au début de la liste 'select'
        id_fishing: 0,
        value_landing: 0,
        value_quota: 0,
        date: null,
        name_specie: 'Toutes Espèces',
        super_zone: 'string',
        zone: 'string',
        z_coord: JSON,
        sz_coord: JSON
      });
    }
  );

  this.fishService.getSuperZone()
    .subscribe(superZone$ => { // indiquer ici la route vers l'api choisie : getSomeFishes()...
      this.superZone$ = superZone$;
    }
  );

  this.fishService.getZone()
    .subscribe(zone$ => { // indiquer ici la route vers l'api choisie : getSomeFishes()...
      this.zone$ = zone$; // LISTE DES ÉLEMENTS DU CHAMPS 'SELECT'
      this.zone$.unshift({ // AJOUT d'un choix "toutes zones" au début de la liste 'select'
        id_fishing: 0,
        value_landing: 0,
        value_quota: 0,
        date: null,
        name_specie: 'string',
        super_zone: 'string',
        zone: 'Toutes Zones',
        z_coord: JSON,
        sz_coord: JSON
      });
    }
  );

  this.fishService.getDate2()
    .subscribe(date2$ => { // indiquer ici la route vers l'api choisie : getSomeFishes()...
      this.date2$ = date2$;
      // console.log('date onInit : ' + date2$[0].date);
    }
  );



// ************************************************************************************** //

// *******************    AFFICHAGE DU GRAPHIQUE GÉNÉRIQUE           ******************** //

// ************************************************************************************** //



    this.fishService.getAllFishingDates() //  indiquer ici la route vers l'api choisie : getSomeFishes()...
      .subscribe(fishes => {

        // this.fishes = fishes;
        // console.log('resultat API :' + fishes[0].value_landing, ' ' + fishes[0].zone);

        // PARSAGE DE DATES (DE DÉBUT ET FIN) : de 'string' au format ('YYYY-MM-DD') vers date Moment.js au format
        // 'fr' et 'LL' (ex : 7 Février 2018)

        // console.log('resultat API : ' + fishes[0].date);
        const dateBegin = fishes[0].date;
        // console.log(dateBegin);
        const parsedDateBegin = moment(dateBegin, 'YYYY-MM-DD').locale('fr').format('LL');
        // console.log(parsedDateBegin);

        const dateEnd = fishes[fishes.length - 1].date;
        // console.log(dateEnd);
        const parsedDateEnd = moment(dateEnd, 'YYYY-MM-DD').locale('fr').format('LL');
        // console.log(parsedDateEnd);


        // const options = { year: 'numeric', month: 'long', day: 'numeric'}; // ex : jour de semaine en lettres : weekday: 'long'

        // DATE DE DÉBUT :
        // console.log(new Intl.DateTimeFormat('fr-FR', options).format(date$.begin)); // date transformée  à partir du format UTC
        // const dateBeginLabelToString = new Intl.DateTimeFormat('fr-FR', options).format(date$.begin);
        // console.log(dateBeginLabelToString);


        // const dateBeginSelect$ = fishes[0].date;
        // const date2BeginDatas = dateBeginSelect$.getDate() + '-' + Number(dateBeginSelect$.getMonth() + 1) + '-'
        // + dateBeginSelect$.getFullYear();
        // console.log(date2BeginDatas);

        // this.type = 'line';

        this.data = {
          labels: [],
          datasets: [
            {
              label: ['Captures (' + parsedDateBegin + ' - ' + parsedDateEnd + ') - ' // date2BeginDatas
              + 'Toutes Espèces', ' ' + 'Toutes Zones'],
              data: [],
              backgroundColor: 'rgba(255, 68, 0, 0.49)', // couleur des boîtes à légende. // #FF6384 (rose de base)
              borderColor: '#ff4500'  // backgroundColor: '#FF6384'
            },
            {
              label: ['Quotas (' + parsedDateBegin + ' - ' + parsedDateEnd + ') - '
              + 'Toutes Espèces', ' ' + 'Toutes Zones'],
              data: [],
              borderColor: '#2d9ab7' // #36A2EB
            }
          ]
        };


        // this.data.datasets[0].label.push(nameSpdatas);
        // this.data.datasets[1].label.push(nameSpdatas);

        // this.data.datasets[0].label.push(zonedatas);
        // this.data.datasets[1].label.push(zonedatas);

        if (Object(fishes).length > 0) {

          for (let i = 0; i < Object(fishes).length; i++) {
          //  for (let i = 0; i < Object.keys(fishs).length; i++) {

            const landingPushDatas = fishes[i].value_landing;  // values: value_landing
            this.data.datasets[0].data.push(landingPushDatas);

            const quotaPushDatas = fishes[i].value_quota;  // values: value_quota
            this.data.datasets[1].data.push(quotaPushDatas);

            const date2pushdatas = fishes[i].date;  // values : date;
            this.data.labels.push(date2pushdatas);

            // const datepushdatas = fishes[i].date;  // values : date;
            // this.data.labels.push(datepushdatas);

          } // fin de boucle 'for'

        } else {
          alert('Pas de donnée...');
        }

// *****************************************************************

        // test légende détachée : (pb: listes à puces...)

        // const linefishes = document.getElementById('linefishes');
        // const myLineFishes = new Chart(linefishes, {
        //    type: 'line',
        //    options: this.options,
        //    data: this.data,
        // });

        // document.getElementById('legend').innerHTML = myLineFishes.generateLegend();

// *****************************************************************

    });



  } // fin de boucle : ngOnInit,




// *********************************************************************************** //

// *****      REQUETES POUR LES OPTIONS 'SELECT' DU FORMULAIRE DE RECHERCHE      ***** //

// *********************************************************************************** //


  onSelect(): any {

/* ********************************************************************************************* */

// LORSQU'ON CHOISIT UN NOM D'ESPÈCE, ON A LA ZONE ET LA PLAGE DE DATES (BEGIN & END) QUI S'ADAPTENT :

    const nameSpSelect$ = this.searchForm.get('nameSp').value;
    // console.log(nameSpSelect$);
    // console.log(nameSpSelect$[0]);
    let  nameSpdatas = nameSpSelect$[0];  // values: name_specie (du template)

    if (nameSpdatas === '' || nameSpdatas === 'Toutes Espèces') {
      nameSpdatas = 'vide';
    }

/* ********************************************************************************************* */

    // LORSQU'ON CHOISIT UNE ZONE, ON A LE NOM D'ESPÈCE ET LA PLAGE DE DATES (BEGIN & END) QUI S'ADAPTENT :

    const zoneSelect$ = this.searchForm.get('zone').value;
    // console.log(zoneSelect$);
    let  zonedatas = zoneSelect$[0];  // values: zones (du template)
    // console.log(zoneSelect$[0]);

    if (zonedatas === '' || zonedatas === 'Toutes Zones') {
      zonedatas = 'vide';
    }


/* ********************************************************************************************* */

    // LORSQU'ON CHOISIT UNE PLAGE DE DATES (BEGIN & END), ON A LE NOM D'ESPÈCE ET LA ZONE QUI S'ADAPTENT : (A FINIR)

    const date2Select$ = this.searchForm.get('date2').value; // date2 = valeur donnée par le formulaire (html > searchForm)
    // console.log(date2Select$);
    // console.log(date2Select$.begin.getFullYear() + '-' + Number(date2Select$.begin.getMonth() + 1) + '-' + date2Select$.begin.getDate());
    // console.log(date2Select$.end.getFullYear() + '-' + Number(date2Select$.end.getMonth() + 1) + '-' + date2Select$.end.getDate());

    // console.log(date2Select$[0]);
    // let  date2Datas = date2Select$[0];  // values: name_specie (du template)


// GESTION D'ERREUR POUR UN CHAMPS DE DATES INVALIDE (VIDE OU PARTIELLEMENT VIDE) :

    if (date2Select$ === null) {
      // console.log(date2Select$);
      alert('Veuillez choisir une plage de dates...');
      return;
    }

// *************************************************

    // const date2Datas = date2Select$; // pour gestion d'erreur date$ = null (à la base) > inutile, sauf pour champs Date SIMPLE ??
    // console.log(date2Datas);

    let date2BeginDatas = date2Select$.begin.getFullYear() + '-' + Number(date2Select$.begin.getMonth() + 1) + '-'
    + date2Select$.begin.getDate();

    if (date2BeginDatas === '' || date2BeginDatas === null || date2BeginDatas === 'Toutes Zones') {
      date2BeginDatas = 'vide';
    }


    let date2EndDatas = date2Select$.end.getFullYear() + '-' + Number(date2Select$.end.getMonth() + 1) + '-'
    + date2Select$.end.getDate();

    if (date2EndDatas === '' || date2EndDatas === null || date2EndDatas === 'Toutes Zones') {
      date2EndDatas = 'vide';
    }


// ****************************************************************************

// METHODES CORRESPONDANTES :

// au nom d'espèce sélectionné, les zones et dates correspondantes sont filtrées : (en test)

// this.fishService.getNewNameSp(nameSpdatas, date2Datas)
this.fishService.getNewZone(nameSpdatas, date2BeginDatas, date2EndDatas)
.subscribe(zone$ => { // indiquer ici la route vers l'api choisie : getSomeFishes()...

  this.zone$ = zone$; // LISTE DES ÉLEMENTS DU CHAMPS 'SELECT'

  this.zone$.unshift({ // AJOUT d'un choix "toutes zones" au début de la liste 'select'
    id_fishing: 0,
    value_landing: 0,
    value_quota: 0,
    date: undefined,
    name_specie: 'Toutes Espèces',
    super_zone: 'Toutes Super-Zones',
    zone: 'Toutes Zones',
    z_coord: JSON,
    sz_coord: JSON
  });

}
);

// ****************************************************************************

// à la zone sélectionnée, les noms d'espèces et dates correspondantes sont filtrées : (en test)
this.fishService.getNewNameSp(zonedatas, date2BeginDatas, date2EndDatas)
  .subscribe(nameSp$ => { // indiquer ici la route vers l'api choisie : getSomeFishes()...

    this.nameSp$ = nameSp$; // LISTE DES ÉLEMENTS DU CHAMPS 'SELECT'

    this.nameSp$.unshift({ // AJOUT d'un choix "toutes zones" au début de la liste 'select'
      id_fishing: 0,
      value_landing: 0,
      value_quota: 0,
      date: null,
      name_specie: 'Toutes Espèces',
      super_zone: 'Toutes Super-Zones',
      zone: 'Toutes Zones',
      z_coord: JSON,
      sz_coord: JSON
    });

  }
);

// ****************************************************************************


    this.fishService.getNewDate2(date2BeginDatas, date2EndDatas)
      .subscribe(date2$ => { // indiquer ici la route vers l'api choisie : getSomeFishes()...
        this.date2$ = date2$; // LISTE DES ÉLEMENTS DU CHAMPS 'SELECT'
    });


  } // FIN DE MÉTHODE 'ONSELECT'












  onReset(): any {


// ACTUALISATION DU FORMULAIRE DE BASE :

    this.searchForm = this.fb.group({
      nameSp: this.fb.array([
        this.fb.control('Toutes Espèces'),
      ]),
      superZ: this.fb.array([
        this.fb.control('')
      ]),
      zone: this.fb.array([
        this.fb.control('Toutes Zones')
      ]),
      date: this.fb.array([
        this.fb.control('')
      ]),
      date2: [{ begin: new Date(2018, 1, 7), end: new Date() }]
    });



// *********************************************************************************** //

//  ACTUALISATION DES REQUETES POUR LES OPTIONS 'SELECT' DU FORMULAIRE DE RECHERCHE     //

// *********************************************************************************** //


this.fishService.getFishes()
.subscribe(nameSp$ => { // indiquer ici la route vers l'api choisie : getSomeFishes()...
  this.nameSp$ = nameSp$;

  this.nameSp$.unshift({ // AJOUT d'un choix "toutes zones" au début de la liste 'select'
    id_fishing: 0,
    value_landing: 0,
    value_quota: 0,
    date: null,
    name_specie: 'Toutes Espèces',
    super_zone: 'string',
    zone: 'string',
    z_coord: JSON,
    sz_coord: JSON
  });
}
);

this.fishService.getSuperZone()
.subscribe(superZone$ => { // indiquer ici la route vers l'api choisie : getSomeFishes()...
  this.superZone$ = superZone$;
}
);

this.fishService.getZone()
.subscribe(zone$ => { // indiquer ici la route vers l'api choisie : getSomeFishes()...
  this.zone$ = zone$; // LISTE DES ÉLEMENTS DU CHAMPS 'SELECT'

  this.zone$.unshift({ // AJOUT d'un choix "toutes zones" au début de la liste 'select'
    id_fishing: 0,
    value_landing: 0,
    value_quota: 0,
    date: null,
    name_specie: 'string',
    super_zone: 'string',
    zone: 'Toutes Zones',
    z_coord: JSON,
    sz_coord: JSON
  });
}
);

this.fishService.getDate2()
.subscribe(date2$ => { // indiquer ici la route vers l'api choisie : getSomeFishes()...
  this.date2$ = date2$;
// console.log(this.date2$);
}
);


// LES DONNÉES NE PROVIENNENT PAS DU FORMULAIRE ICI (IL S'AGIT DU GRAPHIQUE À L'INTIALISATION DE LA PAGE !)
// MODIFICATION DU FORMAT DE LA DATE (UTC) POUR LES LABELS DU GRAPHIQUE :

// const options = { year: 'numeric', month: 'long', day: 'numeric'}; // ex : jour de semaine en lettres : weekday: 'long'
// console.log(new Intl.DateTimeFormat('fr-FR', options).format(date2$.begin)); // date transformée  à partir du format UTC

// // DATE DE DÉBUT :

// const dateBeginLabelToString = new Intl.DateTimeFormat('fr-FR', options).format(date$.begin);
// console.log(dateBeginLabelToString);

// // DATE DE FIN :
// console.log(new Intl.DateTimeFormat('fr-FR', options).format(date$.end)); // date transformée  à partir du format UTC
// const dateEndLabelToString = new Intl.DateTimeFormat('fr-FR', options).format(date$.end);
// console.log(dateEndLabelToString);
// // ******************


// ACTUALISATION DU GRAPHIQUE DE BASE :

    this.fishService.getAllFishingDates() //  indiquer ici la route vers l'api choisie : getSomeFishes()...
      .subscribe(fishes => {

        //  this.fishes = fishes;
        //  console.log('resultat API :' + fishes[0].value_landing, ' ' + fishes[0].zone);
        const dateBegin = fishes[0].date;
        // console.log(dateBegin);
        const parsedDateBegin = moment(dateBegin, 'YYYY-MM-DD').locale('fr').format('LL');
        // console.log(parsedDateBegin);

        const dateEnd = fishes[fishes.length - 1].date;
        // console.log(dateEnd);
        const parsedDateEnd = moment(dateEnd, 'YYYY-MM-DD').locale('fr').format('LL');
        // console.log(parsedDateEnd);

        // this.type = 'line';
        this.data = {
          labels: [],
          datasets: [
            {
              label: ['Captures (' + parsedDateBegin + ' - ' + parsedDateEnd + ') - '
              + 'Toutes Espèces', ' ' + 'Toutes Zones'],
              data: [],
              backgroundColor: 'rgba(255, 68, 0, 0.49)', // couleur des boîtes à légende. // #FF6384 (rose de base)
              borderColor: '#ff4500'  // backgroundColor: '#FF6384'
            },
            {
              label: ['Quotas (' + parsedDateBegin + ' - ' + parsedDateEnd + ') - '
              + 'Toutes Espèces', ' ' + 'Toutes Zones'],
              data: [],
              borderColor: '#2d9ab7' // #36A2EB
            }
          ]
        };

        // this.data.datasets[0].label.push(nameSpdatas);
        // this.data.datasets[1].label.push(nameSpdatas);

        // this.data.datasets[0].label.push(zonedatas);
        // this.data.datasets[1].label.push(zonedatas);

        if (Object(fishes).length > 0) {

          for (let i = 0; i < Object(fishes).length; i++) {
          //  for (let i = 0; i < Object.keys(fishs).length; i++) {


            // plage de date dynamiquement inserée dans les labels captures / quotas
            // console.log(fishes[0].date);
            // const dateLabel1pushdatas = fishes[0].date;

            // console.log(fishes[fishes.length - 1].date);
            // const dateLabel2pushdatas = fishes[fishes.length - 1].date;

            // if (i = 0) {
            // this.data.datasets[0].label.push(dateLabel1pushdatas);
            // }
            // if (i = Object(fishes).length - 1) {
            //   this.data.datasets[1].label.push(dateLabel2pushdatas);
            // }
            // const datepushdatas = fishes[i].date;  // values : date;
            // this.data.labels.push(datepushdatas);


            const landingPushDatas = fishes[i].value_landing;  // values: value_landing
            this.data.datasets[0].data.push(landingPushDatas);

            const quotaPushDatas = fishes[i].value_quota;  // values: value_quota
            this.data.datasets[1].data.push(quotaPushDatas);

            const date2pushdatas = fishes[i].date;  // values : date;
            this.data.labels.push(date2pushdatas);

          } // fin de boucle 'for'

        } else {
          alert('Pas de donnée...');
        }

      }
    );

  }



  onDatesLabels() {

    const superZSelect$ = this.searchForm.get('superZ').value; // SEARCHBOX A RÉALISER
    //  console.log(superZSelect$[0][0]);
    //  const datetostring1 = JSON.stringify(date2$.begin);
    // console.log(datetostring1);

    const nameSpSelect$ = this.searchForm.get('nameSp').value;
    let  nameSpdatas = nameSpSelect$[0];  // values: name_specie (du template)
    let labelnameSp = nameSpdatas;

    if (nameSpdatas === '' || nameSpdatas === 'Toutes Espèces') {
      nameSpdatas = 'vide';
      labelnameSp = 'Toutes Espèces';
    }

    const zoneSelect$ = this.searchForm.get('zone').value;
    // gestion d'une 'ZONE' VIDE :
    let zonedatas = zoneSelect$[0];
    let labelzone = zonedatas;

    if (zonedatas === '' || zonedatas === 'Toutes Zones') {
      zonedatas = 'vide';
      labelzone = 'Toutes Zones';
    }

    // POUR LE CAS D'UN CHAMPS DE DATE SIMPLE DANS UN CHAMPS SELECT :
    // const date$ = this.searchForm.get('date').value;
    // const datedatas = date$;


    const date$ = this.searchForm.get('date2').value;

    // GESTION D'ERREUR POUR UN CHAMPS DE DATES INVALIDE (VIDE OU PARTIELLEMENT VIDE) :
    // console.log(date$);

    if (date$ === null) {
      // console.log(date$);
      alert('Veuillez choisir une plage de dates...');
      return;
    }

  // PARSAGE DE LA DATE (UTC) POUR LES LABELS DU GRAPHIQUE : / PROBLÈME DANS LE FORMATAGE : 1 JOUR DE DIFFÉRENCE AVEC LE FORMULAIRE
  // console.log(date$.begin);
  // const dateBegin = JSON.stringify(date$.begin);
  // console.log(dateBegin);
  // const parsedLongDateBegin = moment(dateBegin, 'YYYY-MM-DD').locale('fr').format('LL'); // pour les labels du graphique
  // console.log(parsedLongDateBegin);
  // const parsedShortDateBegin = moment(dateBegin, 'YYYY-MM-DD').format('YYYY-MM-DD'); // pour le lien avec l'API
  // console.log(parsedShortDateBegin);

  // console.log(date$.end);
  // const dateEnd = JSON.stringify(date$.end);
  // console.log(dateEnd);
  // const parsedLongDateEnd = moment(dateEnd, 'YYYY-MM-DD').locale('fr').format('LL'); // pour les labels du graphique
  // console.log(parsedLongDateEnd);
  // const parsedShortDateEnd = moment(dateEnd, 'YYYY-MM-DD').format('YYYY-MM-DD'); // pour le lien avec l'API
  // console.log(parsedShortDateEnd);


// PARSAGE DE LA DATE (UTC) POUR LES LABELS DU GRAPHIQUE : / PROBLÈME DANS LE FORMATAGE : (VERSION QUI MARCHE)

  const options = { year: 'numeric', month: 'long', day: 'numeric'}; // ex : jour de semaine en lettres : weekday: 'long'

  // DATE DE DÉBUT :
  // console.log(new Intl.DateTimeFormat('fr-FR', options).format(date$.begin)); // date transformée  à partir du format UTC
  const dateBeginLabelToString = new Intl.DateTimeFormat('fr-FR', options).format(date$.begin);
  // console.log(dateBeginLabelToString);

  // DATE DE FIN :
  // console.log(new Intl.DateTimeFormat('fr-FR', options).format(date$.end)); // date transformée  à partir du format UTC
  const dateEndLabelToString = new Intl.DateTimeFormat('fr-FR', options).format(date$.end);
  // console.log(dateEndLabelToString);


  // console.log(date$.begin.getFullYear() + '-' + Number(date$.begin.getMonth() + 1) + '-' + date$.begin.getDate());
  // console.log(date$.end.getFullYear() + '-' + Number(date$.end.getMonth() + 1) + '-' + date$.end.getDate());
  const dateBeginToString = date$.begin.getFullYear() + '-' + Number(date$.begin.getMonth() + 1) + '-' + date$.begin.getDate();
  const dateEndToString = date$.end.getFullYear() + '-' + Number(date$.end.getMonth() + 1) + '-' + date$.end.getDate();
  // console.log(dateBeginToString);
  // console.log(dateEndToString);




// ************************************************************************************** //

// *******************  AFFICHAGE DU GRAPHIQUE SELON LA REQUETE SOUHAITÉE  ************** //

// ************************************************************************************** //

    this.fishService.getAllDates(nameSpdatas, zonedatas, dateBeginToString, dateEndToString)
      .subscribe(fishes => {
        // MÉTHODE RÉCUPÉRANT 'ESPÈCE' ET 'ZONE' SÉLECTIONNÉE

        //  indiquer ici la route vers l'api choisie : getSomeFishes()...
        //  this.fishes = fishes;
        //  console.log('resultat API :' + fishes[0].value_landing, ' ' + fishes[0].zone);

        // this.type = 'line';
        this.data = {
          labels: [],
          datasets: [
            {
              label: ['Captures (' + dateBeginLabelToString + ' - ' + dateEndLabelToString
              + ') - ' + labelnameSp, ' ' + labelzone],
              data: [],
              backgroundColor: 'rgba(255, 68, 0, 0.49)', // couleur des boîtes à légende. // #FF6384 (rose de base)
              borderColor: '#ff4500'  // backgroundColor: '#FF6384'
            },
            {
              label: ['Quotas (' + dateBeginLabelToString + ' - ' + dateEndLabelToString
              + ') - ' + labelnameSp, ' ' + labelzone],
              data: [],
              borderColor: '#2d9ab7' // #36A2EB
            }
          ]
        };

        // this.data.datasets[0].label.push(nameSpdatas);
        // this.data.datasets[1].label.push(nameSpdatas);

        // this.data.datasets[0].label.push(zonedatas);
        // this.data.datasets[1].label.push(zonedatas);

        if (Object(fishes).length > 0) {

          for (let i = 0; i < Object(fishes).length; i++) {
          //  for (let i = 0; i < Object.keys(fishs).length; i++) {

            const landingPushDatas = fishes[i].value_landing;  // values: value_landing
            this.data.datasets[0].data.push(landingPushDatas);

            const quotaPushDatas = fishes[i].value_quota;  // values: value_quota
            this.data.datasets[1].data.push(quotaPushDatas);

            const date2pushdatas = fishes[i].date;  // values : date;
            this.data.labels.push(date2pushdatas);

            // const datepushdatas = fishes[i].date;  // values : date;
            // this.data.labels.push(datepushdatas);

          } // fin de boucle 'for'

        } else {
          alert('Pas de donnée...');
        }

      }
    );

  }

} // fin de classe 'ChartChangeComponent'
