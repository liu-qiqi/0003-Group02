////////*ge_map*////////
mapboxgl.accessToken = 'pk.eyJ1Ijoicm9rdW5hbmFuYSIsImEiOiJjajdvdzhkamIwM2F2MzFuMDA4cWJqN2p4In0.vHBQXdIcIMQ6mQ5KcdWrxw';

// Load a new map in the 'map' HTML div
var map = new mapboxgl.Map({
    container: 'ge_map', // container id
    style: 'mapbox://styles/rokunanana/cli1xdwhh006n01qygwh94nhp',
    center: [-73.968, 40.740], // starting position [lng, lat]
    zoom: 10.6 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl()); //Adds zoom control


// disable map rotation using right click + drag
map.dragRotate.disable();

// disable map rotation using touch rotation gesture
map.touchZoomRotate.disableRotation();


map.on('load', function() {


d3.json("https://developer.nrel.gov/api/alt-fuel-stations/v1.json?api_key=DEMO_KEY&fuel_type=all&state=NY", function(EV) {

console.log(EV);


var myGeojson = {};
myGeojson.type = 'FeatureCollection';
myGeojson.features = [];

var i;
    for (i = 0; i < EV.fuel_stations.length; i++) {
                    
        var name = EV.fuel_stations[i].station_name;
        var access_code = EV.fuel_stations[i].access_code;
        var fuel_type_code = EV.fuel_stations[i].fuel_type_code;
        var street_address = EV.fuel_stations[i].street_address;
        var network = EV.fuel_stations[i].ev_network;
        var price = EV.fuel_stations[i].ev_pricing;
        var zip = EV.fuel_stations[i].zip;
                    
        var newFeature = {
            "type": "Feature",
            "geometry": {
            "type": "Point",
            "coordinates": [EV.fuel_stations[i].longitude, EV.fuel_stations[i].latitude]},
            "properties": {
                "Name": name,
                "Access": access_code,
                "Fuel": fuel_type_code,
                "Address": street_address,
                "ZipCode": zip,
                "EVnetwork": network,
                "EVprice": price,
            }
        }
        
        myGeojson.features.push(newFeature);
    }

    var colorScale = d3.scaleOrdinal()
    .domain(['valueRD', 'valueHY', 'valueLNG', 'valueBD', 
    'valueELEC', 'valueE85', 'valueCNG', 'valueLPG'])
    .range(['rgb(228, 162, 142)', 'rgb(173, 212, 222)', 'rgb(24, 125, 13)', 'rgb(223, 88, 115)', 
    'rgb(81, 219, 180)', 'rgb(245, 190, 102)', 'rgb(61, 138, 214)', 'rgb(152, 141, 199)']);

            
    map.addSource('points', {
        'type': 'geojson',
        'data': myGeojson
        });
                
    map.addLayer({
        id: 'Stations',
        type: 'circle',
        source: 'points',
        'layout': {
            'visibility': 'visible'
        },
        paint: {
            'circle-radius': 5,
            'circle-color': {
            property: 'Fuel',
            type: 'categorical',
            stops: [
                ['RD', colorScale('valueRD')],
                ['HY', colorScale('valueHY')],
                ['LNG', colorScale('valueLNG')],
                ['BD', colorScale('valueBD')],
                ['ELEC', colorScale('valueELEC')],
                ['E85', colorScale('valueE85')],
                ['CNG', colorScale('valueCNG')],
                ['LPG', colorScale('valueLPG')]
            ],
            },
            'circle-opacity': 0.72,
        }
    });

                    
    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mouseenter', 'Stations', function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = "<h2>" + 
        e.features[0].properties.Name + "</h2><p>Access: " + e.features[0].properties.Access + "</p><p>Fuel Type: " + e.features[0].properties.Fuel + "</p><p>Street Address: " + (e.features[0].properties.Address) + "</p><p>Zip Code: " +(e.features[0].properties.ZipCode) + "</p><p>EV Network: " + (e.features[0].properties.EVnetwork) + "</p><p>EV Price: " + (e.features[0].properties.EVprice);

        popup
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);

    });


    map.on('mouseleave', 'Stations', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });      
});


});