import React, { useEffect, useRef, useState } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  notificationFail,
  notificationSuccess,
} from "../../store/slices/notificationSlice";
import { useDispatch } from "react-redux";
import jwtAxios from "../../service/jwtAxios";

export const EditEscrowView = (props) => {
  const [step, setStep] = useState(1);
  const escrowLinkRef = useRef(null);
  const [escrowType, setEscrowType] = useState(null);
  const [price, setPrice] = useState("");
  const [priceType, setPriceType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("high_value_items");
  const [object, setObject] = useState("jewelery");
  const [description, setDescription] = useState(null);
  const [processTime, setProcessTime] = useState("24_hours");
  const [escrowNumber, setEscrowNumber] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 1 && !escrowType) {
      dispatch(notificationFail("Please select Buyer or Seller."));
    } else if (step === 2) {
      if (priceType == "") {
        dispatch(notificationFail("Please add Fixed or Flexible Price"));
      } else {
        if (priceType == "fixed") {
          if (!price || price == "") {
            dispatch(notificationFail("Please add Fixed Price"));
          } else {
            setStep(step + 1);
          }
        } else if (priceType == "flexible") {
          if (!minPrice || minPrice == "") {
            dispatch(notificationFail("Please add Flexible Minimum Price"));
          } else if (!maxPrice || maxPrice == "") {
            dispatch(notificationFail("Please add Flexible Maximum Price"));
          } else {
            setStep(step + 1);
          }
        }
      }
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const inputChangeHandler = (e) => {
    let numericRegex = /[^0-9.]/g;
    switch (e.target.name) {
      case "radiooption":
        setEscrowType(e.target.value);
        break;
      case "price":
        if (e.target.value) {
          setPriceType("fixed");
          setMinPrice("");
          setMaxPrice("");
        } else {
          if (minPrice != "" || maxPrice != "") {
            setPriceType("flexible");
          } else {
            setPriceType("");
          }
        }
        e.target.value = e.target.value.replace(numericRegex, "");
        setPrice(e.target.value);
        break;
      case "minPrice":
        if (e.target.value) {
          setPrice("");
          setPriceType("flexible");
        } else {
          if (maxPrice != "") {
            setPriceType("flexible");
          } else {
            if (price != "") {
              setPriceType("fixed");
            } else {
              setPriceType("");
            }
          }
        }

        e.target.value = e.target.value.replace(numericRegex, "");
        setMinPrice(e.target.value);
        break;
      case "maxPrice":
        if (e.target.value) {
          setPrice("");
          setPriceType("flexible");
        } else {
          if (minPrice != "") {
            setPriceType("flexible");
          } else {
            if (price != "") {
              setPriceType("fixed");
            } else {
              setPriceType("");
            }
          }
        }
        e.target.value = e.target.value.replace(numericRegex, "");
        setMaxPrice(e.target.value);
        break;
      case "category":
        setCategory(e.target.value);
        break;
      case "object":
        setObject(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "processTime":
        setProcessTime(e.target.value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (props.show) {
      setEscrowType(null);
      setPrice("");
      setPriceType("");
      setMinPrice("");
      setMaxPrice("");
      setDescription("");
      setEscrowNumber(null);
    }
  }, [props.show]);

  function copyToClipboard(e) {
    escrowLinkRef.current.select();
    document.execCommand("copy");
  }

  const submitHandler = async () => {
    if (step === 3 && !description) {
      dispatch(notificationFail("Please add Description"));
      return false;
    }
    const reqData = {
      escrowType,
      priceType,
      price,
      minPrice,
      maxPrice,
      category,
      object,
      description,
      processTime,
    };
    await jwtAxios
      .post(`/escrows/createEscrow`, reqData)
      .then((escrowResult) => {
        if (escrowResult?.data?.data?.escrow_number) {
          setEscrowNumber(escrowResult?.data?.data?.escrow_number);
          dispatch(notificationSuccess(escrowResult?.data?.message));
          setStep(step + 1);
        } else {
          dispatch(notificationFail("Something went wrong"));
        }
      })
      .catch((error) => {
        if (typeof error == "string") {
          dispatch(notificationFail(error));
        }
        if (error?.response?.data?.message === "") {
          dispatch(notificationFail("Invalid "));
        }
        if (error?.response?.data?.message) {
          dispatch(notificationFail(error?.response?.data?.message));
        }
      });
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
  };

  const homeBtnHandler = async () => {
    props.onHide();
    navigate("/");
  };

  return (
    <Modal
      {...props}
      dialogClassName="login-modal"
      backdropClassName="login-modal-backdrop"
      aria-labelledby="contained-modal"
      backdrop="static"
      keyboard={false}
      centered
    >
      <Form onSubmit={formSubmitHandler}>
        {step === 1 && (
          <>
            <Modal.Header>
              <Modal.Title>Create escrow</Modal.Title>
            </Modal.Header>
            <Modal.Body className="pt-3">
              <p className="mb-4">
                Define yourself, are you a buyer or a seller?
              </p>
              <Form.Group
                controlId="escrowType"
                onChange={(e) => inputChangeHandler(e)}
              >
                <Row>
                  <Col md="6">
                    <Form.Check
                      className="yourself-option"
                      label="Buyer"
                      name="radiooption"
                      type="radio"
                      id="radiooption1"
                      checked={escrowType === "buyer"}
                      value={"buyer"}
                      readOnly
                    />
                  </Col>
                  <Col md="6">
                    <Form.Check
                      className="yourself-option"
                      label="Seller"
                      name="radiooption"
                      type="radio"
                      id="radiooption2"
                      checked={escrowType === "seller"}
                      value={"seller"}
                      readOnly
                    />
                  </Col>
                </Row>
              </Form.Group>
              <div className="form-action-group">
                <Button variant="primary" onClick={handleNext}>
                  Continue
                </Button>
                <Button variant="secondary" onClick={props.onHide}>
                  Cancel
                </Button>
              </div>
            </Modal.Body>
          </>
        )}
        {step === 2 && (
          <>
            <Modal.Header>
              <Modal.Title>
                Im {escrowType == "buyer" ? "Buyer" : "Seller"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="pt-3">
              <p className="mb-4">
                Define how customers open your offers, choose fixed if you have
                a specific price or let them choose with flexible.
              </p>
              <h5 className="mb-4">Fixed</h5>
              <Row>
                <Col md="6">
                  <Form.Group className="form-group within-focus">
                    <Form.Label>Price</Form.Label>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        type="text"
                        name="price"
                        placeholder="1"
                        onChange={inputChangeHandler}
                        value={price}
                      />
                      <div className="currency-type">
                        <span className="currency-flag"></span>USD
                      </div>
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <h5 className="mt-2 mb-4">Flexible</h5>
              <Row className="gx-3">
                <Col md="6">
                  <Form.Group className="form-group within-focus">
                    <Form.Label>min</Form.Label>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        type="text"
                        placeholder="5"
                        name="minPrice"
                        onChange={inputChangeHandler}
                        value={minPrice}
                      />
                      <div className="currency-type">
                        <span className="currency-flag"></span>USD
                      </div>
                    </div>
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group className="form-group within-focus">
                    <Form.Label>max</Form.Label>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        type="text"
                        placeholder="100"
                        name="maxPrice"
                        onChange={inputChangeHandler}
                        value={maxPrice}
                      />
                      <div className="currency-type">
                        <span className="currency-flag"></span>USD
                      </div>
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Text>Example: 5 USD - 100 USD</Form.Text>
              <div className="form-action-group">
                <Button variant="primary" onClick={handleNext}>
                  Continue
                </Button>
                <Button variant="secondary" onClick={handleBack}>
                  Back
                </Button>
              </div>
            </Modal.Body>
          </>
        )}
        {step === 3 && (
          <>
            <Modal.Header>
              <Modal.Title>Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body className="pt-2">
              <p className="mb-4">
                Tell us what you are selling and the description that best
                characterizes the nature of that sale and provide the time you
                will take to provide it.
              </p>
              <Row className="gx-3">
                <Col md="6">
                  <Form.Group className="form-group">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      name="category"
                      aria-label="High-value items"
                      onChange={inputChangeHandler}
                    >
                      <option value="high_value_items">High-value items</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group className="form-group">
                    <Form.Label>Object</Form.Label>
                    <Form.Select
                      name="object"
                      aria-label="Jewelery"
                      onChange={inputChangeHandler}
                    >
                      <option value="jewelery">Jewelery</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="form-group mt-2">
                <Form.Label>Description of Transaction</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  onChange={inputChangeHandler}
                  placeholder="Description of Transaction"
                  value={description}
                />
              </Form.Group>
              <h5 className="my-4">Time constraints</h5>
              <Form.Group className="form-group">
                <Form.Label>Process time</Form.Label>
                <Form.Select
                  aria-label="24 Hours"
                  name="processTime"
                  onChange={inputChangeHandler}
                >
                  <option value="24_hours">24 Hours</option>
                </Form.Select>
              </Form.Group>
              <div className="form-action-group">
                <Button variant="primary" onClick={submitHandler}>
                  Create
                </Button>
                <Button variant="secondary" onClick={handleBack}>
                  Back
                </Button>
              </div>
            </Modal.Body>
          </>
        )}
        {step === 4 && (
          <>
            <Modal.Header>
              <Modal.Title>Escrow has been created</Modal.Title>
            </Modal.Header>
            <Modal.Body className="pt-2">
              <p className="mb-4">
                Your secure link has been created, share it with your buyer to
                start trading with the decentralized escrow.
              </p>
              <Form.Group className="form-group">
                <Form.Label>Your Escrow Link</Form.Label>
                <Form.Control
                  ref={escrowLinkRef}
                  type="text"
                  value={`app.middn.com/join-transaction/${escrowNumber}`}
                  readOnly
                />
              </Form.Group>
              <div className="form-action-group">
                <Button variant="primary" onClick={copyToClipboard}>
                  Copy link
                </Button>
                <Button variant="secondary" onClick={homeBtnHandler}>
                  Back home
                </Button>
              </div>
            </Modal.Body>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default EditEscrowView;
