import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

// import { HttpModule, JsonpModule } from '@angular/http';

import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

// ** AJOUTS :

// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { LinechartComponent } from './linechart/linechart.component';
import { LinechartService } from './linechart.service';
import { PostsComponent } from './posts/posts.component';
import { PostsService } from './posts.service';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here !
import { SearchEditorComponent } from './search-editor/search-editor.component';

import { ChartsModule } from 'ng2-charts';

/*
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
*/


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
//    RouterModule.forRoot(ROUTES), // Add routes to the app
//    HttpModule,
    ChartsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
  /*  HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )*/
  ],
  declarations: [
    AppComponent,
    LinechartComponent,
    PostsComponent,
    SearchEditorComponent,
  ],
  providers: [
    PostsService,
    LinechartService,
  ], // Add the posts service
  bootstrap: [ AppComponent ]
})
export class AppModule { }
