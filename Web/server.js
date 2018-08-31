const sqlite3 = require('sqlite3').verbose();
const charts = require('./serverSide/Charts');
// import { changeSelection } from './serverSide/Charts';
    orderColumn = "type";
    // open database
    let db = new sqlite3.Database('./Database/costs.sqlite', sqlite3.OPEN_READONLY, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the costs SQlite database.');
    });
        
    db.serialize(() => {
        db.each(`SELECT DISTINCT ` + orderColumn + ` FROM costs`, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            charts.changeSelection("typeSelection", row[orderColumn]);
        });
    });
    
    // close the database connection
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });

//#region SERVER
var http = require('http'),
    fs = require('fs'),
    request = require('request');

var server = http.createServer(function (request, response) {
  fs.readFile('./' + request.url, function(err, data) {
      if (!err) {
          var dotoffset = request.url.lastIndexOf('.');
          var mimetype = dotoffset == -1
                          ? 'text/plain'
                          : {
                              '.html' : 'text/html',
                              '.ico' : 'image/x-icon',
                              '.jpg' : 'image/jpeg',
                              '.png' : 'image/png',
                              '.gif' : 'image/gif',
                              '.css' : 'text/css',
                              '.js' : 'text/javascript'
                              }[ request.url.substr(dotoffset) ];
          response.setHeader('Content-type' , mimetype);
          response.end(data);
          console.log( request.url, mimetype );
      } else {
          console.log ('file not found: ' + request.url);
          response.writeHead(404, "Not Found");
          response.end();
      }
  });
});
server.listen(8000, function() {console.log("server listening on port 8000...")});
//#endregion