// *** IMPORTS DES MODULES ANGULAR:
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // 'reactive forms' utilisés ici
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here !
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { Router } from '@angular/router';

import { MatRangeDatepickerModule, MatRangeNativeDateModule } from '../../node_modules/mat-range-datepicker';


// ** MODULES  EXTERNES (librairies) :
// *** Note: complément pour material Angular (formulaire: plage de dates):
import { SatDatepickerModule, SatNativeDateModule } from '../../node_modules/saturn-datepicker/esm5/saturn-datepicker.js';

// *** MODULES COMPLÉMENTAIRES (CRÉÉS):
import { AppRoutingModule } from './app-routing.module';


// *** IMPORT DES SERVICES :
import { FishService } from './todo-data-service/fish.service';
import { HttpErrorHandler }     from './todo-data-service/http-error-handler.service';


// *** IMPORT DES COMPOSANTS :

// *** COMPOSANTS GENERALISTES:
import { AppComponent } from './app.component';

import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

// *** COMPOSANTS POUR FORMULAIRES:
import { MainAuthComponent } from './todo-component/forms/main-auth/main-auth/main-auth.component';

// *** COMPOSANTS POUR LE HTML:
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
    FormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule, // *** Note: import pour les champs de recherche
    MatProgressSpinnerModule,
    MatSelectModule,
    MatButtonModule,
    MatRangeDatepickerModule,
    MatRangeNativeDateModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    SatDatepickerModule,
    SatNativeDateModule,
    MatMomentDateModule,
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
    MainAuthComponent,
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
  entryComponents: [],
  bootstrap: [
    AppComponent,
  ],
  providers: [  // *** Note: référencer ici les services utilisés (injection de dépendances):
    FishService, 
    HttpErrorHandler,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})

export class AppModule { 

  constructor(router: Router) {
    // Use a custom replacer to display function names in the route configs
    const replacer = (key, value) => (typeof value === 'function') ? value.name : value;
    // console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }

}
