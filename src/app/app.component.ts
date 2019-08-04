import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';  //      AJOUT POUR TESTS
import { HttpErrorResponse } from '@angular/common/http';   //      AJOUT POUR TESTS

import { Chart } from 'chart.js';
//  import { LinechartService } from 'linechart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [],
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Dataviz Fish App';

  constructor() {
  }
}
