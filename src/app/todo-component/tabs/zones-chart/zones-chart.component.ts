import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router'; // pour la route de 'api.js' ??

import { FishService } from '../../../todo-data-service/fish.service';
import { Fish } from '../../../todo-class/fish';

import { ChartUpdateComponent } from '../../../todo-class/chart-update/chart-update.component';
import { BarchartOptionsService } from '../../../todo-class/barchart-options';

import { FormBuilder } from '@angular/forms'; // pour le formulaire de recherche
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-zones-chart',
  templateUrl: './zones-chart.component.html',
  styleUrls: ['./zones-chart.component.scss'],
  providers: [
    FishService // NÉCESSAIRE ??
  ]
})
export class ZonesChartComponent<D> implements OnInit {

  @ViewChild(ChartUpdateComponent) chartUpdateComponent: ChartUpdateComponent;

  public fishing$: Fish[];
  public nameSp$: Fish[]; // ou Object;
  public superZone$: Fish[];
  public zone$: Fish[];
  public date$: Fish[];
  // public date2$: Fish[];
  // begin: D | any;
  // end: D | null;
  // searchForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private fishService: FishService,
    private barchartOptionsService: BarchartOptionsService
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
        this.fb.control(new Date()) // ######### marche pas !
        // this.fb.control(new Date().toISOString().slice(0, 10)) // DATE DU JOUR POUR NGONINIT
        // this.fb.control('2018-1-7') // TEST AVEC UNE DATE STRING POUR NGONINIT
      ])
      // date: new FormControl(new Date(2018, 1, 6)), // format pour le 06/02/2018 = new Date(2018, 1, 6)
    //  date2: [{ begin: new Date(2018, 1, 6), end: new Date() }] // 2018, 1, 6 / 2018, 9, 31
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
  // get date2() {
  //   return this.searchForm.get('date2') as FormArray;
  // }

  type = 'bar';
  data: any;
  options = this.barchartOptionsService.options;

// MODÈLE du graphique :

  // type = 'bar';
  // data: any = {
  //   labels: [],
  //   datasets: [
  //     {
  //       label: [],
  //       data: [],
  //       backgroundColor: 'rgba(255, 68, 0, 0.49)', // couleur des boîtes à légende. // #FF6384 (rose de base)
  //       borderColor: '#ff4500' // backgroundColor: '#FF6384'
  //     },
  //     {
  //       label: [],
  //       data: [],
  //       backgroundColor: 'rgba(45, 154, 185, 0.54)', // #36A2EB (bleu de base)
  //       borderColor: '#2d9ab7'
  //     }
  //   ]
  // };

  // options = {
  //   responsive: true,
  //   //  maintainAspectRatio: true,
  //   scales: {
  //     xAxes: [
  //       {
  //         stacked: false, // axes superposés = désactivé
  //         ticks: {
  //           beginAtZero: true
  //         }
  //       }
  //     ],
  //     yAxes: [
  //       {
  //         stacked: false,
  //         ticks: {
  //           beginAtZero: true
  //         }
  //       }
  //     ]
  //   },
  //   labels: [{
  //     time: {
  //       unit: 'day'
  //     }
  //   }],
  //   pan: {
  //     enabled: false,
  //     mode: 'xy',
  //     speed: 20,
  //     threshold: 10
  //   },
  //   zoom: {
  //     enabled: false,
  //     mode: 'xy',
  //     sensitivity: 100,
  //     rangeMin: {
  //       // Format of min pan range depends on scale type
  //       x: null,
  //       y: 0  // le graphique ne prend pas en compte les chiffres négatifs
  //     },
  //   },
  //   rangeMax: {
  //     // Format of max pan range depends on scale type
  //     x: null,
  //     y: null
  //   }
  // };

  ngOnInit(): any {


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
      });

    // this.fishService.getSuperZone()
    //   .subscribe(superZone$ => { // indiquer ici la route vers l'api choisie : getSomeFishes()...
    //     this.superZone$ = superZone$;
    //   });

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
      });

    this.fishService.getDate()
    .subscribe(date$ => { // indiquer ici la route vers l'api choisie : getSomeFishes()...
      this.date$ = date$;
      // console.log(this.date$);
    });

    // this.fishService.getDate2()
    //   .subscribe(date2$ => { // indiquer ici la route vers l'api choisie : getSomeFishes()...
    //     this.date2$ = date2$;
    //   // console.log(this.date2$);
    //   });

  /*
      // TEST LISTE DE PECHES :
      this.fishService.getAllFishings().subscribe(
        fishing$ => { // indiquer ici la route vers l'api choisie : getSomeFishes()...
        this.fishing$ = fishing$;
        }
      );
  */
    //  this.fishService.getAllFishings();



    // ************************************************************************************** //

