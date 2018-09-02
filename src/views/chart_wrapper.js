const PubSub = require('../helpers/pub_sub.js');
const Highcharts = require('highcharts');

const ChartWrapper = function (container) {
this.container = container;
this.xdata = [];
this.ydata = [];
};


ChartWrapper.prototype.bindEvents = function () {

  PubSub.subscribe('Stations:selected-station-all-data', (event) => {

    const stationData = event.detail;
    // maybe try a MAP here?


    stationData.items.forEach((station) => {
      this.ydata.push(station.value);
      this.xdata.push(station.dateTime);

    });
  });



  //attempting to 'zip' my x and y data
  const mySeries = this.xdata.map(function(e, i) {
    return [e, this.ydata[i]];
  });

  // TODO: I cant tell if these are arrays or not!!!
  //They have values but I can't use them to construct a chart!!!

  console.log(this.xdata); //works
  console.log(this.ydata); //works
  console.log(mySeries); //why not work!

  const options = {

  title: {
      text: 'RainFall from station'
  },

  yAxis: {
      title: {
          text: 'Rainfall (mm)'
      },

  },

  xAxis: {
      type: 'datetime',

      title: {
          text: 'Date'
      }
  },

  legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
  },

  plotOptions: {
      series: {
        label: {
          connectorAllowed: true
        }
      }
  },


  series: [{
      name: 'Rainfall (mm)',
      data: [this.ydata]
    }],

  responsive: {
      rules: [{
          condition: {
              maxWidth: 500
          },
          chartOptions: {
              legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
              }
          }
      }]
  }
};

Highcharts.chart(this.container, options);
};


module.exports = ChartWrapper;
