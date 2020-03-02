import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { HttpModule, JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

// import { RouterModule } from '@angular/router';

// ** AJOUTS DE MODULES :

import { AppComponent } from './app.component';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule } from '@angular/forms'; /* reactive forms */
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here !
import { ChartsModule } from 'ng2-charts';
import { TabsComponent } from './todo-component/tabs/tabs.component'; /* essai d'onglets 1 */

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; /* 'material design' import */
import { MatFormFieldModule, MatInputModule, MatTabsModule, MatAutocompleteModule,  MatProgressSpinnerModule,
        MatSelectModule, MatButtonModule, NativeDateModule } from '@angular/material';
import { SatDatepickerModule, SatNativeDateModule } from '../../node_modules/saturn-datepicker/esm5/saturn-datepicker.js';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AgGridModule } from 'ag-grid-angular/main';

import { MatDatepickerModule, MAT_DATE_FORMATS } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

import { MatRangeDatepickerModule, MatRangeNativeDateModule } from '../../node_modules/mat-range-datepicker';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';


import { ChartUpdateComponent } from './todo-class/chart-update/chart-update.component';

// #### test - marche pas ici (pb de version d'angular ??):
// import { ShapefileLeafletComponent } from './todo-component/tabs/shapefile-leaflet/shapefile-leaflet.component';
// import { LeafletMapComponent } from './todo-component/tabs/leaflet-map/leaflet-map.component';

import { DatesChartComponent } from './todo-component/tabs/dates-chart/dates-chart.component';
import { SpeciesChartComponent } from './todo-component/tabs/species-chart/species-chart.component';
import { ZonesMapComponent } from './todo-component/tabs/zones-map/zones-map.component';
import { DataTableComponent } from './todo-component/tabs/data-table/data-table.component';

// ***********

import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';

// *** IMPORT DE SERVICES :
import { FishService } from './todo-data-service/fish.service';
import { SearchFormComponent } from './todo-component/tabs/search-form/search-form.component';

/* FORMULAIRES DE CONNEXION (USAGER) - EN TEST */
// import { ReactiveFormConnexionComponent } from './todo-component/reactive-form-connexion/reactive-form-connexion.component';
import { FormConnexionComponent } from './todo-component/tabs/form-connexion/form-connexion.component';
import { ConfigComponent } from './todo-component/config/config.component';

import { HttpErrorHandler }     from './todo-data-service/http-error-handler.service';
import { AutocompleteFormInscriptionCleanComponent } from './todo-component/tabs/autocomplete-form-inscription-clean/autocomplete-form-inscription-clean.component';
import { FormAdminConnexionComponent } from './todo-component/tabs/form-admin-connexion/form-admin-connexion.component';
import { MembersListComponent } from './todo-component/tabs/members-list/members-list.component';

// import { UnlessDirective } from './todo-directive/unless.directive';

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
    MatFormFieldModule,
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
    // NgbModule,
    LeafletModule.forRoot()

    // ********************** POUR TEST :
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // RouterModule.forRoot(ROUTES), // Add routes to the app

    // *******************
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false, delay: 1000 }
    // )
    // ********************
  ],
  declarations: [
    AppComponent,
    TabsComponent,
    DataTableComponent,
    ChartUpdateComponent,
    SpeciesChartComponent,
    ZonesMapComponent,
    // ShapefileLeafletComponent // marche pas ici
    // LeafletMapComponent,
    DatesChartComponent, 
    SearchFormComponent, 
    // ReactiveFormConnexionComponent, 
    FormConnexionComponent,
    ConfigComponent,
    AutocompleteFormInscriptionCleanComponent,
    FormAdminConnexionComponent, 
    MembersListComponent, 
    // UnlessDirective,
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
    SatNativeDateModule
  ],
  entryComponents: [
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    FishService,
    HttpErrorHandler
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})

export class AppModule { }
