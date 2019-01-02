import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  constructor() { }

  costsByType(spendingItems, column){ //returns a Json obj with the unique values of a column
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
    return columnChartValues.filter(e => e.name !== "null") //delete the "null" element
  }

  typesOfCost(spendingItems){//returns the keys of the Json obj
    var excelColumns = [];
    for(var key in spendingItems[0]){
      excelColumns.push(key);
    }
    return excelColumns;
  }

}
