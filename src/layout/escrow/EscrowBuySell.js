import React, { useState, useEffect } from "react";
import { Col, Row, Card, Form, Button } from "react-bootstrap";
import { countryInfo } from "../accountSetting/countryData";
import { useDispatch } from "react-redux";
import { defineCurrency } from "../../store/slices/countrySettingSlice";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2/src/sweetalert2.js";
import jwtAxios from "../../service/jwtAxios";
import { useSelector } from "react-redux";
import { userDetails } from "../../store/slices/AuthSlice";

function EscrowDetails() {
  const dispatch = useDispatch();
  const [countryCallingCode, setCountryCallingCode] = useState("");
  const [currentPre, setCurrentPre] = useState("USD");
  const [escrows, setEscrow] = useState(null);
  const acAddress = useSelector(userDetails);
  const { id } = useParams();

  const onChange = (e) => {
    // } else if (e.target.name === "currentPre") {
    //   setCurrentPre(e.target.value);
    // } else if (e.target.name === "city") {
    //   setCity(e.target.value);
    // }
  };

  const currencyCountry = () => {
    const result = countryInfo.find(
      (item) => item.currency.code === currentPre
    );
    return result?.flag;
  };

  useEffect(() => {
    jwtAxios
      .get(`/escrows/getEscrowsById/${id}`)
      .then((res) => {
        setEscrow(res.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [acAddress.authToken]);

  return (
    <div className="escrow-details">
      <Row>
        <Col lg="8">
          <Row>
            <Col lg="12">
              <div className="designCheap">
                <h4>Cheap for you</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Commodo lentesque consectetur adipiscing elit.Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Commodo lentesque
                  consectetur adipiscing elit.
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <Form.Group className="form-group">
                <Form.Label>Amount</Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    placeholder={countryCallingCode}
                    name="phone"
                    type="text"
                    value="1"
                    onChange={(e) => {
                      onChange(e);
                    }}
                    maxLength="10"
                  />
                  <div className="d-flex align-items-center">
                    {currentPre ? (
                      <img
                        src={currencyCountry()}
                        alt="Flag"
                        className="circle-data"
                      />
                    ) : (
                      "No Flag"
                    )}
                    <p className="text-white mb-0">
                      {
                        countryInfo.find(
                          (item) => item.currency.code === currentPre
                        )?.currency.code
                      }
                    </p>
                  </div>
                  <div className="country-select">
                    <Form.Select
                      size="sm"
                      value={currentPre}
                      onChange={(e) => {
                        setCurrentPre(e.target.value);
                        dispatch(defineCurrency(e.target.value));
                      }}
                    >
                      {countryInfo.map((data) => (
                        <option
                          value={`${data.currency.code}`}
                          key={`${data.currency.code}`}
                        >
                          {data.currency?.code}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </div>
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group className="form-group">
                <Form.Label>Conversation </Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    placeholder={countryCallingCode}
                    name="phone"
                    type="text"
                    value="1"
                    onChange={(e) => {
                      onChange(e);
                    }}
                    maxLength="10"
                  />
                  <div className="d-flex align-items-center">
                    {currentPre ? (
                      <img
                        src={currencyCountry()}
                        alt="Flag"
                        className="circle-data"
                      />
                    ) : (
                      "No Flag"
                    )}
                    <p className="text-white mb-0">
                      {
                        countryInfo.find(
                          (item) => item.currency.code === currentPre
                        )?.currency.code
                      }
                    </p>
                  </div>
                  <div className="country-select">
                    <Form.Select
                      size="sm"
                      value={currentPre}
                      onChange={(e) => {
                        setCurrentPre(e.target.value);
                        dispatch(defineCurrency(e.target.value));
                      }}
                    >
                      {countryInfo.map((data) => (
                        <option
                          value={`${data.currency.code}`}
                          key={`${data.currency.code}`}
                        >
                          {data.currency?.code}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <div className="d-flex main-limit mb-3">
                <div class="limit-txt">Limit: </div>
                <div class="limit-txt-right">3BTC</div>
              </div>

              <div className="d-flex main-limit mb-2">
                <h6>Detail</h6>
              </div>

              <div className="d-flex main-limit">
                <label>Payment Information</label>
              </div>

              <div className="d-flex main-limit">
                <div class="limit-txt-right">Amount to transfer to Middn </div>
                <div class="limit-txt-left-amount">105,02 BNB</div>
              </div>

              <div className="d-flex main-limit">
                <div class="limit-txt-right">Invoice Amount</div>
                <div class="limit-txt-left">105,00 BNB</div>
              </div>

              <div className="d-flex main-limit">
                <div class="limit-txt-right">Escrow fees </div>
                <div class="limit-txt-left">0,02 BNB</div>
              </div>

              <div className="d-flex main-limit">
                <div class="limit-txt-right">Total</div>
                <div class="limit-txt-left">105,02 BNB</div>
              </div>
              <div className="d-flex main-limit">
                <div className="checkbox">
                  <input
                    type="checkbox"
                    id="vehicle1"
                    name="vehicle1"
                    value="Bike"
                  />
                  <label for="vehicle1">
                    I agree to Middin's escrow terms and conditions.
                  </label>
                </div>
              </div>

              <div className="edit-btn ">
                <Button className="btn btn-success btn-width" variant="success">
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
        <Col lg="4">
          <Card className="cards-dark mb-4">
            <Card.Body>
              <Card.Title as="h2">Information</Card.Title>
              <div className="d-flex align-items-center">
                <div className="chat-image">
                  <img
                    src={
                      escrows?.newImage
                        ? escrows?.newImage
                        : require("../../content/images/avatar.png")
                    }
                    alt={escrows?.newImage ? escrows?.newImage : "No Profile"}
                  />
                  <span className="circle"></span>
                </div>
                <div className="content ms-3">
                  <h6>
                    {escrows?.user_name ? escrows?.user_name : "John doe"}
                  </h6>
                  <span>(100%, 500+)</span>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center expired">
                <div class="card-txt-left">Location</div>
                <div class="card-txt">🇺🇸 United States</div>
              </div>

              <div className="d-flex justify-content-between align-items-center expired">
                <div class="card-txt-left">Trades</div>
                <div class="card-txt">1029</div>
              </div>

              <div className="d-flex justify-content-between align-items-center expired">
                <div class="card-txt-left">Trading partners</div>
                <div class="card-txt">720</div>
              </div>
              <div className="d-flex justify-content-between align-items-center expired">
                <div class="card-txt-left">Feedback score</div>
                <div class="card-txt">99%</div>
              </div>
              <div className="d-flex justify-content-between align-items-center expired">
                <div class="card-txt-left">Typical finalization time</div>
                <div class="card-txt">20 minutes</div>
              </div>
            </Card.Body>
          </Card>

          <Card className="cards-dark">
            <Card.Body>
              <Card.Title as="h2">Summary</Card.Title>
              <div className="d-flex expired">
                <div class="card-txt-left">Price</div>
                <div class="card-txt">15.4905468 ETH</div>
              </div>

              <div className="d-flex expired">
                <div class="card-txt-left">Limit</div>
                <div class="card-txt">0.1-0.6 BTC</div>
              </div>

              <div className="d-flex expired">
                <div class="card-txt-left">Payment methods</div>
                <div class="card-txt">Ethereum</div>
              </div>
              <div className="d-flex expired">
                <div class="card-txt-left">Network</div>
                <div class="card-txt"> Binance Smart Chain</div>
              </div>
              <div className="d-flex expired">
                <div class="card-txt-left">Time constraints</div>
                <div class="card-txt">09:00 AM - 00:00 AM</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default EscrowDetails;
