var map = L.map('mapid').setView([37.760109273244524, -122.4414471468871], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

$.getJSON("sf_crime.geojson",function(data){
	var crimeIcon = L.icon({
		iconUrl: "https://creazilla-store.fra1.digitaloceanspaces.com/emojis/43207/oncoming-police-car-emoji-clipart-md.png",
		iconSize: [40,40]
	});
	var crimes = L.geoJson(data ,{
		pointToLayer: function(feature,latlng){
			var marker = L.marker(latlng,{icon: crimeIcon});
	  		marker.bindPopup(feature.properties.date + '<br/>' + feature.properites.title + '<br/>' + feature.properties.description);
	  		return marker;
  		}
	});
	var clusters = L.markerClusterGroup();
	clusters.addLayer(crimes);
	map.addLayer(clusters);
});
