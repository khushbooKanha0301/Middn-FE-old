import React from 'react';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { DownArrowIcon, MinusArrowIcon } from './SVGIcon';
const colors = ['#E55F35'];
const options = {
    chart: {
        type: "spline",
        colors: colors,
        height: 50,
        width:80,
        backgroundColor: null,
        margin: [0, 10, 0, 0],
    },
    colors: colors,
    title: {
        text: null
    },
    tooltip: {
        enabled: false
    },
    credits: {
        enabled: false
    },
    xAxis: {
        visible: false,
    },
    yAxis: {
        visible: false,
    },
    plotOptions: {
        series: {
            marker: {
                enabled: false,
                states: {
                    hover: {
                        enabled: false
                    }
                }
            }
        }
    },
    series: [
        {
            showInLegend: false,
            data: [1, 1, 1, 1, 1]
        }
    ]
};
export const ThisMonth = () => {
    return (
        <>
        <div className="d-inline-flex position-relative">
        <HighchartsReact highcharts={Highcharts} options={options} />
        <div className="month-arrow">
            <div className="no-month-data"><MinusArrowIcon width="16" height="16" /> 0%</div>
            {/* <DownArrowIcon width="16" height="16" /> 0% */}
        </div>
        </div>
        <div className="charts-label font-family-inter">This month</div>
        </>
    );
}

export default ThisMonth;
