//#region DATABASE
const sqlite3 = require('sqlite3').verbose();
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

//Insert To Database
function makeNewOutlay(){
    const sqlite3 = require('sqlite3').verbose();
    var amount = document.getElementById("amount").value;
    var type = document.getElementById("typeSelection").value;
    var date = document.getElementById("date").value;
    var description = document.getElementById("description").value;
    var userStatus = document.getElementById("userStatusSelection").value;
    var moodLevel = document.getElementById("moodLevelSelection").value;
    var weather = "NULL";
    var location = document.getElementById("locationSelection").value;
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

    // open database
    let db = new sqlite3.Database('./Database/costs.sqlite', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the costs SQlite database.');
    });
        
    db.serialize(() => {
        db.each(insertToTable, (err, row) => {
            if (err) {
                console.error(err.message);
            }
        });
    });
    
    // close the database connection
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}

function applyFilters(amount, start, end){
    var searchInTable = `SELECT `+ `amount` + ` FROM costs WHERE amount > ` + start +
    ` WHERE amount < ` + end;
}

//sqlite3.OPEN_READONLY: open the database for read-only.
//sqlite3.OPEN_READWRITE : open the database for reading and writting.
//sqlite3.OPEN_CREATE: open the database, if the database does not exist, create a new database.

// That what you insert into db.serialize
/* 
        db.each(`SELECT amount, type, date, description, userStatus, moodLevel, weather, location
                FROM costs`, (err, row) => {
        if (err) {
            console.error(err.message);
        }
        console.log(row.amount + "\t" + row.type + "\t" + row.date + "\t" + row.description + "\t" + row.userStatus + "\t" + row.moodLevel + "\t" + row.weather + "\t" + row.location);
        });
*/
//#endregion