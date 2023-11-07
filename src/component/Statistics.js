import React from "react";
import { Card, Col, Form, Row, ProgressBar } from "react-bootstrap";
import StatisticsChart from "./StatisticsChart";
import ThisMonth from "./ThisMonth";

export const Statistics = () => {
  return (
    <Card className="cards-dark statistics statisticsGraphs">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Card.Title as="h3" className="font-family-poppins">Statistics</Card.Title>
          <Form.Select aria-label="February 2022">
            <option>February 2022</option>
            <option value="1">January 2022</option>
            <option value="2">March 2022</option>
            <option value="3">April 2022</option>
          </Form.Select>
        </div>
        <div className="transaction-view">
          <div className="transaction">
            <div className="transaction-wrapper">
              <div className="transaction-number">0</div>
              <div className="transaction-label font-family-inter">Total Transaction</div>
            </div>
            <div className="divider"></div>
            <div className="transaction-wrapper">
              <ThisMonth />
            </div>
          </div>
          <div className="transaction-chart">
            <StatisticsChart />
          </div>
        </div>
        <div className="charts-details">
          <Row  className="g-0">
            <Col>
              <div className="chart-item">
                <div className="item-label">
                  <img
                    src={require('../content/images/bitcoin.png')}
                    alt="Bitcoin"
                  />{" "}
                  Bitcoin
                </div>
                <div className="item-count">0</div>
                <ProgressBar className="bitcoin" now={5} />
              </div>
            </Col>
            <Col>
              <div className="chart-item">
                <div className="item-label">
                  <img
                    src={require('../content/images/ether.png')}
                    alt="ether"
                  />{" "}
                  ETHER
                </div>
                <div className="item-count">0</div>
                <ProgressBar className="ether" now={5} />
              </div>
            </Col>
            <Col>
              <div className="chart-item">
                <div className="item-label">
                  <img src={require('../content/images/bnb.png')} alt="BNB" />{" "}
                  BNB
                </div>
                <div className="item-count">0</div>
                <ProgressBar className="bnb" now={5} />
              </div>
            </Col>
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Statistics;
