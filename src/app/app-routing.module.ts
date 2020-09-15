import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';

import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { TabsComponent } from './todo-component/tabs/tabs.component';


const routes: Routes = [
  {
    path: 'main',
    component: TabsComponent,
  },
  {
    path: 'error-404',
    component: PageNotFoundComponent,
  },
  {
    path: '',   // *** Note: prise en compte du chemin vide (pas des sous-chemins mal indiqués...)
    redirectTo: '/main',
    pathMatch: 'full',   // *** Note: IMPORTANT: pour éviter une boucle infinie si chemin indiqué = vide
  },
  {
    path: '**',   // *** Note: prise en compte du chemin 'wildcard' :selectionne la page d'erreur 404 (erreur d'url)
    redirectTo: '/error-404',
  },
];


export const appRouting = RouterModule.forRoot(routes);

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',   // *** Note: permet l'utilisation des ancres de page (avec le routing)
  enableTracing: true,
};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, routerOptions),
    CommonModule
  ],
  exports: [ RouterModule ],
  declarations: []
})

export class AppRoutingModule { }
