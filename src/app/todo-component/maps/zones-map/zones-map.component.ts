import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { Subscription } from 'rxjs';
import * as L from 'leaflet';       // librairie externe : carte Leaflet
import * as _moment from 'moment';

import { FishService } from '../../../todo-data-service/fish.service';
import { Fish } from '../../../shared/todo-class/fish';

const moment: typeof _moment = _moment;


@Component({
  selector: 'app-zones-map',
  templateUrl: './zones-map.component.html',
  styleUrls: ['./zones-map.component.scss'],
})


export class ZonesMapComponent<D> implements OnInit, OnDestroy {

  // *** Note: Import du Composant 'parent' > 'enfant' :
  @Input() nameSpecieSelect: string;
  @Input() zoneSelect: string;
  @Input() dateSelect: Date;
  @Input() date2BeginSelect: Date;
  @Input() date2EndSelect: Date;


  // *** Note: variables (pour les datas): 
  private fishing$: Fish[]; // ou type = Object;
  private nameSp$: Fish[];
  private superZone$: Fish[];
  private zone$: Fish[];
  private date$: Fish[];


  // *** Note: variables (pour la map):
  private map: L.Map;
  private labelPopupOptions: L.TooltipOptions; 

  private layer: L.Polygon;
  private layerBlueGroup = L.layerGroup(); // *** Note:  méthode ajoutée pour grouper les polygones (quotas non dépassés)
  private layerRedGroup = L.layerGroup(); // *** Note: méthode ajoutée pour grouper les polygones (quotas dépassés)

  private legend = new (L.Control.extend({
    options: { position: 'bottomleft' }
  }));

  // *** Note: infos sur les attributions (copyright):
  private tilesAttributions: L.Control.Attribution = L.control.attribution({position: 'bottomleft'});

  public constructor(
    private fishService: FishService,
  ) {
    this.fishService = fishService;
  }


  // *** Note: MÉTHODES DE CRÉATION DE LA CARTE ET DES OPTIONS (TOOLTIP)
  createTiles(): L.Map {

    // *** Note: LAYER DES SOUS-ZONES MARITIMES :

    // *** Note: LAYER AQUARELLE (MARCHE)
    // voir doc: https://docs.stadiamaps.com/guides/migrating-from-stamen-map-tiles/ car tiles non maintenues par Stamen, avec cette url: http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg
    const stamenWatercolorMap: L.TileLayer = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg', {
      minZoom: 2,
      maxZoom: 8,
    }); // *** Note: zoom : 2 -> 10 à la base

    // *** Note: LAYER DE NOMS DE MERS ET OCEANS :
    const oceanMapRef: L.TileLayer = L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}.pbf', {
      minZoom: 2,
      maxZoom: 8,
    });


    // *** Note: ajout des attributions (copyright):
    const attributions: string = '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> <a href="https://stamen.com/" target="_blank">&copy; Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/about" target="_blank">OpenStreetMap</a> contributors';
    this.tilesAttributions.addAttribution(attributions);
    this.tilesAttributions.addTo(this.map);

    this.map.addLayer(stamenWatercolorMap);
    this.map.addLayer(oceanMapRef);
    this.map.setView([31.271041, -42.333326], 2);  // *** Note : centré sur un point dans l'Atlantique [31.271041, -42.333326]
    
    return this.map;
  }


  createTilesOptions(): L.TooltipOptions {
    
    // *** Note: TOOLTIPS (INFOS BULLES S'AFFICHANT SUR LA CARTE (ICI :UNE SEULE EN MODE STICKY) ********************
    this.labelPopupOptions = { // *** Note: voir aussi le style avec classe 'leaflet-tooltip' et '::before' dans 'styles.scss'
      opacity: 1,
      sticky: true,
      interactive: true
    };

    return this.labelPopupOptions;
  }


  public ngOnInit(): void {
    // console.log('zones-map: onInit()');

    // *** Note: initialisation de la carte:
    this.map = new L.Map('myfrugalmap');
    this.createTiles();
    this.createTilesOptions();
  }


  public ngOnDestroy(): void {
    // console.log('zones-map: onDestroy()');

    // *** Note: IMPORTANT: Résoud le pb: container = "allready initialized" si le 'modal-body' n'est pas réinitialisé (= conteneur parent de la map) -> réinitialisation du conteneur de la carte à la déconnexion (pas à la fermeture de la modale, pour garder la map initialisée):
    this.map.stop();
    this.map.remove();
  }



