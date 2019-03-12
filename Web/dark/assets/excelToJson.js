//#region ExcelToJson
$(function() {
    var oFileIn;
    oFileIn = document.getElementById('my_file_input');
    if(oFileIn.addEventListener) {
        oFileIn.addEventListener('change', filePicked, false);
    }
  });
  //#endregion

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