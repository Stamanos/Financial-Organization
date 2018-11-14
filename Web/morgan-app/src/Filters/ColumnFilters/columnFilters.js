export function columnFilters(){

    var column = document.getElementById("columnsSelection").value;
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
        label: Object.keys(dataDictionary)[i], 
        y: Object.values(dataDictionary)[i]
      });
    }
    
    showChart(columnChartValues, `amount of money by ${column}`);
  }