import { Component, OnInit, ViewChild, Input } from '@angular/core';

import * as L from 'leaflet';

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
  selector: 'app-zones-map',
  templateUrl: './zones-map.component.html',
  styleUrls: ['./zones-map.component.scss'],
  providers: [
    FishService // NÉCESSAIRE ?? > revoir les routes ?? : déjà dans 'app.module.ts'
  ]
})


export class ZonesMapComponent<D> implements OnInit {

  // @ViewChild(ChartUpdateComponent) chartUpdateComponent: ChartUpdateComponent;

  public fishing$: Fish[];
  public nameSp$: Fish[]; // ou Object;
  public superZone$: Fish[];
  public zone$: Fish[];
  public date$: Fish[];
  // public date2$: Fish[];
  // begin: D | any;
  // end: D | null;
  // searchForm: FormGroup;



  public map: L.Map = null; // ajout perso
  public readyMap: L.Map; // ajout perso
  public map2: L.Map = null; // ajout perso

  public layer: L.Polygon = null; // ajout perso

  public tileLayer: L.TileLayer = null;



  constructor(
    private router: Router,
    private fb: FormBuilder,
    private fishService: FishService,
    private barchartOptionsService: BarchartOptionsService
  ) {}

  // Import du Composant 'parent' > 'enfant' :
  @Input() nameSpecieSelect: string; // ancien 'item'
  @Input() zoneSelect: string;
  @Input() dateSelect: Date;
  @Input() date2BeginSelect: Date;
  @Input() date2EndSelect: Date;


  type = 'bar';
  data: any;
  options = this.barchartOptionsService.options;

// MODÈLE du graphique :

  // type = 'bar';

