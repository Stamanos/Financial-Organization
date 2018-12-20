import { Component, OnInit } from '@angular/core';
import { ChartDataService } from '../../chart-data.service';
import * as CanvasJS from './../../canvasjs.min';
import { COSTS } from '../../mock-costs';

@Component({
  selector: 'app-chart-area',
  templateUrl: './chart-area.component.html',
  styleUrls: ['./chart-area.component.css']
})
export class ChartAreaComponent implements OnInit {

  constructor(private chartdata: ChartDataService) { }

  ngOnInit() {
    let chart = new CanvasJS.Chart("chartContainer", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title:{
        text: "Expenses based on Type"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: this.chartdata.costsByType(COSTS)
      }]
    });
      
    chart.render();
  }
}
