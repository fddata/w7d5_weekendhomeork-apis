const PubSub = require('../helpers/pub_sub');
const ChartWrapper = require('./chart_wrapper.js') ;

const StationView = function(container){
  this.container = container;
};

StationView.prototype.bindEvents = function(){
  PubSub.subscribe('Stations:selected-station-data', (event) => {
    const station = event.detail;
    // console.log(station);
    this.render(station);

    const mainChart = document.querySelector('#chart-item');
    const chartWrapper = new ChartWrapper(mainChart);
    chartWrapper.bindEvents();


  });
};


StationView.prototype.render = function (station) {
 this.container.innerHTML = "";
 const header = this.createHeader(station);
   this.container.appendChild(header);

   const details = this.createDetails(station);
   this.container.appendChild(details);
};


StationView.prototype.createHeader = function(station){
  const header = document.createElement('header');
  const h2 = document.createElement('h2');
  h2.textContent = `Station ID: ${station.items.stationReference}`;
  h2.classList.add("header");
  header.appendChild(h2);
  return header;
};

StationView.prototype.createDetails = function (station) {
  const detailDiv = document.createElement('section');

  const latestReading = document.createElement('h2');
  latestReading.textContent = "Latest Reading:";

  const date = document.createElement('p');
  date.textContent = `Date: ${station.items.measures.latestReading.date}`;

  const time = document.createElement('p');
  const dateTime = station.items.measures.latestReading.dateTime;
  const timeStamp = String(dateTime).slice(11,19);
  time.textContent = `Time: ${timeStamp}`;

  const measurementType = document.createElement('p');
  measurementType.textContent = `Type of measurement: ${station.items.measures.qualifier}`;

  const measurementValue = document.createElement('p');
  measurementValue.textContent =
  `${station.items.measures.parameterName}: ${station.items.measures.latestReading.value} ${station.items.measures.unitName} `;



  detailDiv.appendChild(latestReading);
  detailDiv.appendChild(date);
  detailDiv.appendChild(time);
  detailDiv.appendChild(measurementType);
  detailDiv.appendChild(measurementValue);
  return detailDiv;
};


module.exports = StationView;
