// SETTINGS OF MY RESTDB.IO DATABASE TO QUERY HISTORICAL DATAPOINTS
var settings = {
  "async": true,
  "crossDomain": true,

  // DATABASE URL
  "url": "https://leafletbiz-e47f.restdb.io/rest/data-leaflet",
  "method": "GET",
  "headers": {
    "content-type": "application/json",

    // CORS key
    "x-apikey": "5cf13909fd4a015b5eafec5d",

    "cache-control": "no-cache"
  }
}

// PRINT ANSWER FROM DB IN THE CONSOLE
//$.ajax(settings).done(function (response) {
//  console.log(response);
//});

var cities = L.layerGroup();

// EXTRACT HISTORICAL LAT/LONG/EVENT INFO FROM RESPONSE
var postEvents = (response) => {

    // SHOW IN THE CONSOLE THE RESPONSE
    console.log(response);

    var i;
    for (i = 0; i < response.length; i++) {
      L.marker([response[i].latitude, response[i].longitude]).bindPopup(response[i].event).addTo(cities)
    }
};

// CALL THE DATABASE AND EXTRACT ALL CONTENT FROM TABLE
$.ajax(settings).done(postEvents);


var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
    streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});

// FIX THE CENTER OF THE MAP
var map = L.map('map', {
    center: [41.3959241, 2.1539785],
    zoom: 12,
    layers: [streets, cities]
});


// ADD NEW MARKERS
map.on('click', function(e){

    // Extract latitude and longitude from selection
    var latitude = e.latlng['lat']
    var longitude = e.latlng['lng']
    console.log(e)

    // Extract the label of the event from the text box with id=label
    var label = $("#label").val()
    if (label == "Default") {
        window.alert("Label the event!")
    }
    else {

        // Show labeled marker
        var marker = new L.marker(e.latlng).bindPopup(label).addTo(cities);

        // Create the JSON from marker to send to the database
        var jsondata = {
                        "event": label,
                        "latitude": latitude,
                        "longitude": longitude
                        };

        var settings = {
          "async": true,
          "crossDomain": true,

          // URL TO THE DATABASE
          "url": "https://leafletbiz-e47f.restdb.io/rest/data-leaflet",

          "method": "POST",
          "headers": {
            "content-type": "application/json",
            "x-apikey": "5cf13909fd4a015b5eafec5d",
            "cache-control": "no-cache"
          },
          "processData": false,
          "data": JSON.stringify(jsondata)
        }

        // POST RESPONSE INTO MY DB
        $.ajax(settings).done(function (response) {
          console.log(response);
        });

        $("#label").val('Default')

    };
});

var baseLayers = {
    "Grayscale": grayscale,
    "Streets": streets
};

var overlays = {
    "Cities": cities
};

L.control.layers(baseLayers, overlays).addTo(map);