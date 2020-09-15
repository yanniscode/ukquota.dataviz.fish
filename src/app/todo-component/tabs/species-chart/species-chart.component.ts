import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { Data } from '@angular/router';

import * as _moment from 'moment';
import { Subscription } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { FishService } from '../../../todo-data-service/fish.service';
import { Fish } from '../../../shared/todo-class/fish';
import { BarchartOptionsService } from '../../../shared/todo-class/barchart-options';


@Component({
  selector: 'app-species-chart',
  templateUrl: './species-chart.component.html',
  styleUrls: ['./species-chart.component.scss'],
})


export class SpeciesChartComponent implements OnInit, OnDestroy {

  private moment: typeof _moment = _moment;

  // *** Note: pour les options du graphique :
  private data: Data = null;
  private options: BarchartOptionsService["options"] = null;
  private type: string = null;

  private fishing$: Fish[] = [];  

  public constructor(
    private fishService: FishService,
    private barchartOptionsService: BarchartOptionsService,
    private modalService: NgbModal,
  ) {
    this.fishService = fishService;
    this.data = {};
    this.options = this.barchartOptionsService.options;
    this.type = this.options.type;
  }


  // *** Import du Composant 'parent' > 'enfant' :
  @Input() nameSpecieSelect: string;
  @Input() zoneSelect: string;
  @Input() dateSelect: Date;
  @Input() date2BeginSelect: Date;
  @Input() date2EndSelect: Date;



  public ngOnInit(): void {
    // console.log("species chart: oninit !");
  }


  public ngOnDestroy(): void {
    this.data = null;
    // console.log("ngOnDestroy()");
  }


  // *** Note: prise en compte des différents moyens de fermeture de la modale: (ESC, BackDrop Click, 2 boutons)
  closeResult: string = '';

  private getDismissReason(reason: any): string {

    if (reason === ModalDismissReasons.ESC) {
      this.ngOnDestroy();
      return 'by pressing ESC';

    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.ngOnDestroy();
      return 'by clicking on a backdrop';

    } else {
      this.ngOnDestroy();
      return `with: ${reason}`;
    }

  }


  private onSpeciesLabels(content): void {

    // *** Note: méthodes d'affichage et de retrait de la modale: (voir 'https://ng-bootstrap.github.io/#/components/modal/examples')
    this.modalService.open(content, {ariaLabelledBy: 'barChartModale'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });


    // *** Note: import du composant 'parent' ('modales.component') > enfant ('dates-chart):

    let nameSpdatas: string = this.nameSpecieSelect;  // pour lien avec la BDD (cas d'un champs 'vide')
    let labelnameSp: string = this.nameSpecieSelect; // pour le template (html) : valeur = 'Toutes Espèces'

    if (nameSpdatas === '' || nameSpdatas === 'Toutes Espèces') {
      nameSpdatas = 'vide';
      labelnameSp = 'Toutes Espèces';
    }

    let zonedatas: string = this.zoneSelect;
    let labelzone: string = this.zoneSelect;

    if (zonedatas === '' || zonedatas === 'Toutes Zones') {
      zonedatas = 'vide';
      labelzone = 'Toutes Zones';
    }


    // VARIABLE POUR UN SIMPLE CHAMPS SELECT : (date = 'string')
    let dateAString: string = this.dateSelect.toString(); // cas d'un champs 'select' date


    // GESTION ERREUR CHAMPS DATE 'NULL' :
    if (dateAString === '' || dateAString === undefined) {

      dateAString = 'vide';

      alert("Veuillez choisir une date...");
    }


    const fishingDataSubscription: Subscription = this.fishService.getAllSpecies(nameSpdatas, zonedatas, dateAString)
      .subscribe(
        fishing$ => {

          this.fishing$ = fishing$;
          
          if (fishing$[0] === undefined) {
            alert("Il semblerait qu'il n'y ait pas de données... Veuillez vérifier votre connexion.");

            return;
          }


          // PARSAGE DE LA DATE (DE STRING À STRING REFORMATÉE AU FORMAT FRANÇAIS)
          const date: string = fishing$[0].date;
          const parsedDate: string = this.moment(date, 'YYYY-MM-DD').locale('fr').format('LL');

          this.data = {
            labels: [],
            datasets: [
              {
                label: ['Captures (le ' + parsedDate + ') - ' + labelnameSp, ' ' + labelzone],
                data: [],
                backgroundColor: 'rgba(45, 154, 185, 0.54)',  // couleur des boîtes à légende.
                borderColor: '#2d9ab7',
              },
              {
                label: ['Quotas (le ' + parsedDate + ') - ' + labelnameSp, ' ' + labelzone],
                data: [],
                backgroundColor: 'rgba(255, 68, 0, 0.49)',
                borderColor: '#ff4500',
              }
            ]
          };


          if (fishing$.length > 0) {

            for (let i = 0; i < fishing$.length; i++) {

              const landingdatas: number = fishing$[i].value_landing;
              this.data.datasets[0].data.push(landingdatas);

              const  quotadatas: number = fishing$[i].value_quota;
              this.data.datasets[1].data.push(quotadatas);

              const speciesdatas: string = fishing$[i].name_specie;
              this.data.labels.push(speciesdatas);

            }

          }  else {
            alert('Pas de donnée...');
          }

    });
    setTimeout(() => {
      fishingDataSubscription.unsubscribe();
    }, 10000);

  } // fin boucle 'onSpeciesLabels()'


} // fin de classe 'ChartChangeComponent'