  ngOnInit(): any {

    console.log(this.nameSpecieSelect);
    console.log(this.zoneSelect);
    console.log(this.dateSelect);
    console.log(this.date2BeginSelect);
    console.log(this.date2EndSelect);
 

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

// dans le composant du formulaire

// onSelect(): any {

// } // FIN DE MÉTHODE 'ONSELECT'












onReset(): any {

  if (this.onMapReady(this.map) != null) { // > MARCHE COMME ÇA, MAIS INTÉRESSANT ??
    // if (this.map != null) { // > NE MARCHE PLUS ?? AVANT : SINON INITIALISATION DOUBLE DE LA CARTE AU NOUVEAU 'SUBMIT'
    this.map.remove(); // > MARCHAIT PAS SEUL
    this.map = null; //  > MARCHAIT MIEUX
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

  
  console.log(this.nameSpecieSelect);
  console.log(this.zoneSelect);
  console.log(this.dateSelect);
  console.log(this.date2BeginSelect);
  console.log(this.date2EndSelect);


  console.log('onZonesLabels() : ');
  console.log(this.map);

  // if (this.map != null) {   //  || this.initMap()
  //   this.map = null;
  // }
  // console.log(this.map);


  // IMPORTANT POUR L'AFFICHAGE DES TILES DANS LA MODALE :

  if (this.map == null) {
    this.map = this.readyMap;
    console.log(this.map);
    console.log(this.readyMap);
  }


  console.log(this.map);

  setTimeout(() => {
    this.map.invalidateSize(true);
    console.log('test ! readyMap onClick !');
    console.log(this.map);
    const map = this.map;
    console.log(map);
  }, 2000);           // 2000 = 2 secondes de délai avant le chargement de la carte



  const zoneSelect$ = this.zoneSelect; // import du composant 'parent' ('modales.component') > enfant ('dates-chart)
  // const zoneSelect$ = this.searchForm.get('zone').value;

  // gestion d'une 'ZONE' VIDE :
  let zonedatas = zoneSelect$;
  let labelzone = zonedatas;

  if (zonedatas === '' || zonedatas === 'Toutes Zones') {
    zonedatas = 'vide';
    labelzone = 'Toutes Zones';
  }

  const nameSpSelect$ = this.nameSpecieSelect; // import du composant 'parent' ('modales.component') > enfant ('dates-chart)
  // const nameSpSelect$ = this.searchForm.get('nameSp').value;
  let  nameSpdatas = nameSpSelect$;  // values: name_specie (du template)
  let labelnameSp = nameSpdatas;

  if (nameSpdatas === '' || nameSpdatas === 'Toutes Espèces') {
    nameSpdatas = 'vide';
    labelnameSp = 'Toutes Espèces';
  }

  const dateSelect$ = this.dateSelect; // import du composant 'parent' ('modales.component') > enfant ('dates-chart)
  // const dateSelect$ = this.searchForm.get('date').value;
  // console.log(this.searchForm.get('date').value);

  // VARIABLE POUR UN SIMPLE CHAMPS SELECT : (date = 'string')
  let dateAString = dateSelect$.toString(); // cas d'un champs select date

  // GESTION ERREUR CHAMPS DATE 'NULL' :
  console.log(dateAString);
  if (dateAString === '' || dateAString === undefined) {
    // modification de l'UTC date pour les 'labels' du graphique :
    dateAString = 'vide';
    alert('Veuillez choisir une date...');
  }

    // /********************************** */

  // *********************************************************************************** //
  // AFFICHAGE DE LA CARTE (AVEC DES DONNÉES SÉLECTIONNÉES):
  // *********************************************************************************** //

  this.fishService.getAllZones(nameSpdatas, zonedatas, dateAString)
  //    this.httpService.get('./api/AllSpeciesAtZone', {responseType: 'json'})
    .subscribe((fishes: any) => {
      
      // GESTION D'ERREUR (RESULTAT DE L'API = 'undefined', signifiant 'vide'):
      // console.log(fishes[0].date);
      const datedatas = fishes[0];
      // const datedatas = fishes[0].date;
      console.log(datedatas);

      if (datedatas === undefined) {
        console.log('datedatas :' + datedatas);
        alert('Veuillez choisir une date...');
        return;
      }

      if (nameSpdatas === 'vide') {
        nameSpdatas = 'Toutes Espèces';
      }

      // PARSAGE DE LA DATE (DE STRING À STRING REFORMATÉE AU FORMAT FRANÇAIS) - ex : 30 Janvier 2020
      const date = fishes[0].date;
      // console.log(date);
      const parsedDate = moment(date, 'YYYY-MM-DD').locale('fr').format('LL');
      // console.log(parsedDate);





      // ****************************************************************************************

       // ***** Déclaration de la carte avec les coordonnées du centre et le niveau de zoom ****

      // ****************************************************************************************



      // *************** IMPORTANT : ****************
      // semble nécessaire car la carte est déjà initialisée avant, mais doit être recréée avec les nouvelles données

      if (this.map != null) {
        this.map.remove();
      }

      // **********************************************



      // LAYER DES SOUS-ZONES MARITIMES (MARCHE) :
      // LAYER AQUARELLE (MARCHE)
      const stamenWatercolorMap = L.tileLayer('http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {
        attribution: '<div><p>Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/ copyright">OpenStreetMap</a> contributors</p></div>',
        minZoom: 2,
        maxZoom: 7,
      }); // zoom : 2 > 10 à la base

      // **********
      // LAYER DE NOMS DE MERS ET OCEANS :
      const oceanMapRef = L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}.pbf', {
        attribution: '<div><p>Sources: Esri, GEBCO, NOAA, National Geographic, Garmin, HERE, Geonames.org, and other contributor</p></div>',
        minZoom: 2,
        maxZoom: 7,
      });

      console.log(this.map);



      // #### marche pas comme ça avec ngx-leaflet
      this.map = L.map('myfrugalmap', { layers: [stamenWatercolorMap, oceanMapRef] })
      .setView([48.24, -4.4833], 3); // setView : London lat & long / 4 = niveau de zoom à l'affichage

      const myfrugalmap = this.map;
      // console.log('myfrugalmap :');
      // console.log(myfrugalmap);


      // *****************************

      // ***** TOOLTIPS (INFOS BULLES S'AFFICHANT SUR LA CARTE (ICI :UNE SEULE EN MODE STICKY) ********************

      const labelPopupOptions = { // voir aussi le style avec classe 'leaflet-tooltip' et '::before' dans 'styles.scss'
        opacity: 1, // 0.3
        sticky: true,
        interactive: true
      };

      // *****************************


      fishes.forEach(z_coord => {

        // console.log(z_coord);
        // console.log(z_coord.zone);
        // console.log(z_coord.value_landing);
        // console.log(z_coord.z_coord);
        // console.log(Array.from(z_coord.z_coord));

        if (z_coord.name_specie === undefined || z_coord.name_specie === null || z_coord.name_specie === '') {
          z_coord.name_specie = 'Toutes Espèces';
        }

        let polygonColor = 'green';
        // console.log(polygonColor);

        if (Object(fishes).length > 0) {

          if (z_coord.value_quota - z_coord.value_landing >= 0) { // si le quota n'est pas atteint
            polygonColor = 'blue';
            // console.log(polygonColor);

            // **** CONSTRUCTION DES POLYGONES AVEC LE PARAMÈTRE DE COORDONNÉES DE LA BDD :
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
              {color: polygonColor, dashArray: '15, 10', weight: 0.5})
              .addTo(myfrugalmap); // color: 'red' //dasharray

            layer.bindTooltip('<i>' + z_coord.name_specie + '</i><br>' + '<b>' + z_coord.zone + '</b>' + '<br>Value landing : '
            + z_coord.value_landing + '<br>Value Quota : ' + z_coord.value_quota, labelPopupOptions); // OPTION : , {permanent: true}
            layer.addTo(myfrugalmap);
            // layer.openTooltip();

          }


        } else {
          alert('Pas de donnée...');
          // alert('Pas de nouvelle donnée pour aujourd\'hui...');
        }


      }); // fin de forEach()


      // ************** LEGENDE TEST : (marche !)
      // cf : https://stackoverflow.com/questions/49096159/how-to-add-legend-to-leaflet-map-written-by-angular-and-ngx-leaflet

      // console.log(fishes);
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

        div.innerHTML = '<div style="background: grey; opacity: 0.8; color: black; margin-bottom: 12vh;"><div style="text-align: center;">'
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


    }); // fin de méthode getAllZones()

  } // fin onZonesLabels()

    // ****************************

  // FONCTION NÉCESSAIRE à l'initialisation de la carte, pour faire marcher l'affichage de toutes les 'Tiles'
  // (tuiles) lors du déclenchement de la Modale (fonction 'onClick')

  onMapReady(map: L.Map) {

    this.readyMap = map;

  }

}