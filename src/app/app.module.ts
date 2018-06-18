import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';



import { AppComponent } from './app.component';
import { LinechartComponent } from './linechart/linechart.component';
import { PostsComponent } from './posts/posts.component';
import { PostsService } from './posts.service';
import { LinechartService } from './linechart.service';
import { ChartsModule } from 'ng2-charts';


// Routes

const ROUTES = [
  {
    path: '',
    redirectTo: 'graphique',
    pathMatch: 'full'
  },
  {
    path: 'tableau',
    component: PostsComponent
  },
  {
    path: 'graphique',
    component: LinechartComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LinechartComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES), // Add routes to the app
    HttpModule,
    ChartsModule
  ],
  providers: [PostsService, LinechartService], // Add the posts service
  bootstrap: [AppComponent]
})
export class AppModule { }
