import React, { useEffect, useState } from "react";
import { Col, Row, Button, Card, Form, Nav } from "react-bootstrap";
import { UploadIcon } from "../../component/SVGIcon";
import Select from "react-select";
import CreateEscrowView from "./CreateEscrow";
import jwtAxios from "../../service/jwtAxios";
import PaginationComponent from "../../component/Pagination";
import { useSelector } from "react-redux";
import { userDetails } from "../../store/slices/AuthSlice";

let PageSize = 5;

const data = [
  {
    value: 1,
    text: "Any",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="12" fill="#C4C4C4" />
      </svg>
    ),
  },
  {
    value: 2,
    text: "BTC",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="12" fill="#C4C4C4" />
      </svg>
    ),
  },
  {
    value: 3,
    text: "Anywhere",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="12" fill="#C4C4C4" />
      </svg>
    ),
  },
];
export const Escrow = () => {
  
  const [selectedOptionAny, setSelectedOptionAny] = useState(data[0]);
  const [selectedOptionBTC, setSelectedOptionBTC] = useState(data[1]);
  const [selectedOptionAnywhere, setSelectedOptionAnywhere] = useState(data[2]);
  const [escrows, setEscrow] = useState(null);
  const [totalEscrowCount, setTotalEscrowCount] = useState(0);
  const [escrowLoading, setEscrowLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const acAddress = useSelector(userDetails);

  const getAllEscrow = async () => {
    if (currentPage) {
      await jwtAxios
        .get(
          `/escrows/getAllEscrows?page=${currentPage}&pageSize=${PageSize}`
        )
        .then((res) => {
          setEscrowLoading(false);
          setEscrow(res.data?.data);
          setTotalEscrowCount(res.data?.escrowsCount);
        })
        .catch((err) => {
          setEscrowLoading(false);
          console.log(err);
        });
    }
  };
  useEffect(() => {
    getAllEscrow();
  }, [currentPage, acAddress.authToken]);
  

  const handleChangeAny = (e) => {
    setSelectedOptionAny(e);
  };
  const handleChangeBTC = (e) => {
    setSelectedOptionBTC(e);
  };
  const handleChangeAnywhere = (e) => {
    setSelectedOptionAnywhere(e);
  };
  const [createEscrowModalShow, setCreateEscrowModalShow] = useState(false);
  const createEscrowModalToggle = () =>
    setCreateEscrowModalShow(!createEscrowModalShow);
  return (
    <div className="escrow-view">
      <h4>Hi Alex, Welcome back!</h4>
      <h1>Your Escrow</h1>
      <Row>
        <Col lg="8">
          <div className="create-escrow">
            <p>Create your escrow</p>
            <Button
              variant="primary"
              onClick={createEscrowModalToggle}
              type="button"
            >
              <UploadIcon width="16" height="16" /> Create
            </Button>
          </div>
        </Col>
        <Col lg="4">
          <Card className="cards-dark">
            <Card.Body>
              <Card.Title as="h2">Your Latest Ticket</Card.Title>
              <Form.Group className="form-group">
                <Form.Label>Description of Transaction</Form.Label>
                <Form.Control type="text" placeholder="app.middn..9341982390" />
              </Form.Group>
              <div className="d-flex justify-content-between align-items-center expired">
                <div>Expired</div>
                <div>23:20 24/02/2022</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="escrow-active-offers">
        <h2>Active offers</h2>
        <Row className="justify-content-between align-items-center">
          <Col lg="auto default-active-keys ">
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
          <Col lg="auto default-active-keys">
            <Select
              defaultValue={selectedOptionAny}
              value={selectedOptionAny}
              className="select-dropdown"
              isSearchable={false}
              components={{
                IndicatorSeparator: () => null,
              }}
              classNamePrefix="select-dropdown"
              options={data}
              onChange={handleChangeAny}
              getOptionLabel={(e) => (
                <div className="selected-dropdown">
                  {e.icon}
                  <span>{e.text}</span>
                </div>
              )}
            />
            <Select
              defaultValue={selectedOptionBTC}
              value={selectedOptionBTC}
              isSearchable={false}
              className="select-dropdown"
              components={{
                IndicatorSeparator: () => null,
              }}
              classNamePrefix="select-dropdown"
              options={data}
              onChange={handleChangeBTC}
              getOptionLabel={(e) => (
                <div className="selected-dropdown">
                  {e.icon}
                  <span>{e.text}</span>
                </div>
              )}
            />
            <Select
              defaultValue={selectedOptionAnywhere}
              value={selectedOptionAnywhere}
              isSearchable={false}
              className="select-dropdown"
              components={{
                IndicatorSeparator: () => null,
              }}
              classNamePrefix="select-dropdown"
              options={data}
              onChange={handleChangeAnywhere}
              getOptionLabel={(e) => (
                <div className="selected-dropdown">
                  {e.icon}
                  <span>{e.text}</span>
                </div>
              )}
            />
          </Col>
        </Row>
        <div className="table-responsive escrowList">
          <div className="flex-table">
            <div className="flex-table-header">
              <div className="escrow-price">Price</div>
              <div className="escrow-title">Title</div>
              <div className="escrow-payment">Payment methods</div>
              <div className="escrow-time">Time constraints</div>
              <div className="escrow-trader">Trader</div>
              <div className="escrow-actions">Actions</div>
              <div className="escrow-network">Network</div>
            </div>
            {escrows?.map((escrow) => (
              <div
                className="flex-table-body escrowListBody"
                key={escrow._id}
              >
                <div className="escrow-price">
                  15.4 ETH <span>Buy Limit 0.1-0.6 BTC</span>
                </div>
                <div className="escrow-title d-flex justify-content-center align-items-center">
               {escrow.object}
                </div>
                <div className="escrow-payment d-flex justify-content-center align-items-center">
                  <img
                    src={require("../../content/images/ethereum.png")}
                    alt="Gabriel  Erickson"
                  />
                  <span className="ms-2"> Ethereum </span>
                </div>
                <div className="escrow-time d-flex justify-content-center">
                 {escrow.time_constraints}
                </div>
                <div className="escrow-trader d-flex align-items-center justify-content-center">
                  <div className="d-flex align-items-center">
                    <div className="chat-image">
                       <img
                        src={
                          escrow?.newImage
                            ? escrow?.newImage
                            : require("../../content/images/avatar.png")
                        }
                        alt={
                          escrow?.newImage
                            ?  escrow?.newImage
                            : "No Profile"
                        }
                      />
                      <span className="circle"></span>
                    </div>
                    <div className="content ms-3">
                      <h6>{escrow.user_name ? escrow.user_name : 'John doe'}</h6>
                      <span>(100%, 500+)</span>
                    </div>
                  </div>
                </div>
                <div className="escrow-actions text-center d-flex justify-content-center">
                  <Button variant="primary">Buy</Button>
                </div>
                <div className="escrow-network">Binance Smart Chain</div>
              </div>
            ))}
            {totalEscrowCount === 0  && escrowLoading === false && (
              <div className="flex-table-body no-records justify-content-between">
                <div className="no-records-text">
                  <div className="no-record-label">No Records</div>
                  <p>You haven't made any transaction</p>
                </div>
                <div className="actions profile-action text-center">
                  <Button variant="primary">Create</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {totalEscrowCount !== 0  && escrowLoading === false && (
        <div className="d-flex justify-content-between align-items-center table-pagination">
          <PaginationComponent
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={totalEscrowCount}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
          <div className="table-info">
            {currentPage === 1
              ? `${totalEscrowCount > 0 ? 1 : 0}`
              : `${(currentPage - 1) * PageSize + 1}`}{" "}
            - {`${Math.min(currentPage * PageSize, totalEscrowCount)}`} of{" "}
            {totalEscrowCount}
          </div>
        </div>
      )}
      <CreateEscrowView
        show={createEscrowModalShow}
        onHide={() => setCreateEscrowModalShow(false)}
      />
    </div>
  );
};

export default Escrow;
