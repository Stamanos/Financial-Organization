var oFileIn;

$(function() {
    oFileIn = document.getElementById('my_file_input');
    if(oFileIn.addEventListener) {
        oFileIn.addEventListener('change', filePicked, false);
    }
});

$(function() {
    var oFileIn;
    oFileIn = document.getElementById('my_file_input');
    if(oFileIn.addEventListener) {
        oFileIn.addEventListener('change', filePicked, false);
    }
    });
    
    
          
var spendingItems;
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
    
    //const fs = require('fs');
    spendingItems.forEach(
        function(cost){
            console.log(cost);
            //const content = JSON.stringify(cost);
        }
    );
    // fs.writeFile("./JSON/costs.json", content, 'utf8', function (err) {
    //     if (err) {
    //         return console.log(err);
    //     }
    
    //     console.log("The file was saved!");
    // }); 
    });
};

// Tell JS To Start Reading The File.. You could delay this if desired
reader.readAsBinaryString(oFile);
}