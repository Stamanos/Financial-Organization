
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
    input = document.getElementById("newSearchLocInput");
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
    var newamount = document.getElementById("newamount").value;
    var newDate = document.getElementById("newDate").value;
    var newDescription = document.getElementById("newDescription").value;
    var newType = document.getElementById("newTypeSelection").value;
    var newUserStatus = document.getElementById("newUserStatusSelection").value;
    var newMoodLevel = document.getElementById("newMoodLevelSelection").value;
    var newLocation = document.getElementById("newSearchLocInput").value;
    
    var JsonObj = {
        amount: newamount,
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

var ul = document.getElementById('myLocations');
function selectLocation(event) {
    var target = getEventTarget(event);
    document.getElementById("newSearchLocInput").value = target.innerHTML;
};