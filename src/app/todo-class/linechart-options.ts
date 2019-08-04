import { Injectable } from '@angular/core';
import * as _moment from 'moment';

const moment = _moment;

@Injectable({
  providedIn: 'root'
})
export class LinechartOptionsService {

  constructor() { }



    // *****************************

  // MODÈLE DU GRAPHIQUE :

// *****************************

// const Chart = require('chart.js');

// require(['../node_modules/chart.js/dist/Chart.js'], function(Chart) {

// const canvas = <HTMLCanvasElement> document.getElementById('mycanvas');
// const ctx = this.canvas.getContext('2d');
// const ctx = document.getElementById('myChart');
// const ctx = document.getElementById('myChart').getContext('2d');
// const ctx = 'myChart';

// Chart.defaults.global.defaultFontFamily = 'source-sans-pro'; // marche pas


  // const myChart = new Chart(this.ctx, { // marche pas

  type = 'line';

  // data: data, // marche pas
  data: any = {

    labels: [],
    datasets: [
      {
        label: [],
        data: [],
        backgroundColor: 'rgba(255, 68, 0, 0.49)', // couleur des boîtes à légende. // #FF6384 (rose de base)
        borderColor: '#ff4500' // backgroundColor: '#FF6384'
      },
      {
        label: [],
        data: [],
        borderColor: '#2d9ab7' // #36A2EB (bleu de base)
      }
    ]
  };

  options = {
    padding: {
        left: 20,
        right: 0,
        top: 0,
        bottom: 0
    },
    responsive: true,
    // maintainAspectRatio: false,
    // responsiveAnimationDuration: 2000,
    tooltips: { // modif des infos bulles
      enabled: true,
      position: 'nearest',
      borderWidth: 1,
      fontFamily: 'sans-serif', // police de la légende // source-sans-pro
      fontSize: 10,
      // usePointStyle: true,
      callbacks: {
        title: function(tooltipItem /*, data */) {
          const title = 'Date : ' + tooltipItem[0].xLabel || '';
          // console.log(title);
          // const parsedTitle = moment(title, 'YYYY-MM-DD').format('DD-MM-YYYY');
          const parsedTitle = moment(title, 'YYYY-MM-DD').locale('fr').format('LL');
          // console.log(parsedTitle);

          // const quantity = 'Quantité : ' + tooltipItem[0].yLabel + ' tonnes' || '';
          // console.log(title);

          // let title = data.datasets[tooltipItem.datasetIndex].title || ''; // marche pas ici
          // if (title) {
          //   title += ': ';
          // }
          // alert(tooltipItem.toSource()); // pour vérifier le type de l'objet reçu dans le tooltip = tableau d'objets : [{ }]
          return parsedTitle;
        },
        label: function(tooltipItem, data) {
          // const label = data.datasets[tooltipItem.datasetIndex].yLabel || '';
          let label = 'Quantité : ' + tooltipItem.yLabel || '';

          if (label) {
            label += ' tonnes';
          }
          // alert(tooltipItem.toSource()); // pour vérifier le type de l'objet reçu dans le tooltip = tableau d'objets : [{ }]
          // alert(data.toSource()); // pour vérifier le type de l'objet reçu dans le tooltip = tableau d'objets : [{ }]

          return label;
        }
      }
    },
    legend: {
      display: true,
      fullWidth: true,
      position: 'top',
      labels: {
        fontFamily: 'sans-serif', // police de la légende // source-sans-pro
        fontSize: 12,
        fontColor: 'black',
        // padding: 20, // marge du haut
        usePointStyle: true
      }
    },
    scales: {
      xAxes: [{
        type: 'time', // AJOUT
        distribution: 'linear', // AJOUT :data are spread according to their time (distances can vary)
        scaleLabel: {
          display: true,
          fontFamily: 'sans-serif', // source-sans-pro
          fontSize: 12,
          // padding: 20,
          labelString: 'Dates de Captures et de Quotas',
          fontColor: 'black'
        },
        // fontFamily: 'sans-serif', // source-sans-pro
        // fontSize: 14,
        // fontColor: 'black',
        ticks: {
          beginAtZero: true,
          padding: 10,
          // callback: function(value) {
          //   return new Date(value).toLocaleDateString('fr-FR', {month: 'short', year: 'numeric'});
          // },
        },
        time: {
          unit: 'month',
          // unit: 'day',
          displayFormats: {
            month: 'MM-YYYY', // format en anglais, si en lettres
            // day: 'DD-MM-YYYY'
          }
        }
      }],
      yAxes: [{
        // distribution: 'linear', // AJOUT :data are spread according to their time (distances can vary)
        fontFamily: 'sans-serif', // source-sans-pro
        fontSize: 14,
        // fontColor: 'black',
        scaleLabel: {
          display: true,
          fontFamily: 'sans-serif', // source-sans-pro
          fontSize: 12,
          // padding: 20,
          fontColor: 'black',
          labelString: 'Quantités en Tonnes (T)',
        },
        stacked: false,
        ticks: {
          beginAtZero: true,
          padding: 10,
          // callback: function(value, index, values) {
          //   // alert(value.toSource()); // pour vérifier le type de l'objet reçu dans le tooltip = tableau d'objets : [{ }]
          //   return value + ' T';
          // }
        }
      }]
    },
    labels: [{
      // MODIF enlevé : chartLabels
    }]
    // animation: {
    //   duration: 1000 // general animation time (ms)
    // },
    // hover: {
    //     animationDuration: 1000 // duration of animations when hovering an item
    // },
    // responsiveAnimationDuration: 1000, // animation duration after a resize

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

