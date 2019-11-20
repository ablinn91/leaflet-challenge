// Store our API endpoint inside queryUrl
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

//create function for circle size. 
function circleSize(data){
  return data *4;
};
// create function for color
function color(data){
  if (data >5){
    return 'red'
  }
  else if (data >4){
    return 'darkorange'
  }
  else if (data >3){
    return 'tan'
  }
  else if (data >2){
    return 'yellow'
  }
  else if (data >1){
    return 'darkgreen'
  }
  else{
    return 'lightgreen'
  }
};

//create map
//create the earthquake overlay

var earthquakes = new L.LayerGroup();

var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
d3.json(queryUrl, function(data){
  L.geoJSON(data.features,{
    pointToLayer: function (dataPoint,latlng) {
      return L.circleMarker(latlng, {radius: circleSize(dataPoint.properties.mag) });
    },
    
    style: function(dataFeature){
      return{
        fillColor: color(dataFeature.properties.mag),
        fillOpacity: .7,
        weight: .1,
        color: 'black'
      }
    },
    onEachFeature: function (feature, layer){
      layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");

    }
  }).addTo(earthquakes);
})

var myMap = L.map("map", {
  center: [
    37.09, -95.71
  ],
  zoom: 4.5,
  layers: [streetmap,earthquakes,map]
});




// var legend = L.control({position: ‘bottomright’});
// legend.onAdd = function (myMap) { } 





// Perform a GET request to the query URL
// d3.json(queryUrl, function(data) {
//   // Once we get a response, send the data.features object to the createFeatures function
//   createFeatures(data.features);



// });



// function createFeatures(earthquakeData) {

//   // Define a function we want to run once for each feature in the features array 
//   // Give each feature a popup describing the place and time of the earthquake
  
//   function onEachFeature(feature, layer) {
//     layer.bindPopup("<h3>" + feature.properties.place +
//       "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
//   }


//   // Create a GeoJSON layer containing the features array on the earthquakeData object
//   // Run the onEachFeature function once for each piece of data in the array
//   var earthquakes = L.geoJSON(earthquakeData, {
//     onEachFeature: onEachFeature
//   });

//   // Sending our earthquakes layer to the createMap function
//   createMap(earthquakes);
// }

// function createMap(earthquakes) {

//   // Define streetmap and darkmap layers
//   var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.streets",
//     accessToken: API_KEY
//   });
//   // Create our map, giving it the streetmap and earthquakes layers to display on load
//   var myMap = L.map("map", {
//     center: [
//       37.09, -95.71
//     ],
//     zoom: 5,
//     layers: [streetmap, earthquakes]
//   });
  

//   // Create a layer control
//   // Pass in our baseMaps and overlayMaps
//   // Add the layer control to the map
//   // L.control.layers(baseMaps, overlayMaps, {
//   //   collapsed: false
//   // }).addTo(myMap);
// }

// d3.json(queryUrl, function(response) {

//   console.log(response);

//   var heatArray = [];

//   for (var i = 0; i < response.length; i++) {
//     var location = response[i].geometry;


//     if (location) {
//       heatArray.push([location.coordinates[1], location.coordinates[0]]);
//     }
//   }

//   console.log(heatArray);
//   //creates location cordinates

//   var circle = L.circle(heatArray, {
//     color: 'red',
//     radius: 20
//   }).addTo(myMap);

// });