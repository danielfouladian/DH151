
alert("Welcome to Daniel's Legendary Adventure! \n\nLet's start from UCLA in California!")

		let travel = [
	{
		'id': 0,
		'title':'Honolulu, Hawaii',
		'description': 'Sunny and colorful experiece where you can dive in the Hawaiian culture and refresh in the magical water',
		'lat': 21.315603,
		'lon': 	-157.858093,
		'travelpic': 'https://tourscanner.com/blog/wp-content/uploads/2021/07/best-things-to-do-in-Honolulu-Oahu-Hawaii.jpg'
	},
	{
		'id': 1,
		'title':'Las Vegas, Nevada',
		'description': 'Naughty experience but whatever happens in Vegas stays in Vegas',
		'lat': 36.114647,
		'lon': 	-115.172813,
		'travelpic': 'https://res.cloudinary.com/simpleview/image/upload/v1497480003/clients/lasvegas/strip_b86ddbea-3add-4995-b449-ac85d700b027.jpg'
	},
	{
		'id': 2,
		'title':'Palm Springs, California',
		'description': 'Peaceful nature exeperience with the tram, organic food, and calm community',
		'lat': 33.830517,
		'lon': -116.545601,
		'travelpic': 'https://img.theculturetrip.com/x/wp-content/uploads/2021/02/gettyimages-1173497229.jpg'
	},
	{
		'id': 3,
		'title':'Phoenix, Arizona',
		'description': 'Adventurous experience with different activities such as the trains, nutcracker performance, and visiting my uncle',
		'lat': 33.448376,
		'lon': -112.074036,
		'travelpic': 'https://www.ourescapeclause.com/wp-content/uploads/2021/03/shutterstock_691184395-scaled.jpg'
	},
	{
		'id': 4,
		'title':'Dana Point, California',
		'description': 'Celebratory and joyful time for a wedding and seeing family',
		'lat': 	33.466972,
		'lon': -117.698105,
		'travelpic': 'https://upload.wikimedia.org/wikipedia/commons/6/62/Dana_Point_a_city_in_southern_Orange_County_CA_Photo_D_Ramey_Logan.jpg'
	
	}
]



let map = L.map('map').setView([34.0687379,-118.4462871], 15);

var markerIcon = L.icon({
	iconUrl: 'http://www.clker.com/cliparts/I/l/L/S/W/9/map-marker-hi.png',
	iconSize: [20, 30],
	popupAnchor: [0,0]
	});


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

	

function flyByIndex(index){
	map.flyTo([travel[index].lat,travel[index].lon],travel[index].zoom)


	myMarkers.getLayers()[index].openPopup()
}


let myMarkers = L.featureGroup();

travel.forEach(function(item){

	let marker = L.marker([item.lat,item.lon], {
        title: item.title,
        icon: markerIcon
    })
	.bindPopup("<b>" + item.title + "</b>" + "<br>" + "<br>"  + "<img src='" + item.travelpic + "'" + "height=200px width=300px style='border:1px solid rgb(0, 0, 0)'" + ">" + "<br>" + "<br>" + item.description)



	myMarkers.addLayer(marker)

	
	$('.sidebar').append(`<div class="sidebar-item" onclick= 
        "flyByIndex(${item.id})">${item.title}</div>`)
})





myMarkers.addTo(map)


let layers = {
	"My Markers": myMarkers
}


L.control.layers(null,layers).addTo(map)





let btn = document.createElement("button");
btn.innerHTML = "Save";
btn.addEventListener("click", function () {
  alert("Great choice! Let's go together!");
});
document.body.appendChild(btn);

let slideIndex = 1;
showSlides(slideIndex);


function plusSlides(n) {
  showSlides(slideIndex += n);
}


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