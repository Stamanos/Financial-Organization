// functions that modify the spendingItems by the given filters
//#region Filtering
function contentFilters(){

    var nonStaticResult = spendingItems; //filters that are non static, Everything except "amount", "date", "description"
    excelColumns.forEach(function(column){
      nonStaticResult = nonStaticResult.filter(function(s){
          if(document.getElementById(`${column}Selection`).value !== "null"){
            return s[`${column}`] == document.getElementById(`${column}Selection`).value;
          }
          else{
            return true;
          }
      });
    });
  
    //declare values
    startAmount = $( "#slider-range" ).slider( "values", 0 );
    endAmount = $( "#slider-range" ).slider( "values", 1 );
    
    const result =  nonStaticResult.
    filter(function(s){return (parseFloat(startAmount) <= parseFloat(s["amount"]) && parseFloat(s["amount"]) <= parseFloat(endAmount));}).//Cost Amount filter
    filter(function(s){return String(s.description).includes(document.getElementById("searchDescriptionInput").value);}).
    filter(function(s){
      if(document.getElementById("dateCheckbox").checked) {//creating the cost date as date time
        var costDate_array = String(s.date).split('/');
        var costDate = new Date("20" + costDate_array[2], costDate_array[0] - 1, costDate_array[1]);//creating the filter date as date time (Start Date)
        var filterStartDate_array = startDate.format('YYYY-MM-DD').split('-');
        var filterStartDate = new Date(filterStartDate_array[0], filterStartDate_array[1] - 1, filterStartDate_array[2]);//creating the filter date as date time (End Date)
        var filterEndDate_array = endDate.format('YYYY-MM-DD').split('-');
        var filterEndDate = new Date(filterEndDate_array[0], filterEndDate_array[1] - 1, filterEndDate_array[2]);
        return ((+filterStartDate.getTime() <= +costDate.getTime()) && (+costDate.getTime() <= +filterEndDate.getTime()));
      }
      else {
        return true;
      }});
    
    //This is for creating inner Html for costs
    var amountlist = result.map(i => { return parseFloat(i["amount"]); });
    TotalCost(amountlist); //to display the total cost down below the filters
  
    //This Is Temporary, But is Calculating the cost by month
    var temp = result.map(i => { 
      return {date: i.date, amount: parseFloat(i["amount"])}
    });
    FiterByMonth(temp);
  
    //Pasing values to create chart
    var filtersChartValues =  result.map(i => {
      return {label: i.description, y: parseFloat(i["amount"])};
    });
    showChart(filtersChartValues, "amount of money has been spend");
  }
  //#endregion
  
  //#region Column Filtering
  function columnFilters(){
  
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
  //#endregion
  