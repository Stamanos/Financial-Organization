//#region DATABASE
const sqlite3 = require('sqlite3').verbose();
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

//Insert To Database
function makeNewOutlay(){
    var amount = document.getElementById("amount").value;
    var type = document.getElementById("typeSelection").value;
    var date = document.getElementById("date").value;
    var description = document.getElementById("description").value;
    var userStatus = document.getElementById("userStatusSelection").value;
    var moodLevel = document.getElementById("moodLevelSelection").value;
    var weather = "NULL";
    var location = document.getElementById("locationSelection").value;
    return "INSERT INTO costs(amount, type, date, description, userStatus, moodLevel, weather, location) values(" +
                            "'" + amount + 
                            "', '" + type +
                            "', '" + date + 
                            "', '" + description + 
                            "', '" + userStatus + 
                            "', '" + moodLevel + 
                            "', '" + weather + 
                            "', '" + location + 
                            "')";
}

//__________________________________Filtering from database___________________________________________
function amountFilters(start, end){
    return `SELECT amount FROM costs WHERE amount > ${start} WHERE amount < ${end}`;
}
function dateFilters(start, end){
    return `SELECT date FROM costs WHERE date > ${start} + WHERE date < ${end}`; 
}
function userStatusFilter(userStatus){
    return `SELECT userStatus FROM costs WHERE type = ${userStatus}`;
}
function moodLevelFilter(moodLevel){
    return `SELECT moodLevel FROM costs WHERE moodLevel =  ${moodLevel}`;
}
function locationFilter(location){
    return `SELECT location FROM costs WHERE location = ${location}`;
}
function typeOfChartFilter(typeOfChart){
    return `SELECT typeOfChart FROM costs WHERE typeOfChart = ${typeOfChart}`;
}
function descriptionFilter(description){
    return `SELECT description FROM costs WHERE description LIKE '%${description}%'`;
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

module.exports = {
    databaseConnection : function(order, databasePath){
        const sqlite3 = require('sqlite3').verbose();
        // open database
        let db = new sqlite3.Database(databasePath, sqlite3.OPEN_READONLY, (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Connected to the costs SQlite database.');
        });   
        db.serialize(() => {
            db.each(order, (err, row) => {
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
}