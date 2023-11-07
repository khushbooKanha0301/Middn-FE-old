import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { CheckmarkIcon } from "./SVGIcon";
import { useDispatch } from "react-redux";
import {
  notificationFail,
  notificationSuccess,
} from "../store/slices/notificationSlice";
import jwtAxios from "../service/jwtAxios";

export const ReportUserView = (props) => {
  const [reason, setReason] = useState(null);
  const dispatch = useDispatch();
  const reasonChangeHandler = (e) => {
    setReason(e.target.value);
  };
  useEffect(() => {
    if (props.show) {
      setReason("");
    }
  }, [props.show]);
  const submitHandler = async () => {
    if (!reason || reason == "") {
      dispatch(notificationFail("Please select any one reason"));
    } else {
      console.log(reason);
      console.log(props?.userAddress);
      const reqData = {
        to_report_user: props?.userAddress,
        reason,
      };
      await jwtAxios
        .post(`/users/reportUser`, reqData)
        .then((result) => {
          if (result?.status) {
            dispatch(notificationSuccess(result?.data?.message));
            props.onHide();
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
          props.onHide();
        });
    }
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
      <Modal.Header closeButton>
        <Modal.Title>Report User</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-4">
        <h4>Report this user</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <Form className="mt-4">
          <Form.Group className="custom-input" onChange={reasonChangeHandler}>
            <div
              className={`top-form-check ${
                reason === "Test 1" ? "active" : ""
              }`}
            >
              <Form.Check
                value="Test 1"
                label="Test 1"
                name="group1"
                type="radio"
                checked={reason == "Test 1"}
                id="reasonoption1"
                readOnly
              />
              <span className="checkmark"></span>
            </div>
            <div
              className={`top-form-check ${
                reason === "Test 2" ? "active" : ""
              }`}
            >
              <Form.Check
                value="Test 2"
                readOnly
                label="Test 2"
                name="group1"
                type="radio"
                checked={reason == "Test 2"}
                id="reasonoption2"
              />
              <span className="checkmark"></span>
            </div>
            <div
              className={`top-form-check ${
                reason === "Test 3" ? "active" : ""
              }`}
            >
              <Form.Check
                value="Test 3"
                readOnly
                label="Test 3"
                name="group1"
                type="radio"
                checked={reason == "Test 3"}
                id="reasonoption3"
              />
              <span className="checkmark"></span>
            </div>
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label className="mb-1">Other reason</Form.Label>
            <Form.Control
              type="text"
              placeholder="Other reason"
              onChange={reasonChangeHandler}
              value={
                ["Test 1", "Test 2", "Test 3"].includes(reason) ? "" : reason
              }
            />
          </Form.Group>
          <div className="form-action-group">
            <Button variant="primary" onClick={submitHandler}>
              Submit
            </Button>
            <Button variant="secondary" onClick={props.onHide}>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ReportUserView;
