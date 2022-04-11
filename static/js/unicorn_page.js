// Add console.log to check to see if our code is working.
console.log("working");


// We create the tile layer that will be the background of our map.
let base = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});


// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [24.7, -24.5],
	zoom: 2.5,
	layers: [base]
});

// Create a base layer that holds all three maps.
let baseMaps = {
  "Countries": base

};

// 1. Add layers for the clusters.
let gold = new L.LayerGroup();
let silver = new L.LayerGroup();
let bronze = new L.LayerGroup();

// 2. Add a reference to the tectonic plates group to the overlays object.
let overlays = {
  "Gold": gold,
  "Silver": silver,
  "Bronze": bronze
};

// Then we add a control to the map that will allow the user to change which
// layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

// Access Unicorn data 
let goldData = "https://raw.githubusercontent.com/Jusharry/Team_9_Final_Project/Harry/Resources/gold_database.geojson";
let silverData = "https://raw.githubusercontent.com/Jusharry/Team_9_Final_Project/Harry/Resources/silver_database.geojson";
let bronzeData = "https://raw.githubusercontent.com/Jusharry/Team_9_Final_Project/Harry/Resources/bronze_database.geojson"

//------------------------------------Gold Layer--------------------------------------------------------------------------------------------------------------------------
d3.json(goldData).then(function(data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into two separate functions
  // to calculate the color and radius.
  function goldOptions(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: "#ffd700",
      color: "black",
      radius: getRadius(feature.properties.Cluster),
      stroke: true,
      weight: 0.5
    };
  }


  // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
  function getRadius(marker) {
    if (marker === 0) {
      return 1;
    }
    return marker * 7;
  }

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    	// We turn each feature into a circleMarker on the map.
    	pointToLayer: function(feature, latlng) {
      		console.log(data);
      		return L.circleMarker(latlng);
        },
      // We set the style for each circleMarker using our styleInfo function.
    style: goldOptions,
     // We create a popup for each circleMarker to display the magnitude and location of the earthquake
     //  after the marker has been created and styled.
     onEachFeature: function(feature, layer) {
      layer.bindPopup("Cluster: " + feature.properties.Cluster + "<br>Industry: " + feature.properties.Industry);
    }
  }).addTo(gold);
  gold.addTo(map);
});

//----------------------------------------Silver Layer-----------------------------------------------------------------------------------------
d3.json(silverData).then(function(data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into two separate functions
  // to calculate the color and radius.
  function silverOptions(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: "#c0c0c0",
      color: "black",
      radius: getRadius(feature.properties.Cluster),
      stroke: true,
      weight: 0.5
    };
  }


  // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
  function getRadius(marker) {
    if (marker === 0) {
      return 1;
    }
    return marker * 5;
  }

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    	// We turn each feature into a circleMarker on the map.
    	pointToLayer: function(feature, latlng) {
      		console.log(data);
      		return L.circleMarker(latlng);
        },
      // We set the style for each circleMarker using our styleInfo function.
    style: silverOptions,
     // We create a popup for each circleMarker to display the magnitude and location of the earthquake
     //  after the marker has been created and styled.
     onEachFeature: function(feature, layer) {
      layer.bindPopup("Cluster: " + feature.properties.Cluster + "<br>Industry: " + feature.properties.Industry);
    }
  }).addTo(silver);
  silver.addTo(map);
});

//-----------------------------------------------------Bronze Layer------------------------------------------------------------------------------
d3.json(bronzeData).then(function(data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into two separate functions
  // to calculate the color and radius.
  function bronzeOptions(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: "#b38600",
      color: "black",
      radius: getRadius(feature.properties.Cluster),
      stroke: true,
      weight: 0.5
    };
  }


  // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
  function getRadius(marker) {
    if (marker === 0) {
      return 1;
    }
    return marker * 4;
  }

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    	// We turn each feature into a circleMarker on the map.
    	pointToLayer: function(feature, latlng) {
      		console.log(data);
      		return L.circleMarker(latlng);
        },
      // We set the style for each circleMarker using our styleInfo function.
    style: bronzeOptions,
     // We create a popup for each circleMarker to display the magnitude and location of the earthquake
     //  after the marker has been created and styled.
     onEachFeature: function(feature, layer) {
      layer.bindPopup("Cluster: " + feature.properties.Cluster + "<br>Industry: " + feature.properties.Industry);
    }
  }).addTo(bronze);
  bronze.addTo(map);
});

//-------------------------------------------Legend----------------------------------------------------------------------------------
// Here we create a legend control object.
let legend = L.control({
  position: "bottomright"
});

// Then add all the details for the legend
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");

  const markers = [ "Bronze", "Silver", "Gold"];
  const colors = [
    "#b38600",
    "#c0c0c0",
    "#ffd700",
    
  ];

// Looping through our intervals to generate a label with a colored square for each interval.
  for (var i = 0; i < markers.length; i++) {
    console.log(colors[i]);
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      markers[i] + (markers[i + 1] ? "&ndash;" + markers[i + 1] + "<br>" : "");
    }
    return div;
  };

  // Finally, we our legend to the map.
  legend.addTo(map);