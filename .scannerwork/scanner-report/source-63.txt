// *** IMPORTS DES MODULES ANGULAR:
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule }    from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // reactive forms

// *** pour la librairie 'material design':
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { MatNativeDateModule } from '@angular/material/core';

import { MatMomentDateModule } from '@angular/material-moment-adapter';
// import { MatRangeDatepickerModule, MatRangeNativeDateModule } from 'mat-range-datepicker';


// ** MODULES  EXTERNES (librairies) :
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';   // librairie Bootstrap
import { ChartsModule } from 'ng2-charts';                // graphiques 'chart.js' import !
import { AgGridModule } from 'ag-grid-angular';      // tableau (données)
import { LeafletModule } from '@asymmetrik/ngx-leaflet';  // *** carte Leaflet
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker/esm5/saturn-datepicker';

// *** MODULES COMPLÉMENTAIRES (CRÉÉS):
import { MainAuthRoutingModule } from './main-auth-routing.module';

// *** IMPORT DES COMPOSANTS :

// *** GENERALISTES:
import { TabsComponent } from '../../tabs/tabs.component';

// *** FORMULAIRES:
import { FormConnectionComponent } from '../form-connection/form-connection.component';
import { SearchFormComponent } from '../search-form/search-form.component';
import { FormAdminConnectionComponent } from '../form-admin-connection/form-admin-connection.component';
import { AutocompleteFormInscriptionCleanComponent } from '../autocomplete-form-inscription-clean/autocomplete-form-inscription-clean.component';

// *** TABLEAUX:
import { DataTableComponent } from '../../tables/data-table/data-table.component';
import { MembersListComponent } from '../../tables/members-list/members-list.component';

// *** GRAPHIQUES:
import { DatesChartComponent } from '../../graphics/dates-chart/dates-chart.component';
import { SpeciesChartComponent } from '../../graphics/species-chart/species-chart.component';

// *** CARTES:
import { ZonesMapComponent } from '../../maps/zones-map/zones-map.component';

// *** PARTAGÉS:
import { ChartUpdateComponent } from '../../../shared/chart-update/chart-update.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatButtonModule,
    MatNativeDateModule,
    // NativeDateModule,
    MatDatepickerModule,
    SatDatepickerModule,
    SatNativeDateModule,
    MatMomentDateModule,
    // MatRangeDatepickerModule,
    // MatRangeNativeDateModule,
    AgGridModule.withComponents([]),
    NgbModule,
    ChartsModule,
    LeafletModule,
    MainAuthRoutingModule,
  ],
  declarations: [
    TabsComponent,
    FormConnectionComponent,
    SearchFormComponent,
    FormAdminConnectionComponent,
    AutocompleteFormInscriptionCleanComponent,
    MembersListComponent,
    DataTableComponent,
    DatesChartComponent,
    SpeciesChartComponent,
    ZonesMapComponent,
    ChartUpdateComponent,
  ],
  entryComponents: [
    // DatesChartComponent,
    // SpeciesChartComponent,
    // ZonesMapComponent,
  ],
})
export class MainAuthModule { }
