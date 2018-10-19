let spendingItems, startDate, endDate, startAmount, endAmount;

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
  //declare values
  startAmount = $( "#slider-range" ).slider( "values", 0 );
  endAmount = $( "#slider-range" ).slider( "values", 1 );
  
  var typeFilter = document.getElementById("typeSelection").value;
  var dateFilter = document.getElementById("dateCheckbox").checked;
  var descriptionFilter = document.getElementById("searchDescriptionInput").value;
  var userStatusFilter = document.getElementById("userStatusSelection").value;
  var moodLevelFilter = document.getElementById("moodLevelSelection").value;
  var locationFilter = document.getElementById("locationSelection").value;
  
  const result =  spendingItems.
  filter(function(s){//Cost Amount filter
    var cost = parseFloat(s[" amount "]);
    return (parseFloat(startAmount) <= cost && cost <= parseFloat(endAmount));
  }).
  filter(function(s){if(typeFilter !== "null") {return s.type == typeFilter;} else {return true;}}).
  filter(function(s){
    if(dateFilter) {
      //creating the cost date as date time
      var costDate_array = String(s.date).split('/');
      var costDate = new Date("20" + costDate_array[2], costDate_array[0] - 1, costDate_array[1]);
      //creating the filter date as date time (Start Date)
      var filterStartDate_array = startDate.format('YYYY-MM-DD').split('-');
      var filterStartDate = new Date(filterStartDate_array[0], filterStartDate_array[1] - 1, filterStartDate_array[2]);
      //creating the filter date as date time (End Date)
      var filterEndDate_array = endDate.format('YYYY-MM-DD').split('-');
      var filterEndDate = new Date(filterEndDate_array[0], filterEndDate_array[1] - 1, filterEndDate_array[2]);
      return ((+filterStartDate.getTime() <= +costDate.getTime()) && (+costDate.getTime() <= +filterEndDate.getTime()));
    }
    else {
      return true;
    }}).
  filter(function(s){return String(s.description).includes(descriptionFilter);}).
  filter(function(s){if(userStatusFilter !== "null") {return s.userStatus == userStatusFilter;} else {return true;}}).
  filter(function(s){if(moodLevelFilter !== "null") {return s.moodLevel == moodLevelFilter;} else {return true;}}).
  filter(function(s){if(locationFilter !== "null") {return s.location == locationFilter;} else {return true;}});
  
  //This is for creating inner Html for costs
  var amountlist = result.map(i => {
    return parseFloat(i[" amount "]);
  });
  TotalCost(amountlist);

  var filtersChartValues =  result.map(i => {
    return {label: i.description, y: parseFloat(i[" amount "])};
  });

  showChart(filtersChartValues, "amount of money has been spend");
}
//#endregion

//#region Column Filtering
function columnFilters(){
  var column = document.getElementById("columnsSelection").value;

  var uniqueValues = [];
  var dataDictionary = {};
  for(let i = 0; i<spendingItems.length; i++){
    if(uniqueValues.indexOf(spendingItems[i][`${column}`]) === -1){ //if is unique!
      uniqueValues.push(spendingItems[i][`${column}`]);
      dataDictionary[`${spendingItems[i][`${column}`]}`] = 0.0; //put a starting value 
    }
    if(spendingItems[i][" amount "] !== "null"){
      dataDictionary[`${spendingItems[i][`${column}`]}`] += parseFloat(spendingItems[i][" amount "]);
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

  $('#totalCost').empty(); //clean the previous if exists!
  var myDiv = document.getElementById("totalCost");
  var h2 = document.createElement("h2");
  h2.textContent = "Total cost: " + sum.toString();
  myDiv.appendChild(h2);
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
    console.log(cfb)
    cfb.SheetNames.forEach(function(sheetName) {
      spendingItems = XLS.utils.sheet_to_json(cfb.Sheets[sheetName]);   
      console.log(spendingItems);
      createHTML();
    });
  };
  // Tell JS To Start Reading The File.. You could delay this if desired
  reader.readAsBinaryString(oFile);
}
//#endregion

//#region Calendar
$(function() {
  var start = moment().subtract(29, 'days');
  var end = moment();

  function cb(start, end) {
      $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
      startDate = start;
      endDate = end;
  }
  $('#reportrange').daterangepicker({
      startDate: start,
      endDate: end,
      ranges: {
         'Today': [moment(), moment()],
         'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
         'Last 7 Days': [moment().subtract(6, 'days'), moment()],
         'Last 30 Days': [moment().subtract(29, 'days'), moment()],
         'This Month': [moment().startOf('month'), moment().endOf('month')],
         'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      }
  }, cb);
  cb(start, end);
});
//#endregion

//#region Slider
$( function() {
  $( "#slider-range" ).slider({
    range: true,
    min: 0,
    max: 500,
    values: [ 0, 500 ],
    slide: function( event, ui ) {
      $( "#amountRange" ).val( "€" + ui.values[ 0 ] + " - €" + ui.values[ 1 ] );
    }
  });
  $( "#amountRange" ).val( "€" + $( "#slider-range" ).slider( "values", 0 ) +
    " - €" + $( "#slider-range" ).slider( "values", 1 ) );
});
//#endregion

//#region selections filters innnerHtml
function createHTML(){
    var uniqueValues = [];
    var columns = [];
    for(var key in spendingItems[0]){
      for(var i = 0; i<spendingItems.length; i++){
        if(uniqueValues.indexOf(spendingItems[i][`${key}`]) === -1){
          uniqueValues.push(spendingItems[i][`${key}`]);
        }
      }
      console.log(uniqueValues);
      if(key !== 'date' && key !== ' amount ' && key !== 'weather' && key !== 'description'){
        makeSelection(key, uniqueValues, "autoGenerated");
      }
      columns.push(key);
      uniqueValues = [];
    }
    console.log(columns);
    makeSelection("columns", columns, "columnFilters");
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