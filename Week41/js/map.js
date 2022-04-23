// Global variables
let map;
let lat = 0;
let lon = 0;
let zl = 1;

// path to csv data
let path = "data/airAthens.csv";

let markers = L.featureGroup();


// initialize
$( document ).ready(function() {
    createMap(lat,lon,zl);
    readCSV(path);
});

// create the map
function createMap(lat,lon,zl){
	map = L.map('map').setView([lat,lon], zl);

    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',{
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
			
			// map the data
			mapCSV(data);

		}
	});
}


function mapCSV(data){
	
	// circle options
	let circleOptions = {
		radius: 7,
		weight: 2,
		color: 'red',
		fillColor: 'aqua',
		fillOpacity: 1
	}

	// loop through each entry
	data.data.forEach(function(item,index){
		// create marker
		let marker = L.circleMarker([item.lat,item.lon],circleOptions)
		.on('click', function(){
			this.bindPopup(`${item.description}`).openPopup()
		})

		// add marker to featuregroup		
		markers.addLayer(marker)
	})

	// add featuregroup to map
	markers.addTo(map)

	// fit markers to map
	map.fitBounds(markers.getBounds())
}

$(".sidebar").append(`<div class ="sidebar-item" onclick= "map.flyTo([38.0708,23.8347], 12)"> North Athens </div>`)
$(".sidebar").append(`<div class ="sidebar-item" onclick= "map.flyTo([38.0139,23.680], 12)"> West Athens </div>`)
$(".sidebar").append(`<div class ="sidebar-item" onclick= "map.flyTo([37.9787,23.7514], 12 )"> Central Athens </div>`)
$(".sidebar").append(`<div class ="sidebar-item" onclick= "map.flyTo([37.8986,23.7514], 12)"> South Athens </div>`)



let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}