import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';  //      AJOUT POUR TESTS
import { HttpErrorResponse } from '@angular/common/http';   //      AJOUT POUR TESTS

import { Chart } from 'chart.js';
//  import { LinechartService } from 'linechart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [],
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  
  title = 'Dataviz Fish App';

  // AVANT: DANS 'TABS.COMPONENT':
  
  // /* liste des membres inscription (users) */
  // showUsers = true;
  // /* pour app-config (gestion d'erreurs...) */
  // showConfig = true;
  // showSearch = true;

  // toggleUsers() { this.showUsers = !this.showUsers; }
  // toggleConfig() { this.showConfig = !this.showConfig; }
  // toggleSearch() { this.showSearch = !this.showSearch; }

}
