const PubSub = require('../helpers/pub_sub.js');


const ChartWrapper = function (container) {
this.container = container;
this.xdata = [];
this.ydata = [];
};




ChartWrapper.prototype.bindEvents = function () {

  PubSub.subscribe('Stations:selected-station-all-data', (event) => {

    const stationData = event.detail;
    console.log(stationData);
    stationData.items.forEach((item) => {
      this.ydata.push(item.value);
      this.xdata.push(item.dateTime);
    });
  });

  




};


module.exports = ChartWrapper;
