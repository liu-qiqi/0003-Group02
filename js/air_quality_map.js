// Mapbox token
mapboxgl.accessToken =
    "pk.eyJ1IjoidWNmbmhlZCIsImEiOiJjbGNybjR2YmcwMmY2M29teHo4Nnhtcm1xIn0.iEYPs84JN_4b1XioklgvXA";

// Load a new map in the 'map' HTML div
const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/ucfnhed/clh5jmrg300q001pn6e8763qv",
    center: [-74.15, 40.7],
    zoom: 9.5,
});

map.addControl(new mapboxgl.NavigationControl());

// Global variable
let districts = {},
    data_PM2_5 = [],
    data_NO2 = [],
    data_NOx = [],
    data_O3 = [];
let yearcol = "mean_2013",
    chosenLayer = "PM2_5";

const parseNumber = function (data) {
    return {
        Community_District: String(data["Community_District"]),
        mean_2013: Number(data["mean_2013"]),
        mean_2014: Number(data["mean_2014"]),
        mean_2015: Number(data["mean_2015"]),
        mean_2016: Number(data["mean_2016"]),
        mean_2017: Number(data["mean_2017"]),
        mean_2018: Number(data["mean_2018"]),
        mean_2019: Number(data["mean_2019"]),
        mean_2020: Number(data["mean_2020"]),
        mean_2021: Number(data["mean_2021"]),
    };
};

const years = [
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
];

// Paint color on Community Districts by means
const getPaint = function (layer, field) {
    let res = {}
    switch (layer) {
      case "PM2_5":
        res = {
          'fill-color': [
            'interpolate',
            ['linear'],
            ['get', field],
            5.32,
            '#FFEDA0',
            6.33,
            '#FED976',
            6.73,
            '#FEB24C',
            7.16,
            '#FD8D3C',
            7.69,
            '#FC4E2A',
            8.25,
            '#E31A1C',
            8.86,
            '#BD0026',
            9.49,
            '#800026'
          ],
          'fill-opacity': 0.75
        }
        break;
      case "NO2":
        res = {
          'fill-color': [
            'interpolate',
            ['linear'],
            ['get', field],
            9.94,
            '#FFEDA0',
            15.39,
            '#FED976',
            16.91,
            '#FEB24C',
            18.07,
            '#FD8D3C',
            19.04,
            '#FC4E2A',
            20.08,
            '#E31A1C',
            21.24,
            '#BD0026',
            22.84,
            '#800026'
          ],
          'fill-opacity': 0.75
        }
        break;
      case "NOx":
        res = {
          'fill-color': [
            'interpolate',
            ['linear'],
            ['get', field],
            6.43,
            '#FFEDA0',
            10.42,
            '#FED976',
            11.95,
            '#FEB24C',
            13.59,
            '#FD8D3C',
            15.28,
            '#FC4E2A',
            16.72,
            '#E31A1C',
            18.73,
            '#BD0026',
            22.34,
            '#800026'
          ],
          'fill-opacity': 0.75
        }
        break;
      case "O3":
        res = {
          'fill-color': [
            'interpolate',
            ['linear'],
            ['get', field],
            20.67,
            '#FFEDA0',
            27.7,
            '#FED976',
            28.94,
            '#FEB24C',
            29.68,
            '#FD8D3C',
            30.32,
            '#FC4E2A',
            30.81,
            '#E31A1C',
            31.62,
            '#BD0026',
            32.64,
            '#800026'
          ],
          'fill-opacity': 0.75
        }
      break;
    default:
      break;
  }
  return res
}

