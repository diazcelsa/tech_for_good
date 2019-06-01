// CONNECT TO MY RESTDB.IO DATABASE TO QUERY HISTORICAL DATAPOINTS
var settings = {
  "async": true,
  "crossDomain": true,
  // ADD PATH TO MY DATABASE
  "url": "http://leafletbiz-e47f.restdb.io/rest/data-leaflet",
  "method": "GET",
  "headers": {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,GET,PUT",
    "Access-Control-Allow-Headers": "Authorization, Lang",
    "content-type": "application/json",
    // ADD MY KEY
    "x-apikey": "e71b1800a434f84bad328c27ffb3044e28930",
    "cache-control": "no-cache"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

var cities = L.layerGroup();

// GET HISTORICAL LAT/LONG/EVENT FROM DATABASE
//const postEvents = (response) => {
//    var i;
//    for (i = 0; i < response.length; i++) {
//
//      L.marker([response[i].latitude, response[i].longitude]).bindPopup(response[i].event).addTo(cities)
//
//}
////  }
//};

//L.marker([41.3858903,2.1646433]).bindPopup('ImaginCafé').addTo(cities),
//L.marker([41.3862262,2.1731545]).bindPopup('allWomen').addTo(cities),
//L.marker([41.39899,2.2027963]).bindPopup('Coworking Poblenou').addTo(cities),
//L.marker([41.3996779,2.171314]).bindPopup('MOB Coworking').addTo(cities);


var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
    streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});

var map = L.map('map', {
    center: [41.3959241, 2.1539785],
    zoom: 12,
    layers: [streets, cities]
});

//var Marker = L.marker([41.3858903,2.1546533]).on('dbclick', onClick).addTo(map)
//
//// Create new markers from users interactions
//function onClick(e) {
//    alert(this.getLatLng());
//}
//L.DomEvent.addListener(marker.label, 'dbclick', function(e) { this.togglePopup() }, marker);



map.on('click', function(e){
    var marker = new L.marker(e.latlng).addTo(cities);

    // Extract latitude and longitude from selection
    var latitude = marker.latitude
    var longitude = marker.longitude

//    // Create the JSON from marker to send to the database
//    var jsondata = {
//      "event":
//      "latitude": latitude,
//      "lontigude": longitude
//    };
//
//    // Send data to the database
//    var settings = {
//      "async": true,
//      "crossDomain": true,
//      "url": "https://leafletbiz-e47f.restdb.io/rest/data-leaflet",
//      "method": "POST",
//      "headers": {
//        "content-type": "application/json",
//        "x-apikey": "e71b1800a434f84bad328c27ffb3044e28930",
//        "cache-control": "no-cache"
//      },
//      "processData": false,
//      "data": JSON.stringify(jsondata)
//    }
//
//    $.ajax(settings).done(function (response) {
//      console.log(response);
//    });
});

var baseLayers = {
    "Grayscale": grayscale,
    "Streets": streets
};

var overlays = {
    "Cities": cities
};

L.control.layers(baseLayers, overlays).addTo(map);