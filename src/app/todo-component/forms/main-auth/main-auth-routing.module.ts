import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsComponent } from '../../tabs/tabs.component';


const routes: Routes = [
  {
    path: 'main',
    component: TabsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainAuthRoutingModule { }
