const PubSub = require('../helpers/pub_sub.js');

const MapWrapper = function (container) {
  this.container = container;
  this.coords = [55.0, -3.5]; // trying to get a nice centred view of the UK
  this.map = L.map(this.container);
  this.osmLayer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
  this.map.setView(this.coords, 5).addLayer(this.osmLayer);
  this.mapMarkers = [];
};

MapWrapper.prototype.bindEvents = function () {

  PubSub.subscribe('Stations:selected-station-data', (event) => {

    const station = event.detail;
    // this.render(station);
    const latitude = station.items.lat;
    const longitutde = station.items.long;
    const coordinates = [latitude, longitutde];

    this.map.setView(coordinates, 7);


    //first clear this.markers of any markers in place
    for(var i = 0; i < this.mapMarkers.length; i++){
    this.map.removeLayer(this.mapMarkers[i]);
    }

    //then add a new marker to the this.mapMarkers array and then the map
    const marker = L.marker(coordinates);
    this.mapMarkers.push(marker);
    marker.addTo(this.map);
  });
};

module.exports = MapWrapper;
