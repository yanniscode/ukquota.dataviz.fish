import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
//  { path: '', redirectTo: '/fish-dashboard', pathMatch: 'full' }, // exemple de redirection automatique au chargement de l'application
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule { }
