import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

import { MainAuthComponent } from './todo-component/forms/main-auth/main-auth/main-auth.component';
import { MainAuthGuard } from './todo-component/forms/main-auth/main-auth.guard';

// import { TabsComponent } from './todo-component/tabs/tabs.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: '',
    component: MainAuthComponent,
    // canActivate: [MainAuthGuard],
    canActivateChild: [MainAuthGuard],
    loadChildren: () => import('./todo-component/forms/main-auth/main-auth.module').then(m => m.MainAuthModule),  // à voir...
    // children: [
    //   {
    //     path: 'main', // child route path
    //     component: TabsComponent, // child route component that the router renders
    //   },
    // ],
  },
  // {
  //   path: 'main',
  //   component: TabsComponent,
  // },
  {
    path: 'error-404',
    component: PageNotFoundComponent,
  },
  {
    path: '',   // *** Note: prise en compte du chemin vide (pas des sous-chemins mal indiqués...)
    redirectTo: '',
    pathMatch: 'full',   // *** Note: IMPORTANT: pour éviter une boucle infinie si chemin indiqué = vide
  },
  {
    path: '**',   // *** Note: prise en compte du chemin 'wildcard' :selectionne la page d'erreur 404 (erreur d'url)
    redirectTo: '/error-404',
  },
];


export const appRouting = RouterModule.forRoot(routes);

const routerOptions: ExtraOptions = {
    // useHash: false,
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
