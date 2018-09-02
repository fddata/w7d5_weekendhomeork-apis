const PubSub = require('../helpers/pub_sub.js');
const Highcharts = require('highcharts');

const ChartWrapper = function (container) {
this.container = container;
this.xdata = [];
this.ydata = [];
};


const  myYData = [];
const  myXData = [];
const myYSeries = [];

ChartWrapper.prototype.bindEvents = function () {

  PubSub.subscribe('Stations:selected-station-all-data', (event) => {

    const stationData = event.detail;
    // maybe try a MAP here?


    stationData.items.forEach((station) => {
      this.ydata.push(station.value);
      this.xdata.push(station.dateTime);

    });
  });

 const valueArray = this.ydata.map((x) => x*1);
 console.log(valueArray);

  console.log(this.xdata);
  console.log(this.ydata);



    const options = {

    title: {
        text: 'RainFall from station'
    },

    yAxis: {
        title: {
            text: 'Rainfall (mm)'
        },
        data: this.xdata
    },

    xAxis: {
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
      name: "Rainfall",
      data: this.ydata
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
