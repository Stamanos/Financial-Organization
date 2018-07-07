let spendingItems;

function showChart() {
    var chartamount = new CanvasJS.Chart("chartContainer", {

      title:{
        text: "amount of money has been spend"              
      },
      data: [//array of dataSeries              
        { //dataSeries object
          //ToDo:: put the dates as labels
         type: styleFilters(),
         dataPoints : contentFilters()
         }
       ]
     });

    chartamount.render();
  }

// functions that modify the spendingItems by the given filters
function contentFilters(){
  //declare values
  var amountFilter = "null";
  var typeFilter = document.getElementById("typeSelection").value;
  var dateFilter = "null";
  var descriptionFilter = "null";
  var userStatusFilter = document.getElementById("userStatusSelection").value;
  var moodLevelFilter = document.getElementById("moodLevelSelection").value;
  var locationFilter = document.getElementById("locationSelection").value;

  const result =  spendingItems.
  filter(function(s){if(amountFilter !== "null") {return s.amount == amountFilter;} else {return true;}}).
  filter(function(s){if(typeFilter !== "null") {return s.type == typeFilter;} else {return true;}}).
  filter(function(s){if(dateFilter !== "null") {return s.date == dateFilter;} else {return true;}}).
  filter(function(s){if(descriptionFilter !== "null") {return s.description == descriptionFilter;} else {return true;}}).
  filter(function(s){if(userStatusFilter !== "null") {return s.userStatus == userStatusFilter;} else {return true;}}).
  filter(function(s){if(moodLevelFilter !== "null") {return s.moodLevel == moodLevelFilter;} else {return true;}}).
  filter(function(s){if(locationFilter !== "null") {return s.location == locationFilter;} else {return true;}}).
  map(i => {
    return {label: i.description, y: parseFloat(i[" amount "])};
  });

  console.log(result);

  return result;
}

function styleFilters(){ //ToDo:: rename it later to chart filters
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

