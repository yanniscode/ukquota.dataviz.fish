import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LinechartComponent } from './linechart/linechart.component';
import { PostsComponent } from './posts/posts.component';
import { PostsService } from './posts.service';
import { LinechartService } from './linechart.service';

import { ChartsModule } from 'ng2-charts'; // ajout
import { HttpClientModule } from '@angular/common/http';


// Routes

const ROUTES = [
  {
    path: '',
    redirectTo: 'graph', // affiche par défaut un graphique sur la page web
    pathMatch: 'full'
  },
  {
    path: 'table',
    component: PostsComponent
  },
  {
    path: 'graph',
    component: LinechartComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LinechartComponent,
    PostsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES), // Add routes to the app
    HttpModule,
    ChartsModule,
    HttpClientModule,
  ],
  providers: [PostsService, LinechartService], // Add the posts service
  bootstrap: [AppComponent]
})
export class AppModule { }