private onZonesLabels(): void {

  // *** Note: import du composant 'parent' ('modales.component') > enfant ('dates-chart):
  let zonedatas: string = this.zoneSelect;
  let labelzone: string = this.zoneSelect;

  if (zonedatas === '' || zonedatas === 'Toutes Zones') {
    zonedatas = 'vide';
    labelzone = 'Toutes Zones';
  }

  let  nameSpdatas: string = this.nameSpecieSelect;
  let labelnameSp: string = nameSpdatas;

  if (nameSpdatas === '' || nameSpdatas === 'Toutes Espèces') {
    nameSpdatas = 'vide';
    labelnameSp = 'Toutes Espèces';
  }

  // *** Note: VARIABLE POUR UN SIMPLE CHAMPS SELECT : (date = 'string'):
  let dateAString: string = this.dateSelect.toString();

  // *** Note: GESTION ERREUR CHAMPS DATE 'NULL' :
  if (dateAString === '' || dateAString === undefined) {
    dateAString = 'vide';
    alert('Veuillez choisir une date...');
  }



// *********************************************************************************** //
  // INITIALISATION DE LA CARTE :
  // *********************************************************************************** //

  // console.log('onZonesLabels() : ');

  // IMPORTANT POUR LA PREMIÈRE INITIALISATION DE LA CARTE (= RESIZE AUTO DE L'ELEMENT)
  setTimeout(() => {
    this.map.invalidateSize(false); // Attention: important, sinon les tuiles (tiles) ne se chargent pas bien... 
  }, 2000);


// *** RÉINITIALISATION des polygones à la nouvelle requête:
  this.layerBlueGroup.clearLayers();
  this.layerRedGroup.clearLayers();


  // *********************************************************************************** //
  // AFFICHAGE DE LA CARTE (AVEC DES DONNÉES SÉLECTIONNÉES):
  // *********************************************************************************** //

  const fishingDataSubscription: Subscription = this.fishService.getAllZones(nameSpdatas, zonedatas, dateAString)
    .subscribe((fishes: any[string]) => {

      if (fishes[0] === undefined) {
        alert("Il semblerait qu'il n'y ait pas de données... Veuillez vérifier votre connexion.");
        return;
        
      }


      if (nameSpdatas === 'vide') {
        nameSpdatas = 'Toutes Espèces';
      }

      // *** Note: PARSAGE DE LA DATE (DE STRING À STRING REFORMATÉE AU FORMAT FRANÇAIS) - ex : 30 Janvier 2020
      const date: Date = fishes[0].date;
      const parsedDate: string = moment(date, 'YYYY-MM-DD').locale('fr').format('LL');

      fishes.forEach(z_coord => {

        if (z_coord.name_specie === undefined || z_coord.name_specie === null || z_coord.name_specie === '') {
          z_coord.name_specie = 'Toutes Espèces';
        }

        let polygonColor: string = 'green';

        if (Object(fishes).length > 0) {

          if (z_coord.value_quota - z_coord.value_landing >= 0) { // si le quota n'est pas atteint
            console.log("test zcoord:");
            console.log(z_coord.z_coord);

            polygonColor = 'blue';

            // *** Note: CONSTRUCTION DES POLYGONES AVEC LE PARAMÈTRE DE COORDONNÉES DE LA BDD :
            this.layer = L.polygon(z_coord.z_coord, {color: polygonColor, dashArray: '15, 10', weight: 0.3})

            this.layer.bindTooltip('<div class="map-tooltip">Zone(s) : <b>'+ z_coord.zone +'</b><br><i><b>'+ z_coord.name_specie +'</b></i><br><b>'+ parsedDate  +'</b><br>Value landing : <b>'+ z_coord.value_landing +' tonnes</b><br>Value Quota : <b>'+ z_coord.value_quota +' tonnes</b></div>', this.labelPopupOptions);
            
            this.layerBlueGroup.addLayer(this.layer);

          } else if (z_coord.value_quota - z_coord.value_landing <= 0) {

            polygonColor = 'red';

            this.layer = L.polygon(z_coord.z_coord,
              {color: polygonColor, dashArray: '15, 10', weight: 0.5})

            this.layer.bindTooltip('<div class="map-tooltip">Zone(s) : <b>'+ z_coord.zone +'</b><br><i><b>'+ z_coord.name_specie +'</b></i><br><b>'+ parsedDate  +'</b><br>Value landing : <b>'+ z_coord.value_landing +' tonnes</b><br>Value Quota : <b>'+ z_coord.value_quota +' tonnes</b></div>', this.labelPopupOptions);
            
            this.layerRedGroup.addLayer(this.layer);

          }

        } else {
          alert('Pas de donnée...');
        }


      }); // *** Note: fin de forEach()

      // *** Note: ajout des deux groupes de polygones créés ici, à la carte:
      this.layerBlueGroup.addTo(this.map);
      this.layerRedGroup.addTo(this.map);


      this.legend.onAdd = function () {

        // *** Note: MA LÉGENDE :
        const div: HTMLElement = L.DomUtil.create('div', 'legend');

        const labels: string[] = [
          'Quotas respectés - <b>écarts >= à 0 (en tonnes)</b>',
          'Quotas dépassés - <b>écarts < 0 (en tonnes)</b>',
        ];

        const grades: string[] = ['#0000ff', '#ff0000']; // *** Note: 'bleu', 'rouge'
        
        div.innerHTML = '<div class="map-legend"><div class="map-legend-title">'
        + '<b>Légende</b></div><br />'
        + '<div>Date : <b>' + parsedDate + '</b></div>'
        + '<div>Nom d\'espèce : <b>' + nameSpdatas + '</b></div><br />'
        + '<i style="background:' + grades[0] + '"> &nbsp; &nbsp; &nbsp;</i> &nbsp; &nbsp;' + labels[0]
        + '<br />'
        + '<i style="background:' + grades[1] + '"> &nbsp; &nbsp; &nbsp;</i> &nbsp; &nbsp;' + labels[1]
        + '<br /></div>';

        return div;

      };

      this.legend.addTo(this.map);


    }); // *** Note: fin de méthode getAllZones()

    setTimeout(() => {
      fishingDataSubscription.unsubscribe();
    }, 10000);
    
  } // *** Note: fin onZonesLabels()



}
