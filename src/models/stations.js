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
        const northernStations = this.getNorthernStations(this.stationList); // run this once ready
        console.log(northernStations); // logs the list of all stations.
        // PubSub.publish('Dogs:dog-data-loaded', this.data);
      })
      .catch((error) => {
        console.error(error);
      });
};



StationList.prototype.getNorthernStations = function (stationList) {
return this.stationList.filter(station => station.lat >= 55);
};


module.exports = StationList;
