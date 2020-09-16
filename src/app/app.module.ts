// *** IMPORTS DES MODULES ANGULAR:
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // 'reactive forms' utilisés ici
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here !
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatTabsModule, MatAutocompleteModule, MatProgressSpinnerModule, MatSelectModule, MatButtonModule, NativeDateModule } from '@angular/material';  // pour la librairie 'material design'
import { MatRangeDatepickerModule, MatRangeNativeDateModule } from '../../node_modules/mat-range-datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';


import { AppRoutingModule } from './app-routing.module';

// ** MODULES  EXTERNES (librairies) :
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // librairie Bootstrap
import { ChartsModule } from 'ng2-charts';  // graphiques 'chart.js' import !
import { AgGridModule } from 'ag-grid-angular/main';  // tableau (données)
import { LeafletModule } from '@asymmetrik/ngx-leaflet';  // *** carte Leaflet

// *** Note: complément pour material Angular (formulaire: plage de dates):
import { SatDatepickerModule, SatNativeDateModule } from '../../node_modules/saturn-datepicker/esm5/saturn-datepicker.js';


// *** IMPORT DES SERVICES :
import { FishService } from './todo-data-service/fish.service';
import { HttpErrorHandler }     from './todo-data-service/http-error-handler.service';

// *** IMPORT DES COMPOSANTS :

// *** GENERALISTES:
import { AppComponent } from './app.component';
import { TabsComponent } from './todo-component/tabs/tabs.component'; // essai d'onglets 1

import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';


// *** FORMULAIRES:
import { AutocompleteFormInscriptionCleanComponent } from './todo-component/forms/autocomplete-form-inscription-clean/autocomplete-form-inscription-clean.component';
import { FormAdminConnectionComponent } from './todo-component/forms/form-admin-connection/form-admin-connection.component';
import { FormConnectionComponent } from './todo-component/forms/form-connection/form-connection.component';
import { SearchFormComponent } from './todo-component/forms/search-form/search-form.component';

// *** TABLEAUX:
import { MembersListComponent } from './todo-component/tables/members-list/members-list.component';
import { DataTableComponent } from './todo-component/tables/data-table/data-table.component';

// *** GRAPHIQUES:
import { DatesChartComponent } from './todo-component/graphics/dates-chart/dates-chart.component';
import { SpeciesChartComponent } from './todo-component/graphics/species-chart/species-chart.component';

// *** CARTES:
import { ZonesMapComponent } from './todo-component/maps/zones-map/zones-map.component';

// *** PARTAGÉS:
import { ChartUpdateComponent } from './shared/chart-update/chart-update.component';

// *** HTML:
import { MainComponent } from './html/main/main.component';

import { HeaderComponent } from './html/header/header.component';
import { FooterComponent } from './html/footer/footer.component';
import { InfosComponent } from './html/infos/infos.component';

import { MediumHeaderComponent } from './html/medium-header/medium-header.component';
import { MediumFooterComponent } from './html/medium-footer/medium-footer.component';
import { MediumInfosComponent } from './html/medium-infos/medium-infos.component';

import { XsHeaderComponent } from './html/xs-header/xs-header.component';
import { XsInfosComponent } from './html/xs-infos/xs-infos.component';
import { XsFooterComponent } from './html/xs-footer/xs-footer.component';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule, // *** Note: import pour les champs de recherche
    MatProgressSpinnerModule,
    MatSelectModule,
    MatButtonModule,
    NgbModule,
    MatRangeDatepickerModule,
    MatRangeNativeDateModule,
    MatDatepickerModule,
    NativeDateModule,
    ReactiveFormsModule,
    SatDatepickerModule,
    SatNativeDateModule,
    MatMomentDateModule,
    AgGridModule.withComponents([]),
    ChartsModule,
    LeafletModule.forRoot(),
    AppRoutingModule, // *** Note: Routing: import de 'app-routing-module.ts': le dernier déclaré les 'imports'
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
  declarations: [
    AppComponent,
    TabsComponent,
    DataTableComponent,
    FormConnectionComponent,
    SearchFormComponent, 
    ChartUpdateComponent,
    DatesChartComponent,
    SpeciesChartComponent,
    ZonesMapComponent,
    FormAdminConnectionComponent, 
    AutocompleteFormInscriptionCleanComponent,
    MembersListComponent,
    PageNotFoundComponent,
    HeaderComponent,
    XsHeaderComponent,
    FooterComponent,
    XsFooterComponent,
    InfosComponent,
    XsInfosComponent,
    MainComponent,
    MediumHeaderComponent,
    MediumFooterComponent,
    MediumInfosComponent,
  ],
  entryComponents: [
    DatesChartComponent,
    SpeciesChartComponent,
    ZonesMapComponent,
  ],
  bootstrap: [
    AppComponent,
  ],
  providers: [  // *** Note: référencer ici les services utilisés (injection de dépendances):
    FishService, 
    HttpErrorHandler,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})

export class AppModule { }
