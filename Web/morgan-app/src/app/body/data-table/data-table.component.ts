import { Component, OnInit } from '@angular/core';
import { COSTS } from '../../mock-costs';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class MorganDataTableComponent implements OnInit {

  costs = COSTS;
  constructor() { }

  ngOnInit() {
  }

}
