import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { HttpModule, JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';

// ** AJOUTS :

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms'; /* reactive forms */
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here !
import { ChartsModule } from 'ng2-charts';
import { TabsComponent } from './todo-component/tabs/tabs.component'; /* essai d'onglets 1 */

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; /* 'material design' import */
import { MatInputModule, MatTabsModule, MatAutocompleteModule,  MatProgressSpinnerModule,
        MatSelectModule, MatButtonModule, NativeDateModule } from '@angular/material';
import { SatDatepickerModule, SatNativeDateModule } from '../../node_modules/saturn-datepicker/esm5/saturn-datepicker.js';

import { AgGridModule } from 'ag-grid-angular/main';

// import { DataTableComponent } from './todo-component/tabs/data-table/data-table.component';

// ***********

import { LeafletMapComponent } from './todo-component/tabs/leaflet-map/leaflet-map.component';

// *** pb : ESRI (Arcgis) = code propriétaire !
import { EsriMapCleanComponent } from './todo-component/tabs/esri-map-clean/esri-map-clean.component';
import { EsriMapComponent } from './todo-component/tabs/esri-map/esri-map.component';
import { MapStateService } from './todo-component/tabs/services/map-state.service';
// ***

import { MapComponent } from './todo-component/tabs/map/map.component';

// ***********

import { ChartUpdateComponent } from './todo-class/chart-update/chart-update.component';
// import { SpeciesChartComponent } from './todo-component/tabs/species-chart/species-chart.component';
import { ZonesChartComponent } from './todo-component/tabs/zones-chart/zones-chart.component';
// import { DatesChartComponent } from './todo-component/tabs/dates-chart/dates-chart.component';


import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';

import { MatDatepickerModule, MAT_DATE_FORMATS } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

import { MatRangeDatepickerModule, MatRangeNativeDateModule } from '../../node_modules/mat-range-datepicker';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

// const ROUTES = [
//   {
//     path: '', // prise en compte du chemin vide
//     redirectTo: 'graph', // affiche par défaut un tableau sur la page web
//     pathMatch: 'full'
//   },
//   {
//     path: '**', redirectTo: 'graph' // // prise en compte du chemin 'wildcard' (pour une page d'erreur 404, par exemple)
//   },
//   {
//     path: 'graph',
//     component: LinechartComponent
//   },
//   {
//     path: 'table',
//     component: PostsComponent
//   },
//   {
//     path: 'table/view/:id',
//     component: PostsComponent
//   }
// ];


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    ChartsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatInputModule,        // import pour les onglets
    MatAutocompleteModule, // import pour les champs de recherche
    MatProgressSpinnerModule,  // import pour les champs de recherche
    MatSelectModule,
    MatButtonModule,
    SatNativeDateModule,
    AgGridModule.withComponents([]),
    MatRangeDatepickerModule,
    MatRangeNativeDateModule,

    MatDatepickerModule,
    NativeDateModule,
    // MatNativeDateModule,
    SatDatepickerModule,
    MatMomentDateModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // RouterModule.forRoot(ROUTES), // Add routes to the app

  /*  HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false, delay: 1000 }
    )
  */
  ],
  declarations: [
    AppComponent,
    TabsComponent,
    // DataTableComponent,
    MapComponent,
    EsriMapComponent,
    EsriMapCleanComponent,
    ChartUpdateComponent,
    // SpeciesChartComponent,
    ZonesChartComponent,
    LeafletMapComponent,
    // DatesChartComponent
  ],
  exports: [
    MatTabsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    SatDatepickerModule,
    SatNativeDateModule,
  ],
  entryComponents: [
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    MapStateService
    // FishService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
