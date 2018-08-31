const StationList = require('./models/stations.js');
const SelectView = require('./views/select_view.js');
const StationView = require('./views/station_view.js');

document.addEventListener('DOMContentLoaded', () => {

  const stationList = new StationList();
  stationList.getStations();
  stationList.bindEvents();

  const selector = document.querySelector('#station-selector');
  const selectView = new SelectView(selector);
  selectView.bindEvents();

  const stationDetail = document.querySelector('#station-detail');
  const stationView = new StationView(stationDetail);
  stationView.bindEvents();


});
