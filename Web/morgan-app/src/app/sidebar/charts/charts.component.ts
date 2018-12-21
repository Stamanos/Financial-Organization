import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './../../canvasjs.min';
import { ChartDataService } from '../../chart-data.service';
import { COSTS } from '../../mock-costs';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  constructor(private chartdata: ChartDataService) { }

  ngOnInit() {
    let pieChart = new CanvasJS.Chart("pieChartContainer", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title:{
        text: "Expense by Type"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>",
        indexLabel: "{name}",
        dataPoints: this.chartdata.costsByType(COSTS, 'type')
      }]
    });

    let areaChart = new CanvasJS.Chart("areaChartContainer", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title:{
        text: "Expense by Location"
      },
      data: [{
        type: "area",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>",
        indexLabel: "{name}",
        dataPoints: this.chartdata.costsByType(COSTS, 'location')
      }]
    });

    let barChart = new CanvasJS.Chart("barChartContainer", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title:{
        text: "Expense by User Status"
      },
      data: [{
        type: "bar",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>",
        indexLabel: "{name}",
        dataPoints: this.chartdata.costsByType(COSTS, 'userStatus')
      }]
    });
      
    pieChart.render();
    areaChart.render();
    barChart.render();
  }

}
