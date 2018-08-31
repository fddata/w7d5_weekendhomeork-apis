const PubSub = require('../helpers/pub_sub');


const StationView = function(container){
  this.container = container;
};

StationView.prototype.bindEvents = function(){
  PubSub.subscribe('Stations:selected-station-data', (event) => {
    const station = event.detail;
    console.log(station);
    // this.render(station);
  });
};


module.exports = StationView;
