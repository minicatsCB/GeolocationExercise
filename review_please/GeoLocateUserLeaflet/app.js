function geoFindUser() {
    if(!("geolocation" in navigator)) {
        console.log("Error. Geolocation is not supported in your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
}

function geoSuccess(position) {
   console.log(`User is located in coordinates: ${position.coords.latitude}, ${position.coords.longitude}`);
   
   map.setView([position.coords.latitude, position.coords.longitude], 13);
}

function geoError(err) {
    console.log(`Error getting user position: ${err.message}`);
}

function initMap() {
    map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
}

var map;

initMap();
geoFindUser();
