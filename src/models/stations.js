const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const StationList = function () {
  this.stationList = [];
};


// FAQ https://environment.data.gov.uk/flood-monitoring/doc/rainfall


StationList.prototype.getStations = function () {
  const request = new Request("http://environment.data.gov.uk/flood-monitoring/id/stations?parameter=rainfall");
  request.get()
      .then((data) => {
        this.stationList = data.items;
        const northernStations = this.getNorthernStations(this.stationList);
        // console.log(northernStations); // logs the list of all stations - this is working!

        PubSub.publish('Stations:station-data-loaded', northernStations);
      })
      .catch((error) => {
        console.error(error);
      });
};


//We strt with 912 stations - this is too many!
//Filter to the northern ones (north of 55 degrees)
StationList.prototype.getNorthernStations = function (stationList) {
return this.stationList.filter(station => station.lat >= 55);
};


module.exports = StationList;
