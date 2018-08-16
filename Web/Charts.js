let spendingItems;

function showChart() {
    var chartamount = new CanvasJS.Chart("chartContainer", {

      title:{
        text: "amount of money has been spend"              
      },
      data: [//array of dataSeries              
        { //dataSeries object
          //ToDo:: put the dates as labels
         type: chartFilters(),
         dataPoints : contentFilters()
         }
       ]
     });

    chartamount.render();
  }

// functions that modify the spendingItems by the given filters
function contentFilters(){
  //declare values
  var amountFilter = document.getElementById("searchAmountInput").value;
  var typeFilter = document.getElementById("typeSelection").value;
  var dateFilter = document.getElementById("dateSelection").value;
  var descriptionFilter = document.getElementById("searchDescriptionInput").value;
  var userStatusFilter = document.getElementById("userStatusSelection").value;
  var moodLevelFilter = document.getElementById("moodLevelSelection").value;
  var locationFilter = document.getElementById("locationSelection").value;

  //Filtering
  const result =  spendingItems.
  filter(function(s){if(amountFilter !== "") {return parseFloat(s[" amount "]) == String(amountFilter);} else {return true;}}).
  filter(function(s){if(typeFilter !== "null") {return s.type == typeFilter;} else {return true;}}).
  filter(function(s){
    if(dateFilter !== "") {
      //creating the cost date as date time
      var costDate_array = String(s.date).split('/');
      var costDate = new Date("20" + costDate_array[2], costDate_array[0] - 1, costDate_array[1]);
      //creating the filter date as date time
      var filterDate_array = String(dateFilter).split('-');
      var filterDate = new Date(filterDate_array[0], filterDate_array[1] - 1, filterDate_array[2]);

      return (costDate.getTime() === filterDate.getTime());
    }
    else {
      return true;
    }}).
  filter(function(s){return String(s.description).includes(descriptionFilter);}).
  filter(function(s){if(userStatusFilter !== "null") {return s.userStatus == userStatusFilter;} else {return true;}}).
  filter(function(s){if(moodLevelFilter !== "null") {return s.moodLevel == moodLevelFilter;} else {return true;}}).
  filter(function(s){if(locationFilter !== "null") {return s.location == locationFilter;} else {return true;}}).
  map(i => {
    return {label: i.description, y: parseFloat(i[" amount "])};
  });

  console.log(result);
  return result;
}

function chartFilters(){ //ToDo:: rename it later to chart filters
  return document.getElementById("typeOfChartSelection").value;
}

function Refresh(){
  showChart();
}


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
    });
  };

  // Tell JS To Start Reading The File.. You could delay this if desired
  reader.readAsBinaryString(oFile);
}