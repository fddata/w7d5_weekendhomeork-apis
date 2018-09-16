const PubSub = require('../helpers/pub_sub.js');
const Highcharts = require('highcharts');

const ChartWrapper = function (container) {
this.container = container;
this.xdata = [];
this.ydata = [];
this.date = "";
};


ChartWrapper.prototype.bindEvents = function () {

  this.getDate();

  PubSub.subscribe('Stations:selected-station-all-data', (event) => {

    const stationData = event.detail;

    stationData.items.forEach((station) => {
      this.ydata.push(station.value);
      this.xdata.push(station.dateTime);
    });
    this.renderChart();
  });

};


ChartWrapper.prototype.getDate = function () {

  PubSub.subscribe('Stations:selected-station-all-data', (event) => {

    const stationData = event.detail;
    const today = stationData.items[0].dateTime.slice(0,10);
    this.date = today;
  });
};


ChartWrapper.prototype.renderChart = function () {


  const options = {

    chart: {
    type: 'column'
  },

  title: {
      text: 'RainFall from station'
  },

  subtitle: {
  text: `Most recent date: ${this.date}`
  },

  yAxis: {
      title: {
          text: 'Rainfall (mm)'
      },

  },

  xAxis: {
      categories:this.xdata,
      tickInterval: 16,
      reversed: true,

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
