import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button, Placeholder } from "react-bootstrap";
import {
  CheckmarkIcon,
  IdentificationCardIcon,
  MapPinIcon,
  SecurityIcon,
  UserFocusIcon,
  UserListIcon,
} from "../../component/SVGIcon";
import ChangePasswordView from "../../component/ChangePassword";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { userGetData, userGetFullDetails } from "../../store/slices/AuthSlice";
import jwtAxios from "../../service/jwtAxios";
import {
  notificationFail,
  notificationSuccess,
} from "../../store/slices/notificationSlice";
import listData from "./countryData";
import { countryInfo } from "./countryData";
import {
  defineCountry,
  defineCurrency,
  definePhoneCode,
} from "../../store/slices/countrySettingSlice";
import GoogleAuth from "./googleAuth";
import VerifiedInfo from "./verifiedInfo";

export const AccountSetting = () => {
  const dispatch = useDispatch();
  const [country, setCountry] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const modalToggle = () => setModalShow(!modalShow);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errEmail, setErrEmail] = useState(null);
  const [errPhone, setErrPhone] = useState(null);
  const [currentPre, setCurrentPre] = useState("USD");
  const [countryCallingCode, setCountryCallingCode] = useState("");
  const userDetailsAll = useSelector(userGetFullDetails);
  const [loader, setLoader] = useState(true);
  const [city, setCity] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userData = useSelector(userGetFullDetails);
  const [is2FAEnabled, setIs2FAEnabled] = useState(userData?.is_2FA_enabled);

  countryInfo.sort(function (a, b) {
    var textA = a.currency.code.toUpperCase();
    var textB = b.currency.code.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });

  useEffect(() => {
    let user = userDetailsAll;
    if (user) {
      setFname(user?.fname ? user?.fname : "");
      setLname(user?.lname ? user?.lname : "");
      setPhone(user?.phone ? user?.phone : "");
      setEmail(user?.email ? user?.email : "");
      setCity(user?.city ? user?.city : "");
    }

    if (user?.currentpre) {
      setCurrentPre(user?.currentpre);
    } else {
      let currency = countryInfo.find((item) => item.code === "US");
      setCurrentPre(currency?.currency.code);
    }

    if (user?.location) {
      setCountry(user?.location);
    } else {
      setCountry("US");
    }

    if (user?.phoneCountry) {
      setCountryCallingCode(user?.phoneCountry);
    } else {
      setCountryCallingCode(" +1");
    }

    if (userDetailsAll) {
      setLoader(false);
    }
  }, [userDetailsAll]);

  useEffect(() => {
    let user = userDetailsAll;
    if (user) {
      setFname(user?.fname ? user?.fname : "");
      setLname(user?.lname ? user?.lname : "");
      setPhone(user?.phone ? user?.phone : "");
      setEmail(user?.email ? user?.email : "");
      setCity(user?.city ? user?.city : "");
    }

    if (user?.currentpre) {
      setCurrentPre(user?.currentpre);
    } else {
      let currency = countryInfo.find((item) => item.code === "US");
      setCurrentPre(currency?.currency.code);
    }

    if (user?.location) {
      setCountry(user?.location);
    } else {
      setCountry("US");
    }

    if (user?.phoneCountry) {
      setCountryCallingCode(user?.phoneCountry);
    } else {
      setCountryCallingCode(" +1");
    }

    if (userDetailsAll) {
      setLoader(false);
    }
  }, []);

  const submitHandler = async () => {
    if (!phone) {
      dispatch(notificationFail("Please Enter phone number"));
    }
    if (!email) {
      dispatch(notificationFail("Please Enter email"));
    }
    if (!fname || !lname) {
      dispatch(notificationFail("Please Enter First & Last Name"));
    }
    if (!errEmail && !errPhone && phone && email && fname && lname) {
      setErrPhone(null);
      setErrEmail(null);
      let formSubmit = {
        email: email,
        phone: phone,
        currentpre: currentPre,
        fname: fname,
        lname: lname,
        location: country,
        city: city,
        phoneCountry: countryCallingCode,
      };
      let updateUser = await jwtAxios
        .put(`/users/updateAccountSettings`, formSubmit, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .catch((error) => {
          if(typeof error == "string")
          {
            dispatch(notificationFail(error));
          }
          if (error?.response?.data?.message === "") {
            dispatch(notificationFail("Invalid "));
          }
          if(error?.response?.data?.message)
          {
            dispatch(notificationFail(error?.response?.data?.message));
          }
        });
      if (updateUser) {
        dispatch(userGetData(userGetData.userid)).unwrap();
        dispatch(notificationSuccess("User profile update successfully !"));
      }
    }
  };
  const onChange = (e) => {
    if (e.target.name === "fname") {
      setFname(e.target.value);
    } else if (e.target.name === "lname") {
      setLname(e.target.value);
    } else if (e.target.name === "phone") {
      const value = e.target.value.replace(/\D/g, "");
      setPhone(value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "currentPre") {
      setCurrentPre(e.target.value);
    } else if (e.target.name === "city") {
      setCity(e.target.value);
    }
  };

  const phoneCountry = () => {
    const result = listData.find((item) => item?.code === countryCallingCode);
    return `https://flagcdn.com/h40/${result?.iso?.toLowerCase()}.png`;
  };

  const countryName = () => {
    return `https://flagcdn.com/h40/${country?.toLowerCase()}.png`;
  };

  const currencyCountry = () => {
    const result = countryInfo.find(
      (item) => item.currency.code === currentPre
    );
    return result?.flag;
  };

  const currencyValueChange = () => {
    const result = countryInfo.find(
      (item) => item.currency.code === currentPre
    );
    return result?.currency.name;
  };
  useEffect(() => {
    setIs2FAEnabled(userData?.is_2FA_enabled);
  }, [userData?.is_2FA_enabled]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="account-setting">
      <h1>Account Setting</h1>
      {!loader && userDetailsAll ? (
        <Row>
          <Col lg="8">
            <Card className="cards-dark mb-32">
              <Card.Body>
                <Card.Title as="h2">Account Information</Card.Title>
                <Form>
                  <Row>
                    <Col md="6">
                      <Form.Group className="form-group">
                        <Form.Label>First name</Form.Label>
                        {userDetailsAll?.fname ? (
                          <Form.Label className="form-control">
                            {fname}
                          </Form.Label>
                        ) : (
                          <Form.Control
                            type="text"
                            placeholder="First Name"
                            name="fname"
                            value={fname}
                            onChange={(e) => onChange(e)}
                          />
                        )}
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group className="form-group">
                        <Form.Label>Last name</Form.Label>
                        {userDetailsAll?.lname ? (
                          <Form.Label className="form-control">
                            {lname}
                          </Form.Label>
                        ) : (
                          <Form.Control
                            type="text"
                            placeholder="Last Name"
                            name="lname"
                            value={lname}
                            onChange={(e) => onChange(e)}
                          />
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group className="form-group">
                        <Form.Label>Email (required)</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="email"
                          name="email"
                          value={email}
                          onChange={(e) => onChange(e)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group className="form-group">
                        <Form.Label>Phone number (required)</Form.Label>
                        <div className="d-flex align-items-center">
                          <Form.Control
                            placeholder={countryCallingCode}
                            name="phone"
                            type="text"
                            value={phone}
                            onChange={(e) => {
                              onChange(e);
                            }}
                            maxLength="10"
                          />

                          {countryCallingCode ? (
                            <img
                              src={phoneCountry()}
                              alt="Flag"
                              className="circle-data"
                            />
                          ) : (
                            "No Flag"
                          )}
                          <p className="text-white mb-0">
                            {
                              listData.find(
                                (item) => item?.code === countryCallingCode
                              )?.cca3
                            }
                          </p>
                          <div className="country-select">
                            <Form.Select
                              size="sm"
                              onChange={(e) => {
                                setCountryCallingCode(e.target.value);
                                dispatch(definePhoneCode(e.target.value));
                              }}
                              value={countryCallingCode}
                            >
                              {listData.map((data) => (
                                <option
                                  value={`${data?.code}`}
                                  key={`${data?.code}_${data?.country}}`}
                                >
                                  {data?.country} ({data?.code})
                                </option>
                              ))}
                            </Form.Select>
                          </div>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group className="form-group">
                        <Form.Label>Location</Form.Label>
                        <div className="d-flex align-items-center">
                          <Form.Control
                            placeholder={"City"}
                            name="city"
                            value={city}
                            onChange={(e) => {
                              onChange(e);
                            }}
                          />

                          {country ? (
                            <img
                              src={countryName()}
                              alt="Flag"
                              className="circle-data"
                            />
                          ) : (
                            "No Flag"
                          )}
                          <p className="text-white mb-0">
                            {
                              listData.find((item) => item?.iso === country)
                                ?.cca3
                            }
                          </p>
                          <div className="country-select">
                            <Form.Select
                              size="sm"
                              onChange={(e) => {
                                setCountry(e.target.value);
                                dispatch(defineCountry(e.target.value));
                              }}
                              value={country}
                              disabled={userDetailsAll.location ? true : false}
                            >
                              {listData.map((data) => (
                                <option
                                  value={`${data.iso}`}
                                  key={`${data.iso}`}
                                >
                                  {data.country}
                                </option>
                              ))}
                            </Form.Select>
                          </div>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group className="form-group">
                        <Form.Label>Currency preferred </Form.Label>
                        <div className="d-flex justify-content-between align-items-center">
                          <Form.Control
                            type="text"
                            placeholder="Currency"
                            name="currencyName"
                            value={currencyValueChange()}
                            onChange={onChange}
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
                                <option value={`${data.currency.code}`} key={`${data.currency.code}`}>
                                  {data.currency?.code}
                                </option>
                              ))}
                            </Form.Select>
                          </div>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="edit-btn ">
                    <Button
                      className="btn btn-success"
                      variant="success"
                      onClick={submitHandler}
                    >
                      Save
                    </Button>
                  </div>
                </Form>

                <Card.Title as="h2" className="mb-3 mt-2">
                  Security
                </Card.Title>
                <div className="security-details">
                  <div className="security-text">
                    <div className="security-code">
                      <SecurityIcon width="20" height="16" />
                    </div>
                    <h4>Password</h4>
                    <p>Login password is used to log in to your account.</p>
                  </div>
                  <Button variant="primary" onClick={modalToggle}>
                    Reset Password
                  </Button>
                </div>
              </Card.Body>
            </Card>
            <GoogleAuth />
          </Col>
          <Col lg="4">
            <VerifiedInfo />
          </Col>
        </Row>
      ) : (
        <Row className="account-setting-skeleton">
          <Col lg="8">
            <Card className="cards-dark mb-32">
              <Card.Body>
                <Card.Title as="h2">Account Information</Card.Title>
                <Placeholder as="div" animation="wave">
                  <Row className="inp-row">
                    <Col md="6" className="col">
                      <Placeholder className="input-skeleton" />
                    </Col>
                    <Col md="6" className="col">
                      <Placeholder className="input-skeleton" />
                    </Col>
                  </Row>
                  <Row className="inp-row">
                    <Col md="6" className="col">
                      <Placeholder className="input-skeleton" />
                    </Col>
                    <Col md="6" className="col">
                      <Placeholder className="input-skeleton" />
                    </Col>
                  </Row>
                  <Row className="inp-row">
                    <Col md="6" className="col">
                      <Placeholder className="input-skeleton" />
                    </Col>
                    <Col md="6" className="col">
                      <Placeholder className="input-skeleton" />
                    </Col>
                  </Row>
                </Placeholder>
                <Placeholder as="div" animation="wave">
                  <Placeholder className="form-button-skeleton" />
                </Placeholder>
                <Card.Title as="h2" className="mb-3 mt-2">
                  Security
                </Card.Title>
                <Placeholder as="div" animation="wave">
                  <Placeholder className="reset-pass" />
                </Placeholder>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="cards-dark">
              <Card.Body>
                <Card.Title as="h2">Verified</Card.Title>
                <Placeholder as="div" animation="wave">
                  <Placeholder className="li-skeleton"></Placeholder>
                  <Placeholder className="li-skeleton"></Placeholder>
                  <Placeholder className="li-skeleton"></Placeholder>
                  <Placeholder className="li-skeleton"></Placeholder>
                </Placeholder>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      <ChangePasswordView show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};
export default AccountSetting;
