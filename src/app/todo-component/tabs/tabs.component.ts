import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  encapsulation: ViewEncapsulation.None // ajout pour modif CSS des Tab (en test)
})
export class TabsComponent {
  
  // /* liste des membres inscription (users) */
  // showUsers = true;
  // /* pour app-config (gestion d'erreurs...) */
  // showConfig = true;
  // showSearch = true;

  // toggleUsers() { this.showUsers = !this.showUsers; }
  // toggleConfig() { this.showConfig = !this.showConfig; }
  // toggleSearch() { this.showSearch = !this.showSearch; }

}