map.on("load", async function () {

    drawLegend('PM2_5');

    // Read in geo data of Community Districts
    districts = await $.get("./data/Community_District.json");
    console.log(districts);

    // Read in data of pollutants
    let data_PM2_5 = await d3.csv("./data/PM2_5.csv");
    let data_NO2 = await d3.csv("./data/NO2.csv");
    let data_NOx = await d3.csv("./data/NOx.csv");    
    let data_O3 = await d3.csv("./data/O3.csv");

    drawLineChart('PM2_5');

    // Join data by Boro ID
    districts.features.forEach((element) => {
        const { type, geometry, properties } = element;
        let item1 = data_PM2_5.find((it) => it.boro_cd === properties.boro_cd);
        let item2 = data_NO2.find((it) => it.boro_cd === properties.boro_cd);
        let item3 = data_NOx.find((it) => it.boro_cd === properties.boro_cd);
        let item4 = data_O3.find((it) => it.boro_cd === properties.boro_cd);
        item1 &&
            data_PM2_5.push({
                type,
                geometry,
                properties: {
                    ...properties,
                    ...parseNumber(item1),
                },
            });
        item2 &&
            data_NO2.push({
                type,
                geometry,
                properties: {
                    ...properties,
                    ...parseNumber(item2),
                },
            });
        item3 &&
            data_NOx.push({
                type,
                geometry,
                properties: {
                    ...properties,
                    ...parseNumber(item3),
                },
            });
        item4 &&
            data_O3.push({
                type,
                geometry,
                properties: {
                    ...properties,
                    ...parseNumber(item4),
                },
            });
    });

    // Add pollutant data
    map.addSource("data_PM2_5", {
        type: "geojson",
        data: {
            type: "FeatureCollection",
            features: data_PM2_5,
        },
    });
    map.addSource("data_NO2", {
        type: "geojson",
        data: {
            type: "FeatureCollection",
            features: data_NO2,
        },
    });
    map.addSource("data_NOx", {
        type: "geojson",
        data: {
            type: "FeatureCollection",
            features: data_NOx,
        },
    });
    map.addSource("data_O3", {
        type: "geojson",
        data: {
            type: "FeatureCollection",
            features: data_O3,
        },
    });

    // Add pollutant dafault layer
    map.addLayer({
        id: "data_PM2_5",
        type: "fill",
        source: "data_PM2_5",
        paint: getPaint("PM2_5", "mean_2013"),
    });
    map.addLayer({
        id: "data_NO2",
        type: "fill",
        source: "data_NO2",
        layout: {visibility: "none"},
        paint: getPaint("NO2", "mean_2013"),
    });
    map.addLayer({
        id: "data_NOx",
        type: "fill",
        source: "data_NOx",
        layout: {visibility: "none"},
        paint: getPaint("NOx", "mean_2013"),
    });
    map.addLayer({
        id: "data_O3",
        type: "fill",
        source: "data_O3",
        layout: {visibility: "none"},
        paint: getPaint("O3", "mean_2013"),
    });

    // Function that runs when the user changes the data year
    function setYear(year) {
        document.getElementById("year").textContent = years[year];
        yearcol = "mean_" + years[year];

        map.setLayoutProperty("data_PM2_5", "visibility", "none");
        map.setLayoutProperty("data_NO2", "visibility", "none");
        map.setLayoutProperty("data_NOx", "visibility", "none");        
        map.setLayoutProperty("data_O3", "visibility", "none");

        let layerName = null,
            paintFlag = null;
        if (chosenLayer === "PM2_5") {
            layerName = "data_PM2_5";
        } else if (chosenLayer === "NO2") {
            layerName = "data_NO2";
        } else if (chosenLayer === "NOx") {
            layerName = "data_NOx";
        } else if (chosenLayer === "O3") {
            layerName = "data_O3";
        }
        layerName &&
            map.setLayoutProperty(layerName, "visibility", "visible");
        layerName &&
            map.setPaintProperty(
                layerName,
                "fill-color",
                getPaint(chosenLayer, yearcol)["fill-color"]
            );
    }

    // Assign an event listner to the slider so that the setYear function runs when the user changes the slider
    document
        .getElementById("slider")
        .addEventListener("input", function (e) {
            var year = parseInt(e.target.value);
            setYear(year);
        });

    // Event listener for layer switch
    const elRadios = document.getElementsByClassName("radios");
    for (let elRadio of elRadios) {
        elRadio.addEventListener("change", function (e) {
            chosenLayer = e.target.value;
            console.log(chosenLayer);

            map.setLayoutProperty("data_PM2_5", "visibility", "none");
            map.setLayoutProperty("data_NO2", "visibility", "none");
            map.setLayoutProperty("data_NOx", "visibility", "none");            
            map.setLayoutProperty("data_O3", "visibility", "none");
            switch (chosenLayer) {
                case "PM2_5":
                    drawLineChart("PM2_5");
                    drawLegend('PM2_5');
                    map.setLayoutProperty("data_PM2_5", "visibility", "visible");
                    map.setPaintProperty(
                        "data_PM2_5",
                        "fill-color",
                        getPaint("PM2_5", yearcol)["fill-color"]
                    );
                    break;
                case "NO2":
                    drawLineChart("NO2");
                    drawLegend('NO2');
                    map.setLayoutProperty("data_NO2", "visibility", "visible");
                    map.setPaintProperty(
                        "data_NO2",
                        "fill-color",
                        getPaint("NO2", yearcol)["fill-color"]
                    );
                    break;
                case "NOx":
                    drawLineChart("NOx");
                    drawLegend('NOx');
                    map.setLayoutProperty("data_NOx", "visibility", "visible");
                    map.setPaintProperty(
                        "data_NOx",
                        "fill-color",
                        getPaint("NOx", yearcol)["fill-color"]
                    );
                    break;
                case "O3":
                    drawLineChart("O3");
                    drawLegend('O3');
                    map.setLayoutProperty("data_O3", "visibility", "visible");
                    map.setPaintProperty(
                        "data_O3",
                        "fill-color",
                        getPaint("O3", yearcol)["fill-color"]
                    );
                    break;
                default:
                    break;
            }
        });
    }

    // Add the line highlight layer
    map.addLayer({
        id: "line_highlight",
        type: "line",
        source: {
            type: "geojson",
            data: districts,
        },
        layout: {
            visibility: "visible",
        },
        paint: {
            "line-color": "#adf",
            "line-width": 4,
        },
        filter: ["==", "boro_cd", "99999999"],
    });

    // Popup
    var mypopup = new mapboxgl.Popup({
        offset: [0, 0],
        closeButton: false,
    });
    let layers = ["data_PM2_5", "data_NO2", "data_NOx", "data_O3"];

    layers.forEach((layer) => {
        if (!layer) return;

        map.on('mouseover', layer, function (e) {
            let bro_cd = e.features[0]?.properties?.boro_cd;
            bro_cd &&
                map.setFilter("line_highlight", ["==", "boro_cd", bro_cd]);

            mypopup
                .setLngLat(e.lngLat)
                .setHTML(
                    "<strong>" +
                    e.features[0].properties.Community_District +
                    "</strong>" +
                    "<br />2013: " +
                    e.features[0].properties.mean_2013 +
                    "<br />2014: " +
                    e.features[0].properties.mean_2014 +
                    "<br />2015: " +
                    e.features[0].properties.mean_2015 +
                    "<br />2016: " +
                    e.features[0].properties.mean_2016 +
                    "<br />2017: " +
                    e.features[0].properties.mean_2017 +
                    "<br />2018: " +
                    e.features[0].properties.mean_2018 +
                    "<br />2019: " +
                    e.features[0].properties.mean_2019 +
                    "<br />2020: " +
                    e.features[0].properties.mean_2020 +
                    "<br />2021: " +
                    e.features[0].properties.mean_2021
                )
                .addTo(map);
        });

        // Change cursor to pointer when mouse over community district
        map.on('mouseenter', 'Community_Districts', function () {
          map.getCanvas().style.cursor = 'pointer';
        });

        // Remove popup when leave community district
        map.on("mouseleave", layer, function () {
            map.getCanvas().style.cursor = "";
            mypopup.remove();
        });
    });
});
