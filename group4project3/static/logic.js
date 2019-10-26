// Store our API endpoint inside queryUrl
var queryUrl = "/api/hotspots";

var mymap = L.map('map').setView([35.227087, -80.843127], 13);

// L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.streets",
//     accessToken: API_KEY
//   }).addTo(mymap);
// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  console.table(data);
  createFeatures(data);
});

function createFeatures(hotspotData) {
  blue_line = []
  red_line = []
  silver_line = []
  gold_line = []
  attraction_spots = []
  food_spots = []
  hotspotData.forEach(function (item, index) {

    var color;
      if (item.category == 'Blue' ) {
        color = 'blue'
      } else if (item.category == 'Red') {
        color = "red"
      } else if (item.category == 'Silver') {
        color = "gray"
      } else if (item.category == 'Gold') {
        color = "yellow"
      } else if (item.category == 'Attraction') {
        color = "green"
      } else  {
        color = "orange"
      }
    var place = L.circle([item.latitude, item.longitude], {
      color: 'black',
      fillColor: color,
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
      radius: 200
    }).bindPopup("<h4>" + item.name + "</h4><hr><p>Category: " + item.category + "</p>");

    if (item.category == 'Attraction') {
      attraction_spots.push(place);
    } else if (item.category == 'Blue') {
      blue_line.push(place);
    } else if (item.category == 'Red') {
      red_line.push(place);
    } else if (item.category == 'Silver') {
      silver_line.push(place);
    } else if (item.category == 'Gold') {
      gold_line.push(place);
    } else {
      food_spots.push(place);
    }

    // place.addTo(mymap);
  });

  var attractions = L.layerGroup(attraction_spots);
  var food = L.layerGroup(food_spots);
  var lynx_blue = L.layerGroup(blue_line);
  var lynx_red = L.layerGroup(red_line);
  var lynx_silver = L.layerGroup(silver_line);
  var lynx_gold = L.layerGroup(gold_line);

  createMap(attractions, food, lynx_blue, lynx_red, lynx_silver, lynx_gold);
}


function createMap(attractions, food, lynx_blue, lynx_red, lynx_silver, lynx_gold) {

  // Define streetmap and darkmap layers

  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Hotspots: attractions,
    Food: food,
    Blue: lynx_blue,
    Red: lynx_red,
    Gold: lynx_gold,
    Silver: lynx_silver
  };


  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(mymap);

}