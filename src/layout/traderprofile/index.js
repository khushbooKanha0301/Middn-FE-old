import React, { useState, useEffect } from "react";
import { Col, Row, Card, Button, Tabs, Tab, Nav } from "react-bootstrap";
import EditProfileView from "../../component/EditProfile";
import MessageView from "../../component/Message";
import ReportUserView from "../../component/ReportUser";
import {
  InstagramIcon,
  TelegramIcon,
  MessageIcon,
  SimpleCheckIcon,
  TwitterIcon,
} from "../../component/SVGIcon";
import { useSelector } from "react-redux";
import { userDetails, userGetFullDetails } from "../../store/slices/AuthSlice";
import LoginView from "../../component/Login";
import { useNavigate, useParams } from "react-router-dom";
import jwtAxios from "../../service/jwtAxios";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { InfoLoader, ProfileLoader } from "./Loader";
import { notificationSuccess } from "../../store/slices/notificationSlice";
import { database, firebaseMessages } from "../chat/config";
import { onValue, ref } from "firebase/database";
import ReviewTransactionView from "../../component/ReviewTransaction";

export const TraderProfile = (props) => {
  const dispatch = useDispatch();
  const [country, setCountry] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [connectWalletmodalShow, setconnectWalletModalShow] = useState(false);
  const modalToggle = () => setModalShow(!modalShow);
  const connectWalletModalToggle = () =>
    setconnectWalletModalShow(!connectWalletmodalShow);

  const [reportModalShow, setReportModalShow] = useState(false);
  const reportModalToggle = () => setReportModalShow(!reportModalShow);
  const [editProfileModalShow, setEditProfileModalShow] = useState(false);
  const editProfileModalToggle = () =>
    setEditProfileModalShow(!editProfileModalShow);
  const userData = useSelector(userDetails);
  let loginuserdata = useSelector(userGetFullDetails);
  const [countryCode, setCountryCode] = useState("");
  const isAuth = userData.authToken;
  const [isSign, setIsSign] = useState(null);
  const [loader, setLoader] = useState(true);
  const { address } = useParams();
  const [isAuthAddress, setisAuthAddress] = useState(true);
  const [otherUser, setOtherUser] = useState(null);
  const [otherStatus, setUserStatus] = useState(null);
  const [otherUserData, setOtherUserData] = useState({});
  const countryDetails = useSelector((state) => state.auth.countryDetails);
  const navigate = useNavigate();
  const [activeEscrows, setActiveEscrows] = useState([]);
  const getActiveEscrows = async () => {
    await jwtAxios
      .get(`/auth/activeEscrows/${address}`)
      .then((res) => {
        setActiveEscrows(res.data?.data?.escrows);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getActiveEscrows();
  }, []);

  useEffect(() => {
    if (countryDetails) {
      setCountry(countryDetails?.country_name);
      setCountryCode(countryDetails?.country_code);
    }
  }, [countryDetails]);
  const flagUrl = countryCode
    ? `https://flagcdn.com/h40/${countryCode?.toLowerCase()}.png`
    : "";

  const handleAccountAddress = (address) => {
    setIsSign(false);
  };

  const checkAddress = async () => {
    await jwtAxios
      .get(`/auth/getuser/${address}`)
      .then((response) => {
        setOtherUserData({
          ...response.data.user,
          imageUrl: response.data.docUrl,
        });
        setTimeout(() => {
          setLoader(false);
        }, 2000);
      })
      .catch((e) => {
        navigate("/");
        setLoader(false);
        dispatch(notificationSuccess("Something went wrong"));
      });
  };

  useEffect(() => {
    if (address) {
      if (address.length !== 42) {
        setLoader(false);
        navigate("/");
      } else {
        if (loginuserdata && address === loginuserdata?.wallet_address) {
          setisAuthAddress(true);
          setLoader(false);
        } else {
          setisAuthAddress(false);
          if (!otherUserData?.wallet_address && !isAuthAddress) {
            checkAddress();
          }
        }
      }
    }
  }, [address, loginuserdata, otherUserData, isAuthAddress]);

  useEffect(() => {
    if (otherUserData && otherUserData?.wallet_address) {
      const starCountRef = ref(
        database,
        firebaseMessages.CHAT_USERS + otherUserData?.wallet_address
      );
      onValue(starCountRef, (snapshot) => {
        setUserStatus(snapshot.val()?.isOnline);
      });
    }
  }, [otherUserData]);

  return (
    <div className="profile-view">
      <Row>
        <Col lg="8">
          <div className="profile-details">
            {loader ? (
              <ProfileLoader />
            ) : (
              <Row className="g-0">
                <Col xs="2">
                  {isAuthAddress ? (
                    <Button
                      variant="link"
                      className="profile-image"
                      onClick={editProfileModalToggle}
                    >
                      <img
                        src={
                          loginuserdata?.imageUrl
                            ? loginuserdata?.imageUrl
                            : require("../../content/images/avatar.png")
                        }
                        alt={
                          loginuserdata?.imageUrl
                            ? loginuserdata?.imageUrl
                            : "No Profile"
                        }
                      />
                      {otherStatus && otherStatus === true && (
                        <div className="profile-status"></div>
                      )}
                    </Button>
                  ) : (
                    <Button variant="link" className="profile-image">
                      <img
                        src={
                          otherUserData?.imageUrl
                            ? otherUserData?.imageUrl
                            : require("../../content/images/avatar.png")
                        }
                        alt={"No Profile"}
                      />
                      {otherStatus && otherStatus === true && (
                        <div className="profile-status"></div>
                      )}
                    </Button>
                  )}
                </Col>
                <Col>
                  <h1>
                    {isAuthAddress
                      ? loginuserdata &&
                        loginuserdata.fname_alias +
                          " " +
                          loginuserdata.lname_alias
                      : otherUserData
                      ? otherUserData.fname_alias +
                        " " +
                        otherUserData.lname_alias
                      : ""}
                    <span className="verify-status">
                      <SimpleCheckIcon width="16" height="12" />
                    </span>
                  </h1>
                  <div className="about-profile">
                    <h6>
                      <strong>0</strong> transactions
                    </h6>
                    <h6 className="feedback">
                      <strong>0</strong> positive feedback
                    </h6>
                  </div>
                  <p>
                    {isAuthAddress
                      ? loginuserdata && loginuserdata.bio
                      : otherUser
                      ? otherUser.bio
                      : ""}
                    {/* {otherUser.bio? getMessageContent(otherUser) : ""} */}
                  </p>
                  <div className="profile-btn">
                    {userData && userData.account === "Connect Wallet" ? (
                      <>
                        <Button
                          variant="primary"
                          onClick={connectWalletModalToggle}
                        >
                          <MessageIcon width="18" height="16" />
                          Message{" "}
                        </Button>
                        <Button
                          variant="danger"
                          className="buttonspace"
                          onClick={connectWalletModalToggle}
                        >
                          Report User
                        </Button>
                      </>
                    ) : isAuthAddress && isAuth ? (
                      <>
                        <Button
                          variant="secondary"
                          className="auth-btn"
                          onClick={editProfileModalToggle}
                        >
                          Edit Profile{" "}
                        </Button>
                        <Button
                          variant="primary"
                          className="buttonspace auth-btn"
                        >
                          Verification
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="primary" onClick={modalToggle}>
                          <MessageIcon width="18" height="16" />
                          Message
                        </Button>
                        <Button
                          variant="danger"
                          className="buttonspace"
                          onClick={reportModalToggle}
                        >
                          Report User
                        </Button>
                      </>
                    )}
                  </div>
                  <p>Social media</p>
                  <div className="social-btn">
                    <Button variant="link">
                      <InstagramIcon width="32" height="32" />
                    </Button>
                    <Button variant="link">
                      <TwitterIcon width="32" height="32" />
                    </Button>
                    <Button variant="link">
                      <TelegramIcon width="32" height="32" />
                    </Button>
                  </div>
                </Col>
              </Row>
            )}
          </div>
        </Col>
        {loader ? (
          <InfoLoader />
        ) : (
          <Col lg="4">
            <Card className="cards-dark">
              <Card.Body>
                <Card.Title as="h2">Information</Card.Title>
                <div className="profile-information">
                  <Row className="align-items-center g-0">
                    <Col xs="7">
                      <label>Location</label>
                    </Col>
                    <Col>
                      {flagUrl && (
                        <img
                          src={flagUrl}
                          alt="Flag"
                          style={{ weight: "14px", height: "10px" }}
                        />
                      )}{" "}
                      <span>{country && country}</span>
                    </Col>
                  </Row>
                  <Row className="align-items-center g-0">
                    <Col xs="7">
                      <label>Trades</label>
                    </Col>
                    <Col>0</Col>
                  </Row>
                  <Row className="align-items-center g-0">
                    <Col xs="7">
                      <label>Trading partners</label>
                    </Col>
                    <Col>0</Col>
                  </Row>
                  <Row className="align-items-center g-0">
                    <Col xs="7">
                      <label>Feedback score</label>
                    </Col>
                    <Col>0%</Col>
                  </Row>
                  <Row className="align-items-center g-0">
                    <Col xs="7">
                      <label>Account created</label>
                    </Col>
                    <Col>Yesterday</Col>
                  </Row>
                  <Row className="align-items-center g-0">
                    <Col xs="7">
                      <label>Typical finalization time</label>
                    </Col>
                    <Col>-</Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
      <Tabs defaultActiveKey="active-offers" id="profile-tab">
        <Tab eventKey="active-offers" title="Active offers">
          <h2>Active offers</h2>
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
          <div className="table-responsive">
            <div className="flex-table">
              <div className="flex-table-header">
                <div className="price">Price</div>
                <div className="payment">Payment methods</div>
                <div className="time">Location</div>
                <div className="trader">Trader</div>
                <div className="actions profile-action">Actions</div>
              </div>
              {activeEscrows.length && (
                <div className="flex-table-body" key={activeEscrows._id}>
                  <div className="price">A</div>
                  <div className="payment">B</div>
                  <div className="time">C</div>
                  <div className="trader">D</div>
                  <div className="actions profile-action text-center">
                    <Button variant="primary">Create</Button>
                  </div>
                </div>
              )}
              {!activeEscrows.length && (
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
        </Tab>
        <Tab eventKey="reviews" title="Reviews">
          <div className="d-flex justify-content-between align-items-center">
            {/* <h2>Reviews</h2> */}
            {/* <Form.Select aria-label="Newest">
                            <option>Newest</option>
                            <option value="1">Standard</option>
                            <option value="2">Latter</option>
                        </Form.Select> */}
          </div>
          {/* <div className="reviews-list">
                        <Card className="cards-dark">
                            <Card.Body>
                                <div className="reviewer-image">
                                    <img
                                        src={require("../../content/images/escrows-5.png")}
                                        alt="Gabriel  Erickson"
                                        width="51"
                                        height="51"
                                    />
                                </div>
                                <div className="reviewer-details">
                                    <StarRating
                                        ratings={5}
                                        customIcon={<StarFillIcon width="12" height="12" />}
                                        customEmptyIcon={<StarEmptyIcon width="12" height="12" />}
                                    />
                                    <div className="reviewer-name">
                                        Gabriel <span>12 hours ago</span>
                                    </div>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                        do eiusmod tempor incididunt ut labore et dolore magna
                                        aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing
                                        elit, sed do eiusmod tempor incididunt ut labore et dolore
                                        magna aliqua.
                                    </p>
                                    <div className="reviewer-transaction">
                                        Transaction : <strong>Buy 5 BTC</strong>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card className="cards-dark">
                            <Card.Body>
                                <div className="reviewer-image">
                                    <img
                                        src={require("../../content/images/escrows-5.png")}
                                        alt="Gabriel  Erickson"
                                        width="51"
                                        height="51"
                                    />
                                </div>
                                <div className="reviewer-details">
                                    <StarRating
                                        ratings={5}
                                        customIcon={<StarFillIcon width="12" height="12" />}
                                        customEmptyIcon={<StarEmptyIcon width="12" height="12" />}
                                    />
                                    <div className="reviewer-name">
                                        Gabriel <span>12 hours ago</span>
                                    </div>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                        do eiusmod tempor incididunt ut labore et dolore magna
                                        aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing
                                        elit, sed do eiusmod tempor incididunt ut labore et dolore
                                        magna aliqua.
                                    </p>
                                    <div className="reviewer-transaction">
                                        Transaction : <strong>Buy 5 BTC</strong>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card className="cards-dark">
                            <Card.Body>
                                <div className="reviewer-image">
                                    <img
                                        src={require("../../content/images/escrows-5.png")}
                                        alt="Gabriel  Erickson"
                                        width="51"
                                        height="51"
                                    />
                                </div>
                                <div className="reviewer-details">
                                    <StarRating
                                        ratings={5}
                                        customIcon={<StarFillIcon width="12" height="12" />}
                                        customEmptyIcon={<StarEmptyIcon width="12" height="12" />}
                                    />
                                    <div className="reviewer-name">
                                        Gabriel <span>12 hours ago</span>
                                    </div>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                        do eiusmod tempor incididunt ut labore et dolore magna
                                        aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing
                                        elit, sed do eiusmod tempor incididunt ut labore et dolore
                                        magna aliqua.
                                    </p>
                                    <div className="reviewer-transaction">
                                        Transaction : <strong>Buy 5 BTC</strong>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card className="cards-dark">
                            <Card.Body>
                                <div className="reviewer-image">
                                    <img
                                        src={require("../../content/images/escrows-5.png")}
                                        alt="Gabriel  Erickson"
                                        width="51"
                                        height="51"
                                    />
                                </div>
                                <div className="reviewer-details">
                                    <StarRating
                                        ratings={5}
                                        customIcon={<StarFillIcon width="12" height="12" />}
                                        customEmptyIcon={<StarEmptyIcon width="12" height="12" />}
                                    />
                                    <div className="reviewer-name">
                                        Gabriel <span>12 hours ago</span>
                                    </div>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                        do eiusmod tempor incididunt ut labore et dolore magna
                                        aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing
                                        elit, sed do eiusmod tempor incididunt ut labore et dolore
                                        magna aliqua.
                                    </p>
                                    <div className="reviewer-transaction">
                                        Transaction : <strong>Buy 5 BTC</strong>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div> */}
        </Tab>
      </Tabs>
      <MessageView
        show={modalShow}
        onHide={() => setModalShow(false)}
        otheruser={otherUserData ? otherUserData : ""}
      />
      <ReviewTransactionView
        show={reportModalShow}
        onHide={() => setReportModalShow(false)}
        // userAddress={address}
      />
      <EditProfileView
        show={editProfileModalShow}
        onHide={() => setEditProfileModalShow(false)}
      />
      {connectWalletmodalShow && (
        <LoginView
          show={connectWalletmodalShow}
          onHide={() => setconnectWalletModalShow(false)}
          isSign={isSign}
          handleaccountaddress={handleAccountAddress}
        />
      )}
    </div>
  );
};

export default TraderProfile;
