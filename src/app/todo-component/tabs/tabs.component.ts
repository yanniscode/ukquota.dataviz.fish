import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  encapsulation: ViewEncapsulation.None // ajout pour modif CSS des Tab (en test)
})
export class TabsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
