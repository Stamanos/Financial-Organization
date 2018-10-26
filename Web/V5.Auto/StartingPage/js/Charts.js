let spendingItems, startDate, endDate, startAmount, endAmount, excelColumns;

//#region Display Charts
function showChart(chartDataPoints, chartTitle) {
    var chartamount = new CanvasJS.Chart("chartContainer", {
      title:{
        text: chartTitle   
      },
      data: [             
        {
         type: document.getElementById("typeOfChartSelection").value,
         dataPoints : chartDataPoints
         }
       ],
     });
    chartamount.render();
  }
//#endregion

// functions that modify the spendingItems by the given filters
//#region Filtering
function contentFilters(){

  var nonStaticResult = spendingItems; //filters that are non static, Everything except "amount", "date", "description"
  excelColumns.forEach(function(column){
    nonStaticResult = nonStaticResult.filter(function(s){
        if(document.getElementById(`${column}Selection`).value !== "null"){
          return s[`${column}`] == document.getElementById(`${column}Selection`).value;
        }else{
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

//#region total-cost-to-inner-html
function TotalCost(amountList){
  var sum = amountList.reduce((a,b) => a + b, 0).toFixed(2);

  if(amountList.length > 0){
    var average = sum/amountList.length;
  }else{
    var average = 0;
  }

  $('#totalCost').empty(); //clean the previous if exists!
  var myDiv = document.getElementById("totalCost");
  var h2Total = document.createElement("h2");
  h2Total.textContent = "Total cost: " + sum.toString();
  myDiv.appendChild(h2Total);
  myDiv.appendChild(document.createElement("br"));
  var h2Average = document.createElement("h2");
  h2Average.textContent = "Average: " + average.toString();
  myDiv.appendChild(h2Average);
}
//#endregion

//#region ExcelToJson
$(function() {
  var oFileIn;
  oFileIn = document.getElementById('my_file_input');
  if(oFileIn.addEventListener) {
      oFileIn.addEventListener('change', filePicked, false);
  }
});

function filePicked(oEvent) {
  // Get The File From The Input
  var oFile = oEvent.target.files[0];
  // Create A File Reader HTML5
  var reader = new FileReader();
  // Ready The Event For When A File Gets Selected
  reader.onload = function(e) {
    var data = e.target.result;
    var cfb = XLSX.read(data, {type: 'binary'});
    cfb.SheetNames.forEach(function(sheetName) {
      spendingItems = XLS.utils.sheet_to_json(cfb.Sheets[sheetName]);   
      console.log(spendingItems);
      createHTML()
      foo.createHTML();
    });
  };
  // Tell JS To Start Reading The File.. You could delay this if desired
  reader.readAsBinaryString(oFile);
}
//#endregion

//#region selections filters innnerHtml
function createHTML(){
    var uniqueValues = [];
    excelColumns = [];
    for(var key in spendingItems[0]){
      for(var i = 0; i<spendingItems.length; i++){
        if(uniqueValues.indexOf(spendingItems[i][`${key}`]) === -1){
          uniqueValues.push(spendingItems[i][`${key}`]);
        }
      }
      if(key !== 'date' && key !== 'amount' && key !== 'weather' && key !== 'description'){
        makeSelection(key, uniqueValues, "autoGenerated");
        excelColumns.push(key);
      }
      //ToDo:: Store unique values
      uniqueValues = [];
    }
    makeSelection("columns", excelColumns, "columnFilters");
}

function makeSelection(input, optionList, divId){
  var myDiv = document.getElementById(divId);
  var newLabel = document.createElement("label");
  var newSelection = document.createElement("select");
  
  newLabel.textContent = input;
  newSelection.id = input + "Selection";
  
  myDiv.appendChild(newLabel);
  myDiv.appendChild(newSelection);

  optionList.forEach(opt => {
      var option = document.createElement("option");
      option.text = opt;
      option.value = opt;
      newSelection.appendChild(option);
  });
}
//#endregion