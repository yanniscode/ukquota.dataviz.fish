import { Component, OnInit } from '@angular/core';

import { NavlinksService } from '../../shared/todo-service/navlinks.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {

  constructor(
    private navlinksService: NavlinksService,
  ) { }

  ngOnInit() { }


  ScrollToTop() {

    const myAnchor: string = 'header';

    this.navlinksService.ScrollTo(myAnchor);
  }

}