// *******************    AFFICHAGE DU GRAPHIQUE GÉNÉRIQUE           ******************** //

// ************************************************************************************** //

// UTILISÉ ???
// let dateToString = this.searchForm.value.date; // cas d'un champs select date
// console.log(dateToString);

// // const dateLabelToString = dateToString;

// if (dateToString === '' || dateToString === 'Toutes dates') {
//   // modification de l'UTC date pour les 'labels' du graphique :
//   dateToString = 'vide';
//   // dateLabelToString = 'Toutes Dates';
// }


// ***********

  this.fishService.getAllFishingZones() //  indiquer ici la route vers l'api choisie : getSomeFishes()...
  // this.fishService.getAllFishingZones(dateToString)
    .subscribe(fishes => {

      // PARSAGE DE LA DATE (DE STRING À STRING REFORMATÉE AU FORMAT FRANÇAIS)
      const date = fishes[0].date;
      const parsedDate = moment(date, 'YYYY-MM-DD').locale('fr').format('LL');
      // console.log(parsedDate);

      // this.type = 'bar';
      this.data = {
        labels: [],
        datasets: [
          { // valeurs de date (API) : fishes[0].date (problème apparence)
            label: ['Captures (le ' + parsedDate + ') - ' + 'Toutes Espèces', ' ' + 'Toutes Zones'], // fishes[0].date
            // label: ['Captures (le ' + dateLabelToString + ') - ' + 'Toutes Espèces', ' ' + 'Toutes Zones'],
            data: [],
            backgroundColor: 'rgba(255, 68, 0, 0.49)', // couleur des boîtes à légende. // #FF6384 (rose de base)
            borderColor: '#ff4500' // backgroundColor: '#FF6384'
          },
          {
            label: ['Quotas (le ' + parsedDate + ') - ' + 'Toutes Espèces', ' ' + 'Toutes Zones'], // fishes[0].date
            // label: ['Quotas (le ' + dateLabelToString + ') - ' + 'Toutes Espèces', ' ' + 'Toutes Zones'],
            data: [],
            backgroundColor: 'rgba(45, 154, 185, 0.54)', // #36A2EB (bleu de base)
            borderColor: '#2d9ab7'
          }
        ]
      };

      if (Object(fishes).length > 0) {

        for (let i = 0; i < Object(fishes).length; i++) {
    //    for (let i = 0; i < Object.keys(fishes).length; i++) {

          const landingdatas = fishes[i].value_landing;  // values: value_landing
          this.data.datasets[0].data.push(landingdatas);

          const quotadatas = fishes[i].value_quota;  // values: value_quota
          this.data.datasets[1].data.push(quotadatas);

          const zonesdatas = fishes[i].zone;  // values : date;
          this.data.labels.push(zonesdatas);

        } // fin de boucle 'for'
        // alert('De nouvelles données sont arrivées...');

      }  else {
        alert('Pas de donnée...');
        // alert('Pas de nouvelle donnée pour aujourd\'hui...');
      }

    }
  );


} // fin de Méthode 'ngOnInit'









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
    // console.log(zoneSelect$[0]);
    let  zonedatas = zoneSelect$[0];  // values: name_specie (du template)

    if (zonedatas === '' || zonedatas === 'Toutes Zones') {
      zonedatas = 'vide';
    }


/* ********************************************************************************************* */

    // LORSQU'ON CHOISIT UNE DATES SIMPLE, ON A LE NOM D'ESPÈCE ET LA ZONE QUI S'ADAPTENT : (A FINIR)

    const dateSelect$ = this.searchForm.get('date').value; // date = valeur donnée par le formulaire (html > searchForm)
    console.log(dateSelect$);
    // console.log(date2Select$.begin.getFullYear() + '-' + Number(date2Select$.begin.getMonth() + 1) + '-' + date2Select$.begin.getDate());
    // console.log(date2Select$.end.getFullYear() + '-' + Number(date2Select$.end.getMonth() + 1) + '-' + date2Select$.end.getDate());

    // console.log(date2Select$[0]);
    // let  date2Datas = date2Select$[0];  // values: name_specie (du template)

  //  let dateDatas = dateSelect$;

  // ATTENTION : pour un champs select, date = string >> PAS DE TRANSFORMATION
  let dateSelectToString = dateSelect$;

  // pour un datepicker, date = format UTC >> TRANSFORMATION EN STRING : 'YYYY-MM-DD'
  // let dateSelectToString = dateSelect$.getFullYear() + '-' + Number(dateSelect$.getMonth() + 1) + '-' + dateSelect$.getDate();
  // console.log(dateSelectToString); // MODE D'AFFICHAGE À REVOIR

  // GESTION D'ERREUR POUR UN CHAMPS DE DATES INVALIDE (VIDE OU PARTIELLEMENT VIDE) :
  if (dateSelectToString[0] === null || dateSelectToString === 'Toutes Dates') {
    // console.log(dateSelectToString);
    dateSelectToString = 'vide';
    alert('Veuillez choisir une date...');
    return;
  }

