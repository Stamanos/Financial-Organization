import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  startDate = new Date(2017, 0, 1);

  constructor() { }

  ngOnInit() {
  }

}
