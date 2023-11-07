import React from 'react';
import { Card } from 'react-bootstrap';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import VariablePie from "highcharts/modules/variable-pie.js";
VariablePie(Highcharts);
const colors = ['#F7931A', '#627EEA', '#F3BA2F', '#151A20'];
const options = {
    chart: {
        type: 'variablepie',
        colors: colors,
        height: 220,
        backgroundColor: null,
        margin: [0, 0, 0, 0],
        spacingTop: 0,
        spacingBottom: 0,
        spacingLeft: 0,
        spacingRight: 0
    },
    colors: colors,
    title: {
        text: '0%',
        align: 'center',
        verticalAlign: 'middle',
        y: 25,
        x: 5,
        style: {
            color: '#fff',
            fontWeight: 500,
            fontFamily: 'Roboto',
            fontSize: '22px'
        }
    },
    tooltip: {
        enabled: false
    },
    credits: {
        enabled: false
    },
    series: [{
        minPointSize: 20,
        innerSize: '50%',
        borderWidth: 0,
        zMin: 0,
        name: 'Sales per month',
        dataLabels: {
            enabled: false
        },
        data: [
            {
                name: 'Bitcoin',
                y: 150,
                z: 80
            }, {
                name: 'ETHER',
                y: 60,
                z: 50
            }, {
                name: 'BNB',
                y: 40,
                z: 30
            }, {
                name: '',
                y: 50,
                z: 20
            }
        ]
    }]
};
export const Sales = () => {
    return (
        <Card className="cards-dark sales">
            <Card.Body>
                <Card.Title as="h3" className="font-family-poppins">Sales per month</Card.Title>
                <div className="charts-items">
                    <div className="item"><span className="item-bar bitcoin"></span>Bitcoin</div>
                    <div className="item"><span className="item-bar ether"></span>ETHER</div>
                    <div className="item"><span className="item-bar bnb"></span>BNB</div>
                </div>
                <div className="charts-container">
                    <HighchartsReact highcharts={Highcharts} options={options} />
                </div>
            </Card.Body>
            <Card.Footer>
                <div className="d-flex align-items-center">
                    <img src={require('../content/images/avatar1.png')} style={{width:'48px', height:'48px'}} alt="avatar" />
                    <div className="user-info">
                        <div className="u-name">Alex</div>
                        <div className="u-login-name">0xSFw...ASws</div>
                    </div>
                </div>
                <div className="text-end">
                    <div className="u-name">0</div>
                    <div className="u-login-name">has been made</div>
                </div>
            </Card.Footer>
        </Card>
    );
}

export default Sales;
