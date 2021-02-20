import { Component, OnInit } from '@angular/core';

import { NavlinksService } from '../../shared/todo-service/navlinks.service';

@Component({
  selector: 'app-xs-footer',
  templateUrl: './xs-footer.component.html',
  styleUrls: ['./xs-footer.component.scss']
})
export class XsFooterComponent implements OnInit {

  constructor(
    private navlinksService: NavlinksService,
  ) { }

  ngOnInit() { }
  

  ScrollToTop() {

    const myAnchor: string = 'xsmall-header';

    this.navlinksService.ScrollTo(myAnchor);

  }

}
