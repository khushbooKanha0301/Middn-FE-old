import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import RatingPage from "./Ratings";

export const ReviewTransactionView = (props) => {
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
        <Modal.Title>Review</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-4">
        <h4>Write a review</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="d-flex justify-content-center">
          <RatingPage />
        </div>
        <Form className="mt-4">
          <Form.Group className="form-group">
            <Form.Label className="mb-1">Review</Form.Label>
            <Form.Control type="text" placeholder="Descriptions" />
          </Form.Group>
          <Form.Group className="custom-input">
            <div className={`top-form-check active`}>
              <Form.Check
                value="Hidden your name"
                label="Hidden your name"
                name="group1"
                type="radio"
                checked={true}
                id="hide_name"
                readOnly
              />
              <span className="checkmark"></span>
            </div>
          </Form.Group>

          <div className="form-action-group">
            <Button variant="primary">Submit</Button>
            <Button variant="secondary" onClick={props.onHide}>
              Go home
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ReviewTransactionView;
