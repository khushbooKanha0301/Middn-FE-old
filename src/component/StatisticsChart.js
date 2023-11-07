import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
const colors = ["#ffffff"];
const options = {
  chart: {
    type: "column",
    colors: colors,
    height: 150,
    backgroundColor: null,
  },
  colors: colors,
  xAxis: {
    categories: [
      "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
    ],
    labels: {
      style: {
        fontWeight: 500,
        color: "#fff",
        fontSize: 10,
        fontFamily: "eudoxus sans",
      },
    },
    lineColor: "transparent",
  },
  yAxis: {
    min: 0,
    max: 100,
    crosshair: {
      snap: true,
      color: "#ffffff20",
    },
    gridLineColor: "transparent",
    title: false,
    labels: {
      step: 1,
      style: {
        fontWeight: 500,
        color: "#fff",
        fontSize: 13,
        fontFamily: "eudoxus sans",
      },
    },
  },
  title: {
    text: null,
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    line: {
      marker: {
        // height:"0px",
        radius: 0,
        states: {
          hover: {
            radius: 4,
            fillColor: "#affa67",
          },
          normal: {
            fillColor: "#1b1c1f",
          },
        },
      },
    },
    series: {
      borderRadius: 3.5,
      pointWidth: 4,
      
    },
  },
  tooltip: {
    borderRadius: 20,
    backgroundColor: "#25272D",
    borderColor: "#25272D",
    // padding: 30,
    style: {
      color: "#fff",
      fontSize: "13px",
      fontWeight: 700,
    },
    shared: true,
    formatter: function () {
      return this.y;
    },
  },
  series: [
    {
      showInLegend: false,
      data: [0,0,0,0,0,0,0,0,0,],
    },
    {
      type: "line",
      color: "transperant",
      showInLegend: false,
      data: [0, 0, 0, 0, 0, 0,0,0,0,0,0,0],
    },
   
  ],
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 350,
        },
        chartOptions: {
          xAxis: {
            labels: {
              step: 1,
              formatter: function () {
                return this.value.charAt(0);
              },
            },
          },
        },
      },
    ],
  },
};
export const StatisticsChart = () => {
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default StatisticsChart;
