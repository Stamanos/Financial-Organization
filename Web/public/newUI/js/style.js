
// Get the modal
var modal = document.getElementById('cost');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// open the map function
function myMap() {
    var mapOptions = {
        center: new google.maps.LatLng(51.5, -0.12),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    

    //to make the center of the map the clients location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(initialLocation);
        });
    }
}


function searchingLocation() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("locationSelection");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myLocations");
    li = ul.getElementsByTagName("li");

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

//_______________________Make Json Object from Users Input______________________________

function makeNewOutlay(){
    var newAmount = document.getElementById("newAmount").value;
    var newDate = document.getElementById("newDate").value;
    var newDescription = document.getElementById("description").value;
    var newType = document.getElementById("typeSelection").value;
    var newUserStatus = document.getElementById("userStatusSelection").value;
    var newMoodLevel = document.getElementById("moodLevelSelection").value;
    var newLocation = document.getElementById("locationSelection").value;
    
    var JsonObj = {
        amount: newAmount,
        date: newDate,
        description: newDescription,
        type: newType,
        userStatus: newUserStatus,
        moodLevel: newMoodLevel,
        location: newLocation
    }
    console.log(JsonObj);
}

//_________________________SELECT LOCATION__________________________
function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement; 
}

//That is for making selections by the Json files
// $.getJSON( "./../../../columns.json", function( columns ) {
//     columns.forEach(col => {
//         var columnName = col;
//         var path = "./../../../" + columnName + ".json";
//         $.getJSON( path, function( obj ) {
//             var id = columnName + "Selection";
//             obj.forEach(element => {
//                 var x = document.getElementById(id);
//                 if(x != null){
//                     var c = document.createElement("option");
//                     c.text = element;
//                     c.value = element;
//                     x.options.add(c, 1);
//                     console.log(element);
//                 }
//                 else if(x = "location"){
//                     var c = document.createElement("li");
//                     var a = c.createElement("a");
//                     a.text = element;
//                     x.options.add(a, 1);
//                     console.log(element);
//                 }
//             });
//         });
//     });
// });