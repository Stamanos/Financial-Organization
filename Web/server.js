var http = require('http'),
    fs = require('fs');


fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(8000);
});


//________________________________DATABASE________________________________
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
 
// open database in memory
let db = new sqlite3.Database('./costs.sqlite', sqlite3.OPEN_READWRITE, (err) => {
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
