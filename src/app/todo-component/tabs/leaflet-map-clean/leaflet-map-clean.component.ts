import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';

import * as L from 'leaflet';

import { FishService } from '../../../todo-data-service/fish.service';
import { Fish } from '../../../todo-class/fish'; // pas besoin ici ???

import { FormBuilder } from '@angular/forms'; // pour le formulaire de recherche
import { FormArray } from '@angular/forms';

import * as _moment from 'moment';

const moment = _moment;


@Component({
  selector: 'app-leaflet-map-clean',
  templateUrl: './leaflet-map-clean.component.html',
  styleUrls: ['./leaflet-map-clean.component.scss'],
  providers: [
    // FishService // NÉCESSAIRE : déjà dans 'app.module' ??
  ]
})

export class LeafletMapCleanComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('mapDiv') mapContainer;

  public fishing$: Fish[];
  public nameSp$: Fish[]; // ou Object;
  public superZone$: Fish[];
  public zone$: Fish[];
  public date$: Fish[];

  public map: L.Map = null; // ajout perso
  public map2: L.Map = null; // ajout perso
  public polygonLayer: L.Polygon = null; // ajout perso

  constructor(
    private fb: FormBuilder,
    private fishService: FishService
  ) { }

    searchForm = this.fb.group({ // pour ajouter des champs de recherche
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
        this.fb.control(new Date()) // ######### marche pas !
        // this.fb.control(new Date().toISOString().slice(0, 10)) // DATE DU JOUR POUR NGONINIT
        // this.fb.control('2018-1-7') // TEST AVEC UNE DATE STRING POUR NGONINIT
      ])
      // date: new FormControl(new Date(2018, 1, 6)), // format pour le 06/02/2018 = new Date(2018, 1, 6)
    //  date2: [{ begin: new Date(2018, 1, 6), end: new Date() }] // 2018, 1, 6 / 2018, 9, 31
    });

    // ******************

  get nameSp() {
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


  // Fonction d'initialisation du composant.
  ngOnInit(): any {

    // console.log('ngOnInit() :');
    // console.log(this.map);

    this.fishService.getFishes()
    .subscribe(nameSp$ => { // indiquer ici la route vers l'api choisie : getFishes()...
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

    this.fishService.getZone()
      .subscribe(zone$ => { // indiquer ici la route vers l'api choisie
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
      .subscribe(date$ => { // indiquer ici la route vers l'api choisie
        this.date$ = date$;
      });


    // ************************************************************************************** //

// *******************    AFFICHAGE DE LA CARTE 'LEAFLET' GÉNÉRIQUE           ******************** //

// ************************************************************************************** //

    this.fishService.getAllFishingZones()
      .subscribe((fishes: any) => {

      // PARSAGE DE LA DATE (DE STRING À STRING REFORMATÉE AU FORMAT FRANÇAIS)
      const date = fishes[0].date;
      const parsedDate = moment(date, 'YYYY-MM-DD').locale('fr').format('LL');
      console.log(parsedDate);

      // TOUTES ESPÈCES ET NON-UNDEFINED INDIQUÉ... :
      const nameSpSelect$ = this.searchForm.get('nameSp').value;
      let  nameSpdatas = nameSpSelect$[0];
      if (nameSpdatas === '' || nameSpdatas === 'Undefined') {
        nameSpdatas = 'Toutes Espèces';
      }


      // **********

      // initialisation de la carte :
      // console.log(this.map);
      if ( this.map == null ) {
        this.initMap();
      }
      const myfrugalmap = this.map;

      // **********

      const labelPopupOptions = { // voir aussi le style avec classe 'leaflet-tooltip' et '::before' dans 'styles.scss'
        opacity: 1, // 0.3
        sticky: true,
        interactive: true,
      };


      fishes.forEach(z_coord => {

        // **** test polygon sur zone :
        // console.log(z_coord);
        // console.log(z_coord.zone);
        // console.log(z_coord.value_landing);
        // console.log(z_coord.z_coord);
        // console.log(z_coord.name_specie);
        // console.log(Array.from(z_coord.z_coord));

        if (z_coord.name_specie === undefined || z_coord.name_specie === null || z_coord.name_specie === '') {
          z_coord.name_specie = 'Toutes Espèces';
        }

        let polygonColor = 'green';
        // console.log(polygonColor);

        // if (Object(fishes).length > 0) {

          if (z_coord.value_quota - z_coord.value_landing >= 0) { // si le quota n'est pas atteint
            polygonColor = 'blue';
            // console.log(polygonColor);

            const layer = L.polygon(z_coord.z_coord,
              {color: polygonColor, dashArray: '15, 10', weight: 0.3})
              .addTo(myfrugalmap); // dasharray = pointillés (longueur du trait,longueur du vide)

            layer.bindTooltip('<i>' + z_coord.name_specie + '</i><br>' + '<b>' + z_coord.zone + '</b>' + '<br>Value landing : '
            + z_coord.value_landing + '<br>Value Quota : ' + z_coord.value_quota, labelPopupOptions);
            layer.addTo(myfrugalmap);
            // layer.openTooltip();

          } else if (z_coord.value_quota - z_coord.value_landing <= 0) {    // si le quota est dépassé
            polygonColor = 'red';
            console.log(polygonColor);

            const layer = L.polygon(z_coord.z_coord,
              {color: polygonColor, dashArray: '15, 10', weight: 0.5}).addTo(myfrugalmap); // color: 'red' //dasharray

            layer.bindTooltip('<i>' + z_coord.name_specie + '</i><br>' + '<b>' + z_coord.zone + '</b>' + '<br>Value landing : '
            + z_coord.value_landing + '<br>Value Quota : ' + z_coord.value_quota, labelPopupOptions); // , {permanent: true}
            layer.addTo(myfrugalmap);
            // layer.openTooltip();

          }

        // } else {
        //   alert('Pas de donnée...');
        //   // alert('Pas de nouvelle donnée pour aujourd\'hui...');
        // }

      });

      // ************** LEGENDE TEST : (marche !)
      // cf : https://stackoverflow.com/questions/49096159/how-to-add-legend-to-leaflet-map-written-by-angular-and-ngx-leaflet

      // console.log(fishes);
      const v1 = fishes[0].value_landing;
      const v3 = fishes[0].value_quota;
      const v2 = Math.round(v3 - v1 );
      // const v2 = this.min + Math.round((this.max - this.min ) / 2);

      const legend = new (L.Control.extend({
        options: { position: 'bottomleft' }
      }));


      legend.onAdd = function () { // myfrugalmap

        // MA LÉGENDE :
        const div = L.DomUtil.create('div', 'legend');

        const labels = [
          'Quotas respectés - <b>écarts >= à 0 (en tonnes)</b>',
          'Quotas dépassés - <b>écarts < 0 (en tonnes)</b>',
        ];

        const grades = ['#0000ff', '#ff0000']; // 'blue', 'red'

        div.innerHTML = '<div style="background: grey; opacity: 0.8; color: black;"><div style="text-align: center;">'
        + '<b>Légende</b></div><br />' // style="background: grey;
        + '<div>Date : <b>' + parsedDate + '</b></div>' //  avant : fishes[0].date
        + '<div>Nom d\'espèce : <b>' + nameSpdatas + '</b></div><br />' // fishes[0].name_specie
        + '<i style="background:' + grades[0] + '"> &nbsp; &nbsp; &nbsp;</i> &nbsp; &nbsp;' + labels[0]
        + '<br />' // grades[1]
        + '<i style="background:' + grades[1] + '"> &nbsp; &nbsp; &nbsp;</i> &nbsp; &nbsp;' + labels[1]
        + '<br /></div>'; // grades[1]

        return div;

      };

      legend.addTo(myfrugalmap);

    }); // fin de getAllFishingZones

  } // fin de 'ngOnInit'




  onSelect(): any {

    /* ********************************************************************************************* */


    // LORSQU'ON CHOISIT UN NOM D'ESPÈCE, ON A LA ZONE ET LA PLAGE DE DATES (BEGIN & END) QUI S'ADAPTENT :

    const nameSpSelect$ = this.searchForm.get('nameSp').value;
    // console.log(nameSpSelect$);
    console.log(nameSpSelect$[0]);
    let  nameSpdatas = nameSpSelect$[0];  // values: name_specie (du template)

    if (nameSpdatas === '' || nameSpdatas === 'Toutes Espèces') {
      nameSpdatas = 'vide';
    }

    /* ********************************************************************************************* */

    // LORSQU'ON CHOISIT UNE ZONE, ON A LE NOM D'ESPÈCE ET LA PLAGE DE DATES (BEGIN & END) QUI S'ADAPTENT :

    const zoneSelect$ = this.searchForm.get('zone').value;
    console.log(zoneSelect$);
    console.log(zoneSelect$[0]);
    let  zonedatas = zoneSelect$[0];  // values: name_specie (du template)

    if (zonedatas === '' || zonedatas === 'Toutes Zones') {
      zonedatas = 'vide';
    }

    /* ********************************************************************************************* */

    // LORSQU'ON CHOISIT UNE DATES SIMPLE, ON A LE NOM D'ESPÈCE ET LA ZONE QUI S'ADAPTENT : (A FINIR)

    const dateSelect$ = this.searchForm.get('date').value; // date = valeur donnée par le formulaire (html > searchForm)
    console.log(dateSelect$);

    // ATTENTION : pour un champs select, date = string >> PAS DE TRANSFORMATION
    let dateSelectToString = dateSelect$;

    // pour un datepicker, date = format UTC >> TRANSFORMATION EN STRING : 'YYYY-MM-DD'
    // let dateSelectToString = dateSelect$.getFullYear() + '-' + Number(dateSelect$.getMonth() + 1) + '-' + dateSelect$.getDate();
    console.log(dateSelectToString); // MODE D'AFFICHAGE À REVOIR

    // GESTION D'ERREUR POUR UN CHAMPS DE DATES INVALIDE (VIDE OU PARTIELLEMENT VIDE) :
    if (dateSelectToString[0] === null || dateSelectToString === 'Toutes Dates') {
      console.log(dateSelectToString);
      dateSelectToString = 'vide';
      alert('Veuillez choisir une date...');
      return;
    }

    // ****************************************************************************

    // METHODES CORRESPONDANTES :

    // au nom d'espèce sélectionné, les zones et dates correspondantes sont filtrées : (en test)

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


  } // fin onSelect()




  onReset(): any {

    console.log('onReset() : ');
    console.log(this.map);

  // ACTUALISATION DU FORMULAIRE DE BASE :

  this.searchForm = this.fb.group({
    nameSp: this.fb.array([
      this.fb.control('Toutes Espèces')
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
    // RESET DE LA CARTE :
    // *********************************************************************************** //


    this.fishService.getAllFishingZones() //  indiquer ici la route vers l'api choisie : getSomeFishes()...
    .subscribe((fishes: any) => {

      // PARSAGE DE LA DATE (DE STRING À STRING REFORMATÉE AU FORMAT FRANÇAIS)
      const date = fishes[0].date;
      const parsedDate = moment(date, 'YYYY-MM-DD').locale('fr').format('LL');
      // console.log(parsedDate);

      // TOUTES ESPÈCES ET NON UNDEFINED INDIQUÉ... :
      const nameSpSelect$ = this.searchForm.get('nameSp').value;
      let  nameSpdatas = nameSpSelect$[0];
      if (nameSpdatas === '' || nameSpdatas === 'Undefined') {
        nameSpdatas = 'Toutes Espèces';
      }


      // *************

      if (this.map) {  // PB : SUPPRESSION DE LA MAP AVEC LES LAYERS > marche pas
        this.map.remove();
      }

      // // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
      this.map = L.map(this.mapContainer.nativeElement, { minZoom: 2, maxZoom: 10 })
      .setView([51.509865, -0.118092], 4); // 4 = niveau de zoom à l'affichage

      const myfrugalmap = this.map;

      // *** MAP LAYERS :
      L.tileLayer('http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg').addTo(myfrugalmap); // TEST FILTRE MAP

      L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}.pbf')
      .addTo(myfrugalmap);

      // **************

      const labelPopupOptions = { // voir aussi le style avec classe 'leaflet-tooltip' et '::before' dans 'styles.scss'
      // permanent: true,
        opacity: 1, // 0.3
        sticky: true,
        interactive: true,
      };

      fishes.forEach(z_coord => {

        // **** Polygones sur les zones :

        // console.log(z_coord);
        // console.log(z_coord.zone);
        // console.log(z_coord.value_landing);
        // console.log(z_coord.z_coord);
        // console.log(Array.from(z_coord.z_coord));

        if (z_coord.name_specie === undefined || z_coord.name_specie === null || z_coord.name_specie === '') {
          z_coord.name_specie = 'Toutes Espèces';
        }

        let polygonColor = 'green';
        console.log(polygonColor);


        // if (Object(fishes).length > 0) { // s'il y a des données

        if (z_coord.value_quota - z_coord.value_landing >= 0) { // si le quota n'est pas atteint
        polygonColor = 'blue';
        // console.log(polygonColor);

        const layer = L.polygon(z_coord.z_coord,
          {color: polygonColor, dashArray: '15, 10', weight: 0.3})
          .addTo(myfrugalmap); // dasharray = pointillés (longueur du trait,longueur du vide)

        // new L.tooltip(){}
        layer.bindTooltip('<i>' + z_coord.name_specie + '</i><br>' + '<b>' + z_coord.zone + '</b>' + '<br>Value landing : '
        + z_coord.value_landing + '<br>Value Quota : ' + z_coord.value_quota, labelPopupOptions);

        layer.addTo(myfrugalmap);
        // layer.openTooltip();

      } else if (z_coord.value_quota - z_coord.value_landing <= 0) {    // si le quota est dépassé
        polygonColor = 'red';
        // console.log(polygonColor);

        const layer = L.polygon(z_coord.z_coord,
          {color: polygonColor, dashArray: '15, 10', weight: 0.5}).addTo(myfrugalmap); // color: 'red' //dasharray

        layer.bindTooltip('<i>' + z_coord.name_specie + '</i><br>' + '<b>' + z_coord.zone + '</b>' + '<br>Value landing : '
        + z_coord.value_landing + '<br>Value Quota : ' + z_coord.value_quota, labelPopupOptions); // option : , {permanent: true}
        layer.addTo(myfrugalmap);
        // layer.openTooltip();

      }

        // } else {
        //   alert('Pas de donnée...');
        //   // alert('Pas de nouvelle donnée pour aujourd\'hui...');
        // }


      });

      // ************** LEGENDE TEST : (marche !)
      // cf : https://stackoverflow.com/questions/49096159/how-to-add-legend-to-leaflet-map-written-by-angular-and-ngx-leaflet

      console.log(fishes);
      const v1 = fishes[0].value_landing;
      // const v1 = this.min;
      const v3 = fishes[0].value_quota;
      // const v3 = this.max;
      const v2 = Math.round(v3 - v1 );
      // const v2 = this.min + Math.round((this.max - this.min ) / 2);

      const legend = new (L.Control.extend({
        options: { position: 'bottomleft' }
      }));


      legend.onAdd = function () { // myfrugalmap

        // MA LÉGENDE :
        const div = L.DomUtil.create('div', 'legend');

        const labels = [
          'Quotas respectés - <b>écarts >= à 0 (en tonnes)</b>',
          'Quotas dépassés - <b>écarts < 0 (en tonnes)</b>',
        ];

        const grades = ['#0000ff', '#ff0000']; // 'blue', 'red'

        div.innerHTML = '<div style="background: grey; opacity: 0.8; color: black;"><div style="text-align: center;">'
        + '<b>Légende</b></div><br />'
        + '<div>Date : <b>' + parsedDate + '</b></div>' //  avant : fishes[0].date
        + '<div>Nom d\'espèce : <b>' + nameSpdatas + '</b></div><br />' // fishes[0].name_specie
        + '<i style="background:' + grades[0] + '"> &nbsp; &nbsp; &nbsp;</i> &nbsp; &nbsp;' + labels[0]
        + '<br />' // grades[1]
        + '<i style="background:' + grades[1] + '"> &nbsp; &nbsp; &nbsp;</i> &nbsp; &nbsp;' + labels[1]
        + '<br /></div>'; // grades[1]

        return div;

      };

      legend.addTo(myfrugalmap);


    }); // fin de getAllFishingZones()


  } // fin onReset()



  onZonesLabels(): any {

    console.log('onZonesLabels() : ');
    console.log(this.map);

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


    // *********************************************************************************** //
    // AFFICHAGE DE LA CARTE (AVEC DES DONNÉES SÉLECTIONNÉES):
    // *********************************************************************************** //

    this.fishService.getAllZones(nameSpdatas, zonedatas, dateAString)
    //    this.httpService.get('./api/AllSpeciesAtZone', {responseType: 'json'})
      .subscribe((fishes: any) => {
        // GESTION D'ERREUR (CHAMPS DATE NON COMPLÉTÉ)
        console.log(fishes[0]);
        const datedatas = fishes[0];

        if (datedatas === undefined) {
          alert('Veuillez choisir une date.');
          return;
        }

        if (nameSpdatas === 'vide') {
          nameSpdatas = 'Toutes Espèces';
        }

        // PARSAGE DE LA DATE (DE STRING À STRING REFORMATÉE AU FORMAT FRANÇAIS)
        const date = fishes[0].date;
        console.log(date);
        const parsedDate = moment(date, 'YYYY-MM-DD').locale('fr').format('LL');
        console.log(parsedDate);


        // *****************************

        // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.

        this.map.remove();

        this.map = L.map(this.mapContainer.nativeElement, { minZoom: 2, maxZoom: 10 })
        .setView([51.509865, -0.118092], 4); // 4 = niveau de zoom à l'affichage

        const myfrugalmap = this.map;

        // *** MAP LAYERS :
        L.tileLayer('http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg').addTo(myfrugalmap); // TEST FILTRE MAP

        L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}.pbf')
        .addTo(myfrugalmap);

        const labelPopupOptions = { // voir aussi le style avec classe 'leaflet-tooltip' et '::before' dans 'styles.scss'
          opacity: 1, // 0.3
          sticky: true,
          interactive: true
        };

        fishes.forEach(z_coord => {

          // **** test polygon sur zone :

          console.log(z_coord);
          console.log(z_coord.zone);
          console.log(z_coord.value_landing);
          console.log(z_coord.z_coord);
          // console.log(Array.from(z_coord.z_coord));

          if (z_coord.name_specie === undefined || z_coord.name_specie === null || z_coord.name_specie === '') {
            z_coord.name_specie = 'Toutes Espèces';
          }

          let polygonColor = 'green';
          console.log(polygonColor);

          // if (Object(fishes).length > 0) {

            if (z_coord.value_quota - z_coord.value_landing >= 0) { // si le quota n'est pas atteint
            polygonColor = 'blue';
            console.log(polygonColor);

            const layer = L.polygon(z_coord.z_coord,
              {color: polygonColor, dashArray: '15, 10', weight: 0.3})
              .addTo(myfrugalmap); // dasharray = pointillés (longueur du trait,longueur du vide)

            layer.bindTooltip('<i>' + z_coord.name_specie + '</i><br>' + '<b>' + z_coord.zone + '</b>' + '<br>Value landing : '
            + z_coord.value_landing + '<br>Value Quota : ' + z_coord.value_quota, labelPopupOptions);
            layer.addTo(myfrugalmap);
            // layer.openTooltip();

          } else if (z_coord.value_quota - z_coord.value_landing <= 0) {    // si le quota est dépassé
            polygonColor = 'red';
            // console.log(polygonColor);

            const layer = L.polygon(z_coord.z_coord,
              {color: polygonColor, dashArray: '15, 10', weight: 0.5}).addTo(myfrugalmap); // color: 'red' //dasharray

            layer.bindTooltip('<i>' + z_coord.name_specie + '</i><br>' + '<b>' + z_coord.zone + '</b>' + '<br>Value landing : '
            + z_coord.value_landing + '<br>Value Quota : ' + z_coord.value_quota, labelPopupOptions); // OPTION : , {permanent: true}
            layer.addTo(myfrugalmap);
            // layer.openTooltip();

          }


        // } else {
        //   alert('Pas de donnée...');
        //   // alert('Pas de nouvelle donnée pour aujourd\'hui...');
        // }


        }); // fin de forEach()


        // ************** LEGENDE TEST : (marche !)
        // cf : https://stackoverflow.com/questions/49096159/how-to-add-legend-to-leaflet-map-written-by-angular-and-ngx-leaflet

        console.log(fishes);
        const v1 = fishes[0].value_landing;
        // const v1 = this.min;
        const v3 = fishes[0].value_quota;
        // const v3 = this.max;
        const v2 = Math.round(v3 - v1 );
        // const v2 = this.min + Math.round((this.max - this.min ) / 2);

        const legend = new (L.Control.extend({
          options: { position: 'bottomleft' }
        }));


        legend.onAdd = function () { // myfrugalmap

          // MA LÉGENDE :
          const div = L.DomUtil.create('div', 'legend');

          const labels = [
            'Quotas respectés - <b>écarts >= à 0 (en tonnes)</b>',
            'Quotas dépassés - <b>écarts < 0 (en tonnes)</b>',
          ];

          const grades = ['#0000ff', '#ff0000']; // 'blue', 'red'

          div.innerHTML = '<div style="background: grey; opacity: 0.8; color: black;"><div style="text-align: center;">'
          + '<b>Légende</b></div><br />'
          + '<div>Date : <b>' + parsedDate + '</b></div>' //  avant : fishes[0].date
          + '<div>Nom d\'espèce : <b>' + nameSpdatas + '</b></div><br />' // fishes[0].name_specie
          + '<i style="background:' + grades[0] + '"> &nbsp; &nbsp; &nbsp;</i> &nbsp; &nbsp;' + labels[0]
          + '<br />' // grades[1]
          + '<i style="background:' + grades[1] + '"> &nbsp; &nbsp; &nbsp;</i> &nbsp; &nbsp;' + labels[1]
          + '<br /></div>'; // grades[1]

          return div;

        };

        legend.addTo(myfrugalmap);

    }); // fin de getAllZones()

  } // fin onZonesLabels()


  ngAfterViewInit() {

    // this.map = L.map(this.mapContainer.nativeElement);
    console.log('ngAfterViewInit() : ');
    console.log(this.map);
    // if (this.map) {
    //   this.map.remove();
    // }
    this.map.invalidateSize(); // ***** NÉCESSAIRE ??  (en test...)

  } // fin de 'ngAfterViewInit'

  ngOnDestroy() {
    // this.map = L.map(this.mapContainer.nativeElement);
    console.log('ngOnDestroy() : ');
    console.log(this.map);
    if (this.map) {
      this.map.remove();
    }

  }

  initMap() { // méthode pour l'initialisation de la carte

    console.log('initMap() : ');
    console.log(this.map);

    // if (this.map) {
    //   this.map.remove();
    // }

    this.map = L.map(this.mapContainer.nativeElement, { minZoom: 2, maxZoom: 10 })
    .setView([51.509865, -0.118092], 4); // 4 = niveau de zoom à l'affichage


    const myfrugalmap = this.map;

    // ARCGIS BASEOCEANMAP (MARCHE) :
    // L.tileLayer('https://server.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', {
    // // L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
    // attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri'
    // }).addTo(myfrugalmap);

    // *** MAP LAYERS :
    // LAYER DES SOUS-ZONES MARITIMES (MARCHE) :
    // LAYER AQUARELLE (MARCHE)
    L.tileLayer('http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg').addTo(myfrugalmap); // TEST FILTRE MAP
    // LAYER DE NOMS DE MERS ET OCEANS :
    L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}.pbf')
    .addTo(myfrugalmap);
    // LAYER des sous-zones :
    // L.tileLayer('http://gis.ices.dk/gis/rest/services/ICES_reference_layers/ICES_Areas/MapServer/tile/{z}/{y}/{x}').addTo(myfrugalmap);

  }


}
