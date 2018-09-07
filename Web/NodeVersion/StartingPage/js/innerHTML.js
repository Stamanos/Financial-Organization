//That is for making selections by the Json files
$.getJSON( "./../../../Model/Json/columns.json", function( columns ) {
    columns.forEach(col => {
        var columnName = col;
        var path = "./../../../Model/Json/" + columnName + ".json";
        $.getJSON( path, function( obj ) {
            var id = columnName + "Selection";
            obj.forEach(element => {
                var x = document.getElementById(id);
                if(x != null){
                    var c = document.createElement("option");
                    c.text = element;
                    c.value = element;
                    x.options.add(c, 1);
                    console.log(element);
                }
            });
        });
    });
});

function filter_open() {
    document.getElementById("filtersContainer").style.width = "20%";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("chartWrapper").style.width = "80%";
}

function filter_close() {
    document.getElementById("filtersContainer").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.getElementById("chartWrapper").style.width = "96%";
}