// *************************************************

  // const date2Datas = date2Select$; // pour gestion d'erreur date$ = null (à la base) > inutile, sauf pour champs Date SIMPLE ??
  // console.log(date2Datas);

  // let date2BeginDatas = date2Select$.begin.getFullYear() + '-' + Number(date2Select$.begin.getMonth() + 1) + '-'
  // + date2Select$.begin.getDate();

  // if (date2BeginDatas === '' || date2BeginDatas === null || date2BeginDatas === 'Toutes Zones') {
  //   date2BeginDatas = 'vide';
  // }


  // let date2EndDatas = date2Select$.end.getFullYear() + '-' + Number(date2Select$.end.getMonth() + 1) + '-'
  // + date2Select$.end.getDate();

  // if (date2EndDatas === '' || date2EndDatas === null || date2EndDatas === 'Toutes Zones') {
  //   date2EndDatas = 'vide';
  // }


// ****************************************************************************

// METHODES CORRESPONDANTES :

// au nom d'espèce sélectionné, les zones et dates correspondantes sont filtrées : (en test)

// this.fishService.getNewNameSp(nameSpdatas, date2Datas)
this.fishService.getNewZoneForSingleDate(nameSpdatas, dateSelectToString)
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

});

// ****************************************************************************

// à la zone sélectionnée, les noms d'espèces et dates correspondantes sont filtrées : (en test)
this.fishService.getNewNamespForSingleDate(zonedatas, dateSelectToString)
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

});

// ****************************************************************************

// à la date sélectionnée, les noms d'espèces et dates correspondantes sont filtrées : (en test)
this.fishService.getNewDateForSingleDate(nameSpdatas, zonedatas)
.subscribe(date$ => { // indiquer ici la route vers l'api choisie : getSomeFishes()...

  this.date$ = date$; // LISTE DES ÉLEMENTS DU CHAMPS 'SELECT'

  // this.date$.unshift({ // AJOUT d'un choix "toutes dates" au début de la liste 'select'
  // // PROBLÈME : UNE DATE N'EST PAS UNE STRING >> PAS POSSIBLE COMME ÇA ! ???
  //   id_fishing: 0,
  //   value_landing: 0,
  //   value_quota: 0,
  //   date: null,
  //   name_specie: 'Toutes Espèces',
  //   super_zone: 'Toutes Super-Zones',
  //   zone: 'Toutes Zones'
  // });

});


// ****************************************************************************

/*
    this.fishService.getNewDate2(date2BeginDatas, date2EndDatas)
      .subscribe(date2$ => { // indiquer ici la route vers l'api choisie : getSomeFishes()...
        this.date2$ = date2$; // LISTE DES ÉLEMENTS DU CHAMPS 'SELECT'
    });
*/

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
      this.fb.control(new Date().toISOString().slice(0, 10)) // DATE DU JOUR POUR NGONINIT
      // this.fb.control('2018-1-7') // TEST AVEC UNE DATE 'STRING' POUR NGONINIT
    ])
    // date: new FormControl(new Date(2018, 1, 7)) // DONNE UNE DATE DE TYPE 'GMT' // POUR UN MAT OU SAT-DATE-PICKER
    // date2: [{ begin: new Date(2018, 1, 7), end: new Date() }] // POUR UN SAT-DATE-PICKER (PLAGE DE DATES)
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
  });

  this.fishService.getSuperZone()
  .subscribe(superZone$ => { // indiquer ici la route vers l'api choisie : getSomeFishes()...
    this.superZone$ = superZone$;
  });

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
  });


  // MODIF #############################

  this.fishService.getDate()
  .subscribe(date$ => { // indiquer ici la route vers l'api choisie : getSomeFishes()...
    this.date$ = date$;
    console.log('DATE TEST ####### ' + this.date$[0].date);
    // this.date$.unshift({
    //   id_fishing: 0,
    //   value_landing: 0,
    //   value_quota: 0,
    //   date: this.date$[0].date,
    //   name_specie: 'string',
    //   super_zone: 'string',
    //   zone: 'string',
    //   z_coord: JSON,
    //   sz_coord: JSON
    // });
  });

