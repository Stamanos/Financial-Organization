var http = require('http');
var fs = require('fs');

const PORT=8080; 

fs.readFile('./ExcelFileUploaderConverToJson.html', function (err, html) {

    if (err){
        console.log('You fucked up son!');  
    }     

    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(PORT);
});