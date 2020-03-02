import { Injectable } from '@angular/core';

// import Chart from 'chart.js';

import * as _moment from 'moment';

const moment = _moment;

@Injectable({
  providedIn: 'root'
})
export class BarchartOptionsService {

  constructor() { }



    // *****************************

  // MODÈLE DU GRAPHIQUE :

// *****************************

  type = 'bar';

  // data: data, // marche pas
  data: any = {

    labels: [],
    datasets: [
      {
        label: [],
        data: [],
        backgroundColor: 'rgba(255, 68, 0, 0.49)', // couleur des boîtes à légende - orange : rgba(255, 68, 0, 0.49) // #FF6384 (rose de base)
        borderColor: '#ff4500' // backgroundColor: '#FF6384'
      },
      {
        label: [],
        data: [],
        borderColor: '#2d9ab7' // bleu clair: #2d9ab7 / #36A2EB (bleu de base)
      }
    ]
  };

  options = {
    responsive: true,
    tooltips: { // modif des infos bulles
      enabled: true,
      position: 'nearest',
      fontFamily: 'sans-serif', // police de la légende // source-sans-pro
      fontSize: 10,
      callbacks: {
        title: function(tooltipItem /*, data */) {
          const title = tooltipItem[0].xLabel || '';
          return title;
        },
        label: function(tooltipItem, data) {

          const datas = tooltipItem.yLabel; // paramètre pour accéder aux données du graphique

          const capturesLabel = 'Quantité (en tonnes) : ' + datas || '';
          const quotasLabel = 'Quota (en tonnes) : ' + datas || '';

          if (capturesLabel != null && tooltipItem.datasetIndex === 0) {
            // labelCaptures += ' tonnes';
            return capturesLabel;
          }
          if (quotasLabel != null && tooltipItem.datasetIndex === 1) {
            // quotasLabel += ' tonnes';
            return quotasLabel;
          }

          // alert(tooltipItem.toSource()); // pour vérifier le type de l'objet reçu dans le tooltip = tableau d'objets : [{ }]
          // alert(data.toSource()); // pour vérifier le type de l'objet reçu dans le tooltip = tableau d'objets : [{ }]

        }
      }
    },
    legend: {
      display: true,
      labels: {
        fontFamily: 'sans-serif', // police de la légende // source-sans-pro
        fontSize: 14,
        fontColor: 'black',
        padding: 20, // marge du haut
        usePointStyle: true
      }
    },
    //  maintainAspectRatio: true,
    scales: {
      xAxes: [{
        // type: 'time', // AJOUT
        distribution: 'linear', // AJOUT :data are spread according to their time (distances can vary)
        scaleLabel: {
          display: true,
          fontFamily: 'sans-serif', // source-sans-pro
          fontSize: 14,
          padding: 20,
          labelString: 'Dates de Captures et de Quotas',
          fontColor: 'black'
        },
        fontFamily: 'sans-serif', // police de la légende // source-sans-pro
        fontSize: 14,
        // fontColor: 'black',
        ticks: {
          beginAtZero: true,
          // callback: function(value) {
          //   return new Date(value).toLocaleDateString('fr-FR', {month: 'short', year: 'numeric'});
          // },
        },
        // time: {
        //   unit: 'month',
        //   // unit: 'day',
        //   displayFormats: {
        //     month: 'MM-YYYY', // format en anglais, si en lettres
        //     // day: 'DD-MM-YYYY'
        //   }
        // }
      }],
      yAxes: [{
        // distribution: 'linear', // AJOUT :data are spread according to their time (distances can vary)
        fontFamily: 'sans-serif', // police de la légende // source-sans-pro
        fontSize: 14,
        fontColor: 'black',
        scaleLabel: {
          display: true,
          fontFamily: 'sans-serif', // source-sans-pro
          fontSize: 14,
          padding: 20,
          fontColor: 'black',
          labelString: 'Quantités en Tonnes (T)',
        },
        stacked: false,
        ticks: {
          beginAtZero: true
          // callback: function(value, index, values) {
          //   // alert(value.toSource()); // pour vérifier le type de l'objet reçu dans le tooltip = tableau d'objets : [{ }]
          //   return value + ' T';
          // }
        }
      }]
    },
    labels: [{
      // MODIF enlevé : chartLabels
    }],

    // pan: { // PAN DÉSACTIVÉ
    //   enabled: false,
    //   mode: 'xy',
    //   speed: 20,
    //   threshold: 10
    // },
    // zoom: { // ZOOM DÉSACTIVÉ
    //   enabled: false,
    //   mode: 'xy',
    //   sensitivity: 100,
    //   rangeMin: {
    //     // Format of min pan range depends on scale type
    //     x: null,
    //     y: 0  // le graphique ne prend pas en compte les chiffres négatifs
    //   },
    // },
    // rangeMax: {
    //   // Format of max pan range depends on scale type
    //   x: null,
    //   y: null
    // }

  };

// });

// });

}

