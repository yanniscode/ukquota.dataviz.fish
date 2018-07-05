import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';  //      AJOUT POUR TESTS
import { HttpErrorResponse } from '@angular/common/http';   //      AJOUT POUR TESTS

import { Chart } from 'chart.js';
//  import { LinechartService } from 'linechart.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Sakana App';
}



/*
export class AppComponent {
  title = 'Sakana App';
}
*/
//  export class LinechartComponent implements OnInit {



/*

export class AppComponent {

//    chart = [];

    //  constructor(public linechartService: LinechartService) { } // avant : private
constructor (private httpService: HttpClient) { }

    //  this.chart = new Chart('canvas', { // ajout

type: 'bar';

    // OBJECT FOR datasets WITH EMPTY data.
  chartData: any = [
    {
      label: 'Landings',
      data: []
    },
    {
      label: 'Quotas',
      data: []
    }
  ];

  //    labels: any = [];
  labels: any = [
    {
      label: 'Dates',
      data: [ , , , , , , , ],
    }
  ];

  onChartClick(event) {
    console.log(event);
  }



    ngOnInit () {
      this.httpService.get('./assets/birds.json', {responseType: 'json'}).subscribe(
      fishs => {
            // FILL THE CHART ARRAY WITH DATA.
    //        console.log(this.chartData);
      //      let txt = ' ';



//  TEST 5 LOOP FOR SUR UN OBJET JSON 'fishing' :

      const fish = {
        id_fishing: '1',
        id_specie: '1',
        date: '2017-11-15',
        value_landing: [14712, 0, 0],
        value_quota: [18391, 0, 0]
      };
      console.log('fish:');
      console.log(fish);

      let i = 0;

      for (i = 0; i < fish.value_landing.length; i ++) {
        console.log('######## TEST');
        console.log(fish.value_landing[i]);
        this.chartData = fishs as any [];
      }

    });

  }

}



*/



//  TEST 4 LOOP FOR SUR UN OBJET JSON venu du fichier 'birds.json' : DERNIERE VERSION (MARCHE POUR UNE DONNEE SUR DEUX : LANDING OU DATE)
/*
  ngOnInit () {

    this.httpService.get('./assets/test_sakana.json', {responseType: 'json'}).subscribe(
    fishs => {

      let i = 0;
//      let fishcount = '';
  //   console.log(fishs[i].value_landing);

      for (i = 0; i < this.chartData.length; i++) {
//      for (i = 0; i <= fishs[i].value_landing.length; i ++) {
        console.log('######## TEST 1 :');
        console.log(this.chartData.length);
        this.chartData = fishs[i].value_landing;
//        fishcount += this.chartData[i];
        console.log(this.chartData);
      }

        let j = 0;
  //      let datecount = '';

        for (j = 0; j < this.chartLabels.length; j++) {
  //      for (j = 0; j <= fishs[j].date.length; j++) {
          console.log('TEST 2 :');
          console.log(this.chartLabels.length);
          console.log(fishs[j].date.length);
          this.chartLabels = fishs[j].date;
  //        datecount += this.chartLabels[i];
          console.log(this.chartLabels);
        }
*/


// ********* date format : */

/*

           const datecount = fishs[j].date;
           const modifiedDate = [];

            datecount.forEach((result) => {
            const jsdate = new Date(fishs[j].date * 1000);
            modifiedDate.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric'}));
            console.log(modifiedDate);
*/

/*
    });
  }
}
*/



 //       this.labels = fishs[i].datemodified;

      //  this.labels = fishs.push(fishs[i].value_landing);





        // CHART COLOR.
/*        colors = [
          { // 1st Year.
            backgroundColor: 'rgba(77,83,96,0.2)'
          },
          { // 2nd Year.
            backgroundColor: 'rgba(30, 169, 224, 0.8)'
          }
        ],



    });
*/

    //  test A :

/*    for (i = 0; i < fishs[i].value_landing; i ++) { // bird
      this.chartData = fishs[i].value_landing as any [];
      console.log('######## TEST');
      console.log(this.chartData[i]); // bird
    }



    }

  }
*/


/*
for (i = 0; i < fish.value_landing.length; i ++) {
  console.log('######## TEST');
  console.log(fish.value_landing[i]);
  this.chartData = fishs as any [];

}

//            const birdcount = birds[i].fishing;
//            console.log('test 2');
//             console.log(birds[i].fishing);
this.chartData = fishs as any [];
*/




//  TEST 3 LOOP FOR SUR UN OBJET JSON venu du fichier 'birds.json' :
/*
  ngOnInit () {
    this.httpService.get('./assets/birds.json', {responseType: 'json'}).subscribe(
    fishs => {
      this.chartData = fishs as any [];
    });
  }
}
*/

//  TEST 2 LOOP FOR SUR UN OBJET JSON :

/*            const bird = {
              ID: '001',
              Name: 'Eurasian Collared-Dove',
              Type: 'Dove',
              Scientific_Name: 'Streptopelia',
              data: [600, 20, 80],
              fishing: [60, 70, 20]
            };  */
  //          console.log(bird);

 //           let i = 0;

/*            for (i = 0; i < fishs.fishing.length; i ++) { // bird
              console.log('######## TEST');
              console.log(fishs.data[i]); // bird
            }*/

            //        const birdcount = birds[i].fishing;
            //        console.log('test 2');
            //        console.log(birds[i].fishing);

            //        this.chartData = fishs as any [];
/*
            let i = 0;

            for (i = 0; i < fish.value_landing.length; i ++) {
              console.log('######## TEST');
              console.log(fish.value_landing[i]);
              this.chartData = fishs as any [];

            }

//            const birdcount = birds[i].fishing;
//            console.log('test 2');
//             console.log(birds[i].fishing);
            this.chartData = fishs as any [];
          });
//      })


//          (err: HttpErrorResponse) => {
//              console.log (err.message);
//          };
//        );
//    }

}



      });

    }

*/




/*  GRAPHIQUE TEST 1 - .JSON AVEC DONNEES STATIQUES :

export class AppComponent {
  title = 'Bar Chart Example in Angular 4';

  // ADD CHART OPTIONS.
  chartOptions = {
    responsive: true    // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
  };

  labels =  ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  // STATIC DATA FOR THE CHART IN JSON FORMAT.
  chartData = [
    {
      label: '1st Year',
      data: [21, 56, 4, 31, 45, 15, 57, 61, 9, 17, 24, 59]
    },
    {
      label: '2nd Year',
      data: [47, 9, 28, 54, 77, 51, 24]
    }
  ];

  // CHART COLOR.
  colors = [
    { // 1st Year.
      backgroundColor: 'rgba(77,83,96,0.2)'
    },
    { // 2nd Year.
      backgroundColor: 'rgba(30, 169, 224, 0.8)'
    }
  ];

  // CHART CLICK EVENT.
  onChartClick(event) {
    console.log(event);
  }
}

*/

/*
export class AppComponent {
//  title = 'Dataviz.fish';
  title = 'JSON to Table Example';  // MODIF POUR TEST IMPORT 'json'
  constructor (private httpService: HttpClient) { }
  arrBirds: string [];

  ngOnInit () { // MODIF POUR TEST IMPORT 'json' (fonctionne malgré indication d'erreur !) >> tableau d'oiseaux !
    this.httpService.get('./assets/birds.json').subscribe(
      data => {
        this.arrBirds = data as string [];	 // FILL THE ARRAY WITH DATA.
        console.log(this.arrBirds[1]);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }
*/
