const StationList = require('./models/stations.js');

document.addEventListener('DOMContentLoaded', () => {


  const stationList = new StationList();
  stationList.getStations();


});
