const StationList = require('./models/stations.js');
const SelectView = require('./views/select_view.js');
const StationView = require('./views/station_view.js');
const MapWrapper = require('./views/map_wrapper.js');
const ChartWrapper = require('./views/chart_wrapper.js');


document.addEventListener('DOMContentLoaded', () => {


    const stationList = new StationList();
    stationList.getStations();
    stationList.bindEvents();


  const selector = document.querySelector('#station-selector');
  const selectView = new SelectView(selector);
  selectView.bindEvents();

  const stationDetail = document.querySelector('#station-item');
  const stationView = new StationView(stationDetail);
  stationView.bindEvents();

  const mainMap = document.querySelector('#map-item');
  const mapWrapper = new MapWrapper(mainMap);
  mapWrapper.bindEvents();


  const mainChart = document.querySelector('#chart-item');
  const chartWrapper = new ChartWrapper(mainChart);
  chartWrapper.bindEvents();

});
