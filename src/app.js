const StationList = require('./models/stations.js');
const SelectView = require('./views/select_view.js')

document.addEventListener('DOMContentLoaded', () => {

  const selector = document.querySelector('#station-selector');
  const selectView = new SelectView(selector);
  selectView.bindEvents();

  const stationList = new StationList();
  stationList.getStations();


});
