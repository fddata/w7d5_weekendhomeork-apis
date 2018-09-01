const StationList = require('./models/stations.js');
const SelectView = require('./views/select_view.js');
const StationView = require('./views/station_view.js');
const MapWrapper = require('./views/map_wrapper.js');
const ChartWrapper = require('./views/chart_wrapper.js');

document.addEventListener('DOMContentLoaded', () => {



  const selector = document.querySelector('#station-selector');
  const selectView = new SelectView(selector);
  selectView.bindEvents();

  const stationDetail = document.querySelector('#station-detail');
  const stationView = new StationView(stationDetail);
  stationView.bindEvents();

  const mainMap = document.querySelector('#map-container');
  const mapWrapper = new MapWrapper(mainMap);
  mapWrapper.bindEvents();

  const mainChart = document.querySelector('#chart-container');
  const chartWrapper = new ChartWrapper(mainChart);
  chartWrapper.bindEvents();


  const stationList = new StationList();
  stationList.getStations();
  stationList.bindEvents();


});
