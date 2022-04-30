// Global variables
let map;
let lat = 0;
let lon = 0;
let zl = 1;
let globaldata;

// path to csv data

let path = "data/arrest.csv";

let aapimarkers = L.featureGroup();
let amindmarkers = L.featureGroup();
let blackmarkers = L.featureGroup();
let blackhispanicmarkers = L.featureGroup();
let unknownmarkers = L.featureGroup();
let whitemarkers = L.featureGroup();
let whitehispanicmarkers = L.featureGroup();

// initialize
$( document ).ready(function() {
    createMap(lat,lon,zl);
    readCSV(path);
});

// create the map
function createMap(lat,lon,zl){
	map = L.map('map').setView([lat,lon], zl);

	L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
}

function flyToIndex(lat, lon){
	map.flyTo([lat,lon],12)
};

// function to read csv data
function readCSV(path){
	Papa.parse(path, {
		header: true,
		download: true,
		complete: function(data) {
			console.log(data);
			globaldata = data;
			aapi = globaldata.data.filter(data => data.PERP_RACE=='ASIAN / PACIFIC ISLANDER');
			amind = globaldata.data.filter(data => data.PERP_RACE=='AMERICAN INDIAN/ALASKAN NATIVE');
			black = globaldata.data.filter(data => data.PERP_RACE=='BLACK');
			blackhispanic = globaldata.data.filter(data => data.PERP_RACE=='BLACK HISPANIC');
			unknown = globaldata.data.filter(data => data.PERP_RACE=='UNKNOWN');
			white = globaldata.data.filter(data => data.PERP_RACE=='WHITE');
			whitehispanic = globaldata.data.filter(data => data.PERP_RACE=='WHITE HISPANIC');
			// map the data
			
			mapCSV(aapi, aapimarkers, '#ffd5cc', 'Asian/Pacific Islanders');
			mapCSV(amind, amindmarkers, '#e8a192', 'American Indian/Alaskan Native');
			mapCSV(black, blackmarkers, '#d6634b', 'Black');
			mapCSV(blackhispanic, blackhispanicmarkers, '#d44426', 'Black Hispanic');
			mapCSV(unknown, unknownmarkers, '#961c03', 'Unknown');
			mapCSV(white, whitemarkers, '#661707', 'White');
			mapCSV(whitehispanic, whitehispanicmarkers, '#380c03', 'White Hispanic');

			let layers = {
				"Asian/Pacific Islanders": aapimarkers,
				"American Indian/Alaskan Native": amindmarkers,
				"Black": blackmarkers,
				"Black Hispanic": blackhispanicmarkers,
				"White": whitemarkers,
				"White Hispanic": whitehispanicmarkers,
				"Unknown": unknownmarkers,
				
			};

			L.control.layers(null, layers).addTo(map)

		}
	});
}
//add another argument for color to differentiate for different groups) 
//color, name/title
function mapCSV(data, featuregroup, color, name){
	
	// circle options
	let circleOptions = {
		radius: 5,
		weight: 1,
		color: 'white',
		fillColor: color,
		fillOpacity: 1
	}

	// loop through each entry
	data.forEach(function(item,index){
		// create marker
		let marker = L.circleMarker([item.latitude,item.longitude],circleOptions)
		.on('mouseover', function(){
			this.bindPopup(`${item.date}<br>${item.desc}`).openPopup()
		})

		// add marker to featuregroup		
		featuregroup.addLayer(marker)
	})

	// add featuregroup to map
	featuregroup.addTo(map)

	// fit markers to map
	map.fitBounds(featuregroup.getBounds())

	//layers[name] = featuregroup;
	
	//L.control.layers(null, layers).addTo(map)
}