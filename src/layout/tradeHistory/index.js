import React, { useState } from "react";
import { Col, Row, Button, Nav } from "react-bootstrap";
import { TrashIcon } from "../../component/SVGIcon";
import Select from "react-select";
import CreateEscrowView from "../escrow/CreateEscrow";

const data = [
  {
    value: 1,
    text: "All Status",
  },
  {
    value: 2,
    text: "Complete",
  },
  {
    value: 3,
    text: "Failed",
  },
];

export const TradeHistory = () => {
  const [selectedOptionStatus, setSelectedOptionStatus] = useState(data[0]);
  const handleChangeStatus = (e) => {
    setSelectedOptionStatus(e);
  };
  const [createEscrowModalShow, setCreateEscrowModalShow] = useState(false);
  const createEscrowModalToggle = () =>
    setCreateEscrowModalShow(!createEscrowModalShow);
  return (
    <div className="trade-history-view">
      <h1>Trade History</h1>
      <Row className="justify-content-between align-items-center">
        <Col lg="auto default-active-keys">
          <Nav defaultActiveKey="all" as="ul" className="filter-btn">
            <Nav.Item as="li">
              <Nav.Link eventKey="all">All</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link eventKey="buy">Buy</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link eventKey="sell">Sell</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col lg="auto">
          <Select
            defaultValue={selectedOptionStatus}
            value={selectedOptionStatus}
            className="select-dropdown"
            isSearchable={false}
            components={{
              IndicatorSeparator: () => null,
            }}
            classNamePrefix="select-dropdown"
            options={data}
            onChange={handleChangeStatus}
            getOptionLabel={(e) => (
              <div className="selected-dropdown">{e.text}</div>
            )}
          />
          <Button variant="dark">
            <TrashIcon width="35" height="35" />
          </Button>
        </Col>
      </Row>
      <div className="table-responsive tradeList">
        <div className="flex-table">
          <div className="flex-table-header">
            <div className="trade-price">Price</div>
            <div className="trade-payment">Payment methods</div>
            <div className="trade-time">Time constraints</div>
            <div className="trade-trader">Trader</div>
            <div className="trade-status">Status</div>
          </div>
          <div className="flex-table-body tradeListBody">
            <div className="trade-price">
              <div className="d-flex align-items-center">
                <span className="customCheckbox">
                  <input type="checkbox" />
                  <span className="check"></span>
                </span>
                <div className="content ms-3">
                  <h6>15.490546893758 ETH</h6>
                  Buy Limit 0.1-0.6 BTC
                </div>
              </div>
            </div>
            <div className="escrow-payment d-flex justify-content-center align-items-center">
              <img
                src={require("../../content/images/ethereum.png")}
                alt="Gabriel  Erickson"
              />
              <span className="ms-2"> Ethereum </span>
            </div>
            <div className="trade-time d-flex justify-content-center align-items-center">
              2 Hours
            </div>
            <div className="escrow-trader d-flex align-items-center justify-content-center">
              <div className="d-flex align-items-center">
                <div className="chat-image">
                  <img
                    src={require("../../content/images/profile-pic.png")}
                    alt="Gabriel  Erickson"
                  />
                  <span className="circle"></span>
                </div>
                <div className="content ms-3">
                  <h6>Gabriel</h6>
                  <span>(100%, 500+)</span>
                </div>
              </div>
            </div>
            <div className="trade-status d-flex justify-content-center align-items-center">
              <span className="statusBtn completebtn">Complete</span>
            </div>
          </div>
          {/* <div className="flex-table-body no-records justify-content-between">
            <div className="no-records-text">
              <div className="no-record-label">No Records</div>
              <p>You haven't made any transaction</p>
            </div>
            <div className="actions profile-action text-center">
              <Button variant="primary" onClick={createEscrowModalToggle}>Create</Button>
            </div>
          </div> */}
        </div>
      </div>
      <CreateEscrowView
        show={createEscrowModalShow}
        onHide={() => setCreateEscrowModalShow(false)}
      />
    </div>
  );
};

export default TradeHistory;
