const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const StationList = function () {
  this.stationList = [];
  this.northernStations = [];
};


// FAQ https://environment.data.gov.uk/flood-monitoring/doc/rainfall

// There are two requests.  First we get a list of all the weather stations.
// Then we filter to only the northern ones (north of 55 deg).
// Then we send these objects to select view.
// Then select view returns the chosen station
// Then we use the chosen station ID to generate a new request (this time with new data)
// Then we send this new object to the view


StationList.prototype.getStations = function () {
  const request = new Request("http://environment.data.gov.uk/flood-monitoring/id/stations?parameter=rainfall");
  request.get()
      .then((data) => {
        this.stationList = data.items;
        this.northernStations = this.getNorthernStations(this.stationList);
        PubSub.publish('Stations:station-data-loaded', this.northernStations);
      })
      .catch((error) => {
        console.error(error);
      });
};


StationList.prototype.bindEvents = function () {
  PubSub.subscribe("SelectView:station-selected", (event) => {
    const selectedIndex = event.detail;

    const selectedStation = this.northernStations[selectedIndex];
    const selectedStationURL = selectedStation["@id"];
    const request = new Request(selectedStationURL);
    request.get()
        .then((data) => {
          PubSub.publish('Stations:selected-station-data', data);

          });
          // .catch((error) => {
          //   console.error(error);
          // });

    const selectedStationid = selectedStation.stationReference;
    const selectedDataURL = `http://environment.data.gov.uk/flood-monitoring/id/stations/${selectedStationid}/readings`;
    // console.log(selectedDataURL);

    const dataRequest = new Request(selectedDataURL);
    dataRequest.get()
        .then((data) => {
          // console.log(data); // works
          PubSub.publish('Stations:selected-station-all-data', data);

          });


    });







};






//We start with 912 stations - this is too many!
//Filter to the northern ones (north of 55 degrees)
StationList.prototype.getNorthernStations = function (stationList) {
return this.stationList.filter(station => station.lat >= 55);
};







module.exports = StationList;
