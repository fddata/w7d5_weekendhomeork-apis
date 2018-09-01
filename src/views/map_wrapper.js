const PubSub = require('../helpers/pub_sub.js');

const MapWrapper = function (container) {
  this.container = container;
  this.coords = [55.8654192, -4.258020999999999];
  this.map = L.map(this.container);
  this.osmLayer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
  this.map.setView(this.coords, 5).addLayer(this.osmLayer);
};

MapWrapper.prototype.bindEvents = function () {

  PubSub.subscribe('Stations:selected-station-data', (event) => {

    const station = event.detail;
    // this.render(station);
    const latitude = station.items.lat;
    const longitutde = station.items.long;
    const coordinates = [latitude, longitutde];
    // console.log(coordinates); //works, sends coord array
    this.map.setView(coordinates, 5);

    L.marker(coordinates).addTo(this.map);
  });
};

module.exports = MapWrapper;

//
// MapWrapper.prototype.bindEvents = function () {
//   PubSub.subscribe('CountryList:country-ready', (event) =>
//     const country = event.detail;
//     console.log(country);
//     const coordinates = country.latlng;
//     this.map.setView(coordinates, 5);
//     // const markers = L.markerClusterGroup();
//     // this.markers.clearLayers();
//     L.marker(coordinates).addTo(this.map);
//   });
// };
