import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './../../canvasjs.min';
import { COSTS } from '../../mock-costs';

@Component({
  selector: 'app-chart-area',
  templateUrl: './chart-area.component.html',
  styleUrls: ['./chart-area.component.css']
})
export class ChartAreaComponent implements OnInit {

  constructor() { }

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
        dataPoints: this.costsByType(COSTS)
      }]
    });
      
    chart.render();
  }

  costsByType(spendingItems){
    var column = "type";
    var uniqueValues = [];
    var dataDictionary = {}; //Dictionary that display chart values
    for(let i = 0; i<spendingItems.length; i++){
      if(uniqueValues.indexOf(spendingItems[i][`${column}`]) === -1){ //if is unique!
        uniqueValues.push(spendingItems[i][`${column}`]);
        dataDictionary[`${spendingItems[i][`${column}`]}`] = 0.0; //put a starting value 
      }
      if(spendingItems[i]["amount"] !== "null"){
        dataDictionary[`${spendingItems[i][`${column}`]}`] += parseFloat(spendingItems[i]["amount"]);
      }
    }

    const columnChartValues = [];
    for(let i = 0; i < Object.keys(dataDictionary).length; i++){ //make json obj to display data by chart graphics!
      columnChartValues.push({
        y: Object.values(dataDictionary)[i],
        name: Object.keys(dataDictionary)[i]
      });
    }
    return columnChartValues.filter(e => e.name !== "null")
  }

}
