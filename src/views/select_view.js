const PubSub = require('../helpers/pub_sub.js');

const SelectView = function (selector) {
  this.selector = selector;
};

SelectView.prototype.bindEvents = function () {
  PubSub.subscribe("Stations:station-data-loaded", (event) => {
    console.log(event.detail); // works
    this.populateDropDown(event.detail);
  });

    this.selector.addEventListener('change', (event) => {
      console.log(event.target.value); //works - sends the index
      PubSub.publish("SelectView:station-selected", event.target.value);
    });
  };


SelectView.prototype.populateDropDown = function (stations) {
  stations.forEach((station, index) => {
    const option = document.createElement('option');
    option.textContent = station.notation;
    option.value = index;
    this.selector.appendChild(option);
  });
};


module.exports = SelectView;
