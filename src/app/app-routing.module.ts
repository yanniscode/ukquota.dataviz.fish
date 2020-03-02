import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import des composants ... :
// import { LeafletMapComponent } from './todo-component/tabs/leaflet-map/leaflet-map.component';
import { DatesChartComponent } from './todo-component/tabs/dates-chart/dates-chart.component';
import { SpeciesChartComponent } from './todo-component/tabs/species-chart/species-chart.component';
import { ZonesMapComponent } from './todo-component/tabs/zones-map/zones-map.component';
import { DataTableComponent } from './todo-component/tabs/data-table/data-table.component';

const routes: Routes = [
  { path: '**', redirectTo: '/' },  // avant : '/map'
                                    // #### A TESTER > pas besoin si tabs ?? (One page), mais peut être si liens - modales ?? (images, icônes...)
                                    // Permet l'ajout d'un composant '/map' dans la page (endroit = décidé selon
                                    // où l'on place le 'router-outlet', dans le html : ici, testé en bas de 'tabs.component.ts')
  // { path: 'map', component: LeafletMapComponent },
  { path: 'speciechart', component: SpeciesChartComponent },
  { path: 'datechart', component: DatesChartComponent },
  { path: 'zonemap', component: ZonesMapComponent },
  { path: 'tablechart', component: DataTableComponent }
  // exemples de redirection automatique au chargement de l'application (ne marche plus ici, pour l'instant...)
  //  { path: '', redirectTo: '/fishes-linechartdata', /* pathMatch: 'full',*/ component: LinechartComponent },
  // { path: '', redirectTo: '/fishes-postsdata', /* pathMatch: 'full',*/ component: PostsComponent }
  //  { path: '', redirectTo: '/fish-dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
