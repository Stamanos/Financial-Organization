import { Component, OnInit } from '@angular/core';
import { COSTS } from '../../mock-costs';
import { ChartDataService } from '../../chart-data.service';
import { Cost } from 'src/app/cost';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  costs = COSTS;

  constructor(private chartdata: ChartDataService) { }

  ngOnInit() {
    for(let i in COSTS[0]){
      console.log(i);
      console.log(this.chartdata.costsByType(COSTS, i));
    }
  }

}
