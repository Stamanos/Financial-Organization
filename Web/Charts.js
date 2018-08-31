
// $.getJSON( "./columns.json", function( columns ) {
//     columns.forEach(col => {
//         var columnName = col;
//         var path = "./" + columnName + ".json";
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
//             });
//         });
//     });
// });