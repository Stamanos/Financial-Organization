
//#region DATABASE
//sqlite3.OPEN_READONLY: open the database for read-only.
//sqlite3.OPEN_READWRITE : open the database for reading and writting.
//sqlite3.OPEN_CREATE: open the database, if the database does not exist, create a new database.

//#region Insert To Database
var amount = 111;
var type = 'DICK';
var date = '2/9/2018';
var description = 'DICK';
var userStatus =5;
var moodLevel = "inRelationship";
var weather = "NULL";
var location = "Chalandri";
var insertToTable = "INSERT INTO costs(amount, type, date, description, userStatus, moodLevel, weather, location) values(" +
                        "'" + amount + 
                        "', '" + type +
                        "', '" + date + 
                        "', '" + description + 
                        "', '" + userStatus + 
                        "', '" + moodLevel + 
                        "', '" + weather + 
                        "', '" + location + 
                        "')";

/* That what you insert into db.serialize//
db.each(insertToTable, (err, row) => {
        if (err) {
            console.error(err.message);
        }
    });
*/
//#endregion       

//#region Distinct from Database
/*
    db.each(`SELECT DISTINCT type FROM costs`, (err, row) => {
        if (err) {
            console.error(err.message);
        }
        console.log(row.type);
    });
*/
//#endregion

const sqlite3 = require('sqlite3').verbose();
 
// open database
let db = new sqlite3.Database('./Database/costs.sqlite', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the costs SQlite database.');
});
 
db.serialize(() => {
    db.each(`SELECT amount, type, date, description, userStatus, moodLevel, weather, location
             FROM costs`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row.amount + "\t" + row.type + "\t" + row.date + "\t" + row.description + "\t" + row.userStatus + "\t" + row.moodLevel + "\t" + row.weather + "\t" + row.location);
    });
  });

// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
//#endregion

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