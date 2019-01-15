function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        // Use Los Angeles coordinates for initializing the map
        center: {
            lat: 34.052235,
            lng: -118.243683
        },
        zoom: 11,
        styles: mapStyles
    });
}

async function getVehicles() {
    try {
        var vehicles = await requestData(baseVehiclesUrl);
    } catch(err) {
        console.log("Error requesting data: ", err);
    }

    return vehicles;
}

function createMarker(vehiclePosition) {
    return new google.maps.Marker({
        position: vehiclePosition,
        map: map
    });
}

function positionVehicle(vehicle) {
    var vehiclePosition = {
        lat: vehicle.latitude,
        lng: vehicle.longitude
    };

    var marker = createMarker(vehiclePosition);

    return marker;
}

function clusterMarkers(markers) {
    var markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });
}

async function showVehiclesInMap() {
    try {
        var vehicles = await getVehicles();
    } catch(err) {
        console.log("Error getting vehicles: ", err);
    }

    var markers = vehicles.items.map(positionVehicle);
    clusterMarkers(markers);
}

var baseVehiclesUrl = "http://api.metro.net/agencies/lametro/vehicles/";
var map;

initMap();
showVehiclesInMap();
