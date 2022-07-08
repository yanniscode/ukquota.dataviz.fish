import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


import { FishService } from '../../../todo-data-service/fish.service';
import { Fish } from '../../../shared/todo-class/fish';

import { LinechartOptionsService } from '../../../shared/todo-class/linechart-options';
import { Data } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dates-chart',
  templateUrl: './dates-chart.component.html',
  styleUrls: ['./dates-chart.component.scss'],
})


export class DatesChartComponent<D> implements OnInit, OnDestroy {

  // *** Note: html = appelé désormais par le template <app-chart-update> -> cf: 'template' dans le composant 'ChartUpdateComponent'
  private fishing$: Fish[] = [];
  private data: Data = null;

  private options: LinechartOptionsService["options"] = null;
  private type: string = null;

  private closeResult: string = '';

  // *** note: import du Composant 'parent' > 'enfant' : (formulaire -> graphique)
  @Input() nameSpecieSelect: string;
  @Input() zoneSelect: string;
  @Input() dateSelect: string;
  @Input() date2BeginSelect: Date;
  @Input() date2EndSelect: Date;

  private nameSpSelect$: string = '';
  private zoneSelect$: string = '';
  private dateSelect$: string = '';
  private date2BeginSelect$: Date = null;
  private date2EndSelect$: Date = null;

  public constructor(
    private fishService: FishService,
    private linechartOptionsService: LinechartOptionsService,
    private modalService: NgbModal,
  ) {

    this.fishService = fishService;
    this.data = {};
    this.options = this.linechartOptionsService.options;
    this.type = this.options.type;

  }


  public ngOnInit(): void {
    // console.log("dates-chart ngOnInit()");
  }

  public ngOnDestroy(): void {
    this.data = null;
    // console.log("ngOnDestroy()");
  }


  // *** NOTE: méthode de prise en compte des différents moyens de fermeture de la modale: (ESC, BackDrop Click, 2 boutons)
  private getDismissReason(reason: ModalDismissReasons): string {

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
  
  private onDatesLabels(content) {

    // *** Note: import du composant 'parent' ('modales.component') > enfant ('dates-chart)
    this.nameSpSelect$ = this.nameSpecieSelect;
    this.zoneSelect$ = this. zoneSelect;
    this.dateSelect$ = this.dateSelect;
    this.date2BeginSelect$ = this.date2BeginSelect;
    this.date2EndSelect$ = this.date2EndSelect;
    
    // *** Note: Méthodes d'affichage et de retrait de la modale: (cf: 'https://ng-bootstrap.github.io/#/components/modal/examples'):
    this.modalService.open(content, {ariaLabelledBy: 'lineChartModale'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    let  nameSpDatas: string = this.nameSpSelect$;  // *** note: valeurs = name_specie (du template)
    let labelNameSp: string = this.nameSpSelect$;  // *** note: 2 variables avec les mêmes données ici, car: redéfinition des intitulés ('vide' pour l'API et 'Toutes Espèces' pour les formulaires)

     if (nameSpDatas === '' || nameSpDatas === 'Toutes Espèces') {
      nameSpDatas = 'vide';             // *** pour les appels à l'API
       labelNameSp = 'Toutes Espèces';  // *** pour la liste 'select' du formulaire de recherches
     }

    let zoneDatas: string = this.zoneSelect$;
    let labelZone: string = this.zoneSelect$;

    // *** Note: gestion d'une 'ZONE' VIDE :
    if (zoneDatas === '' || zoneDatas === 'Toutes Zones') {
      zoneDatas = 'vide';
      labelZone = 'Toutes Zones';
    }

    // *** Note: GESTION D'ERREUR POUR UN CHAMPS DE DATES INVALIDE (VIDE OU PARTIELLEMENT VIDE):

    if (this.date2BeginSelect$ === null) {
      alert('Date de début vide : Veuillez choisir une plage de dates...');
      return;

    } else if (this.date2EndSelect$ === null) {
      alert('Date de fin vide : Veuillez choisir une plage de dates...');
      return;
    }


  // *** Note: PARSAGE DE LA DATE (UTC) POUR LES LABELS DU GRAPHIQUE :
  const dateOptions: Object = { year: 'numeric', month: 'long', day: 'numeric'}; 

  // DATE DE DÉBUT :
  // date transformée  à partir du format UTC
  // parsage (exemple sans 'Moment') = 7 février 2018:
  const dateBeginLabelToString: string = new Intl.DateTimeFormat('fr-FR', dateOptions).format(this.date2BeginSelect$); 
  
  // parsage (exemple) = 2018-2-7:
  const dateBeginToString: string = this.date2BeginSelect$.getFullYear() + '-' + Number(this.date2BeginSelect$.getMonth() + 1) + '-' + this.date2BeginSelect$.getDate();

  // DATE DE FIN :
  // date transformée  à partir du format UTC
  // parsage (exemple) = 7 février 2018:
  const dateEndLabelToString: string = new Intl.DateTimeFormat('fr-FR', dateOptions).format(this.date2EndSelect$);
  
  // parsage (exemple) = 2018-2-7:
  const dateEndToString: string = this.date2EndSelect$.getFullYear() + '-' + Number(this.date2EndSelect$.getMonth() + 1) + '-' + this.date2EndSelect$.getDate();




// ************************************************************************************** //

// *******************  AFFICHAGE DU GRAPHIQUE SELON LA REQUETE SOUHAITÉE  ************** //

// ************************************************************************************** //

    //  indiquer ici la route vers l'api choisie : getAllDates()...
    const fishingDataSubscription: Subscription = this.fishService.getAllDates(nameSpDatas, zoneDatas, dateBeginToString, dateEndToString)
      .subscribe(fishing$ => {   

        this.fishing$ = fishing$;

        // MÉTHODE RÉCUPÉRANT 'ESPÈCE' ET 'ZONE' SÉLECTIONNÉE:

        if (fishing$[0] === undefined) {
          alert("Il semblerait qu'il n'y ait pas de données... Veuillez vérifier votre connexion.");
          return;
          
        } 
        else {
          // console.log('resultat API :' + fishing$[0].value_landing, ' ' + fishing$[0].zone);
        }

        this.data = {
          labels: [],
          datasets: [
            {
              label: ['Captures (' + dateBeginLabelToString + ' - ' + dateEndLabelToString
              + ') - ' + labelNameSp + ' - ' + labelZone],
              data: [],
              backgroundColor: this.options.datasets[0].backgroundColor, // couleur des boîtes à légende. // #FF6384 (rose de base)
              borderColor: this.options.datasets[0].borderColor, // #36A2EB
            },
            {
              label: ['Quotas (' + dateBeginLabelToString + ' - ' + dateEndLabelToString
              + ') - ' + labelNameSp, ' ' + labelZone],
              data: [],
              borderColor: this.options.datasets[1].borderColor,
            }
          ]
        };


        if (fishing$.length > 0) {

          for (let i = 0; i < fishing$.length; i++) {

            const landingPushDatas: number = fishing$[i].value_landing;
            this.data.datasets[0].data.push(landingPushDatas);

            const quotaPushDatas: Object = fishing$[i].value_quota;
            this.data.datasets[1].data.push(quotaPushDatas);

            const date2pushdatas: string = fishing$[i].date;
            this.data.labels.push(date2pushdatas);

          }

        } else {
          alert('Pas de donnée...');
        }

      }
    );

    setTimeout(() => {
      fishingDataSubscription.unsubscribe();
    }, 10000);

  } // fin de méthode onDatesLabels()

  
}