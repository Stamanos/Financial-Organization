let spendingItems, startDate, endDate, startRating, endRating;

//#region Display Charts
function showChart(chartDataPoints, chartTitle) {
    var chartrating = new CanvasJS.Chart("chartContainer", {
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
    chartrating.render();
  }
//#endregion



// functions that modify the spendingItems by the given filters
//#region Filtering
function contentFilters(){
  //declare values
  startRating = $( "#slider-range" ).slider( "values", 0 );
  endRating = $( "#slider-range" ).slider( "values", 1 );
  
  var nameFilter = document.getElementById("nameSelection").value;
  var descriptionFilter = document.getElementById("searchDescriptionInput").value;
  var commentFilter = document.getElementById("commentSelection").value;
  var linkFilter = document.getElementById("linkSelection").value;
  var typeFilter = document.getElementById("typeSelection").value;
  
  const result =  spendingItems.
  filter(function(s){//Cost Rating filter
    var cost = parseFloat(s["rating"]);
    return (parseFloat(startRating) <= cost && cost <= parseFloat(endRating));
  }).
  
  filter(function(s){if(nameFilter !== "null") {return s.name == nameFilter;} else {return true;}}).
  filter(function(s){return String(s.ExtraIngridients).includes(descriptionFilter);}).
  filter(function(s){if(commentFilter !== "null") {return s.comment == commentFilter;} else {return true;}}).
  filter(function(s){if(linkFilter !== "null") {return s.link == linkFilter;} else {return true;}}).
  filter(function(s){if(typeFilter !== "null") {return s.type == typeFilter;} else {return true;}});
  
  //This is for creating inner Html for costs
  var ratinglist = result.map(i => {
    return parseFloat(i["rating"]);
  });
  console.log(ratinglist);
  TotalCost(ratinglist);

  var filtersChartValues =  result.map(i => {
    return {label: i.name, y: parseFloat(i["rating"])};
  });

  showChart(filtersChartValues, "ratings on food have been made");
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
    if(spendingItems[i]["rating"] !== "null"){
      dataDictionary[`${spendingItems[i][`${column}`]}`] += parseFloat(spendingItems[i]["rating"]);
    }
  }

  const columnChartValues = [];
  for(let i = 0; i < Object.keys(dataDictionary).length; i++){ //make json obj to display data by chart graphics!
    columnChartValues.push({
      label: Object.keys(dataDictionary)[i], 
      y: Object.values(dataDictionary)[i]
    });
  }
  
  showChart(columnChartValues, `Foods rating by ${column}`);
}
//#endregion

//#region total-cost-to-inner-html
function TotalCost(ratingList){
  var sum = ratingList.reduce((a,b) => a + b, 0).toFixed(2);

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

//#region Slider
$( function() {
  $( "#slider-range" ).slider({
    range: true,
    min: 0,
    max: 500,
    values: [ 0, 500 ],
    slide: function( event, ui ) {
      $( "#ratingRange" ).val( "€" + ui.values[ 0 ] + " - €" + ui.values[ 1 ] );
    }
  });
  $( "#ratingRange" ).val( "€" + $( "#slider-range" ).slider( "values", 0 ) +
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
      if(key !== 'rating'&& key !== 'extraIngridients'){
        makeSelection(key, uniqueValues, "autoGenerated");
      }
      columns.push(key);
      uniqueValues = [];
    }
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