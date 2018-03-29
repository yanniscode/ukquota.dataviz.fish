import { Component, OnInit } from '@angular/core';
import { LinechartService } from '../linechart.service';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})

export class LinechartComponent implements OnInit {

  // instantiate posts to an empty array

  linechartPosts: any = [];
  constructor(private linechartService: LinechartService) { }

  chartData = [
    { data: [330, 600, 260, 700], label: 'Account A' },
    { data: [120, 455, 100, 340], label: 'Account B' },
    { data: [45, 67, 800, 500], label: 'Account C' }
  ];
  chartLabels = ['January', 'February', 'Mars', 'April'];

  onChartClick(event) {
    console.log(event);
  }

  ngOnInit() {
    // Retrieve posts from the API
    this.linechartService.getAllPosts().subscribe(posts => {
      this.linechartPosts = posts;
    });
  }
}