// #####################################


  // ******************

  // const date$ = this.searchForm.get('date').value;

  let dateToString = this.searchForm.value.date; // cas d'un champs select date
  console.log(dateToString);

  // const dateLabelToString = dateToString;

  if (dateToString === '' || dateToString === 'Toutes dates') {
    // modification de l'UTC date pour les 'labels' du graphique :
    dateToString = 'vide';
    // dateLabelToString = 'Toutes Dates';
  }


  // *********************************************************************************** //
  // RESET DU GRAPHIQUE :
  // *********************************************************************************** //

  this.fishService.getAllFishingZones() //  indiquer ici la route vers l'api choisie : getSomeFishes()...
  // this.fishService.getAllFishingZones(dateToString) //  indiquer ici la route vers l'api choisie : getSomeFishes()...
  .subscribe(fishes => {

      //  this.fishes = fishes;
      //  console.log('resultat API :' + fishes[0].value_landing, ' ' + fishes[0].zone);

      // PARSAGE DE LA DATE (DE STRING À STRING REFORMATÉE AU FORMAT FRANÇAIS)
      const date = fishes[0].date;
      const parsedDate = moment(date, 'YYYY-MM-DD').locale('fr').format('LL');
      console.log(parsedDate);

      // this.type = 'bar';
      this.data = {
        labels: [],
        datasets: [
          {
            label: ['Captures (le ' + parsedDate + ') - ' + 'Toutes Espèces', ' ' + 'Toutes Zones'], // fishes[0].date
            // label: ['Captures (le ' + dateLabelToString + ') - ' + 'Toutes Espèces', ' ' + 'Toutes Zones'], // fishes[0].date
            data: [],
            backgroundColor: 'rgba(255, 68, 0, 0.49)', // couleur des boîtes à légende. // #FF6384 (rose de base)
            borderColor: '#ff4500' // backgroundColor: '#FF6384'
          },
          {
            label: ['Quotas (le ' + parsedDate + ') - ' + 'Toutes Espèces', ' ' + 'Toutes Zones'], // fishes[0].date
            // label: ['Quotas (le ' + dateLabelToString + ') - ' + 'Toutes Espèces', ' ' + 'Toutes Zones'], // fishes[0].date
            data: [],
            backgroundColor: 'rgba(45, 154, 185, 0.54)', // #36A2EB (bleu de base)
            borderColor: '#2d9ab7'
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

        const zonesdatas = fishes[i].zone;  // values : zone;
        this.data.labels.push(zonesdatas);

      } // fin de boucle 'for'

    } else {
      alert('Pas de donnée...');
      // alert('Pas de nouvelle donnée pour aujourd\'hui...');
    }

  }
  );

}





  onZonesLabels(): any {

    // const superZSelect$ = this.searchForm.get('superZ').value;

    const zoneSelect$ = this.searchForm.get('zone').value;

    // gestion d'une 'ZONE' VIDE :
    let zonedatas = zoneSelect$[0];
    let labelzone = zonedatas;

    if (zonedatas === '' || zonedatas === 'Toutes Zones') {
      zonedatas = 'vide';
      labelzone = 'Toutes Zones';
    }

    const nameSpSelect$ = this.searchForm.get('nameSp').value;
    let  nameSpdatas = nameSpSelect$[0];  // values: name_specie (du template)
    let labelnameSp = nameSpdatas;

    if (nameSpdatas === '' || nameSpdatas === 'Toutes Espèces') {
      nameSpdatas = 'vide';
      labelnameSp = 'Toutes Espèces';
    }

    // console.log(this.searchForm.get('date').value);
    const dateSelect$ = this.searchForm.get('date').value;

    // VARIABLE POUR UN SIMPLE CHAMPS SELECT : (date = 'string')
    const dateAString = dateSelect$[0]; // cas d'un champs select date


    //  const dateLabelToString = date$;

    // VARIABLE POUR UN SIMPLE CHAMPS SELECT : (date = 'string')
    // let dateToString = date$; // cas d'un champs select date
    // const dateLabelToString = date$;
    // console.log(dateToString); // MODE D'AFFICHAGE À REVOIR

    // VARIABLE POUR UN MAT-OU SAT-DATEPICKER A DATE UNIQUE :
    // const options = { year: 'numeric', month: 'long', day: 'numeric'}; // ex : jour de semaine en lettres : weekday: 'long'
    // console.log(new Intl.DateTimeFormat('fr-FR', options).format(date$)); // date transformée  à partir du format UTC
    // let dateLabelToString = new Intl.DateTimeFormat('fr-FR', options).format(date$); // cas d'un mat ou sat datepicker

    // let dateToString = date$.getFullYear() + '-' + Number(date$.getMonth() + 1) + '-' + date$.getDate();
    // console.log(dateToString);


    // GESTION ERREUR CHAMPS DATE 'NULL' :

    // if (dateToString === '' || dateToString === 'Toutes dates') {
    //   // modification de l'UTC date pour les 'labels' du graphique :
    //       dateToString = 'vide';
    //       // dateLabelToString = 'Toutes Dates';
    //     }

        // /********************************** */



    // console.log(this.searchForm.get('date2').value);
    // const date$ = this.searchForm.get('date2').value;
    // console.log(date$.begin);

    // const dateBegin$ = date$.begin;
    // console.log(dateBegin$);

    // const dateBeginToString = dateBegin$.getFullYear() + '-' + Number(dateBegin$.getMonth() + 1) + '-' + dateBegin$.getDate();
    // console.log(dateBeginToString);

    // let  dateDatasBegin = dateBeginToString;  // values: name_specie (du template)
    // const labelDateBegin = dateDatasBegin;
    // if (dateDatasBegin === '' || dateDatasBegin === 'Toutes Espèces') {
    //   dateDatasBegin = 'vide';
    // }

    // const dateEnd$ = date$.end;
    // console.log(dateEnd$);

    // const dateEndToString = dateEnd$.getFullYear() + '-' + Number(dateEnd$.getMonth() + 1) + '-' + dateEnd$.getDate();
    // console.log(dateEndToString);

    // let  dateDatasEnd = dateEndToString;  // values: name_specie (du template)
    // const labelDateEnd = dateDatasEnd;
    // if (dateDatasEnd === '' || dateDatasEnd === 'Toutes Espèces') {
    //   dateDatasEnd = 'vide';
    // }


  // *********************************************************************************** //
  // AFFICHAGE DU GRAPHIQUE (AVEC DES DONNÉES SÉLECTIONNÉES) :
  // *********************************************************************************** //

    // this.type = 'bar';
    this.fishService.getAllZones(nameSpdatas, zonedatas, dateAString)
//    this.httpService.get('./api/AllSpeciesAtZone', {responseType: 'json'})
    .subscribe(
      fishes => {

        // GESTION D'ERREUR (CHAMPS DATE NON COMPLÉTÉ)
        console.log(fishes[0]);
        const datedatas = fishes[0];

        if (datedatas === undefined) {
          alert('Veuillez choisir une date.');
          return;
        }

          // PARSAGE DE LA DATE (DE STRING À STRING REFORMATÉE AU FORMAT FRANÇAIS)
        const date = fishes[0].date;
        console.log(date);
        const parsedDate = moment(date, 'YYYY-MM-DD').locale('fr').format('LL');
        console.log(parsedDate);

        this.data = {
          labels: [],
          datasets: [
            {
              label: ['Captures (le ' + parsedDate + ') - ' + labelnameSp, ' ' + labelzone],
              data: [],
              backgroundColor: 'rgba(255, 68, 0, 0.49)', // couleur des boîtes à légende. // #FF6384 (rose de base)
              borderColor: '#ff4500' // backgroundColor: '#FF6384'
            },
            {
              label: ['Quotas (le ' + parsedDate + ') - ' + labelnameSp, ' ' + labelzone],
              data: [],
              backgroundColor: 'rgba(45, 154, 185, 0.54)', // #36A2EB (bleu de base)
              borderColor: '#2d9ab7'
            }
          ]
        };

        if (Object(fishes).length > 0) {

          for (let i = 0; i < Object(fishes).length; i++) {
      //    for (let i = 0; i < Object.keys(fishes).length; i++) {

            const landingdatas = fishes[i].value_landing;  // values: value_landing
            this.data.datasets[0].data.push(landingdatas);

            const quotadatas = fishes[i].value_quota;  // values: value_quota
            this.data.datasets[1].data.push(quotadatas);

            const zonesdatas = fishes[i].zone;  // values : zone;
            this.data.labels.push(zonesdatas);

          } // fin de boucle 'for'

        }  else {
          alert('Pas de donnée...');
        }

      }
    ); // fin de Méthode 'subscribe'

  } // fin boucle 'onZonesLabels'()'


} // fin de classe 'ChartChangeComponent'
