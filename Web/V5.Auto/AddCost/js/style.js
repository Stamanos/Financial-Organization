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
        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ],
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

//_______________________Insert to Database from Users Input______________________________

function makeNewOutlay(){
    var amount = document.getElementById("amount").value;
    var type = document.getElementById("typeSelection").value;
    var date = document.getElementById("date").value;
    var description = document.getElementById("description").value;
    var userStatus = document.getElementById("userStatusSelection").value;
    var moodLevel = document.getElementById("moodLevelSelection").value;
    var weather = "NULL";
    var location = document.getElementById("locationSelection").value;
}

//_________________________SELECT LOCATION__________________________
function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement; 
}

//That is for making selections by the Json files
$.getJSON( "./../Json/columns.json", function( columns ) {
    columns.forEach(col => {
        var columnName = col;
        var path = "./../Json/" + columnName + ".json";
        $.getJSON( path, function( obj ) {
            var id = columnName + "Selection";
            obj.forEach(element => {
                var x = document.getElementById(id);
                if(id == "locationSelection"){
                    var c = document.createElement("option");
                    c.setAttribute("value", element);
                    x.appendChild(c);
                }
                else if(x != null){
                    var c = document.createElement("option");
                    c.text = element;
                    c.value = element;
                    x.options.add(c, 1);
                }
            });
        });
    });
});