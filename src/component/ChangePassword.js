import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { EyeClosedIcon, EyeIcon } from "./SVGIcon";

export const ChangePasswordView = (props) => {
    const [isVisibleOldPass, setVisibleOldPass] = useState(false);
    const toggleOldPass = () => {
        setVisibleOldPass(!isVisibleOldPass);
    };
    const [isVisibleNewPass, setVisibleNewPass] = useState(false);
    const toggleNewPass = () => {
        setVisibleNewPass(!isVisibleNewPass);
    };
    const [isVisibleConfirmPass, setVisibleConfirmPass] = useState(false);
    const toggleConfirmPass = () => {
        setVisibleConfirmPass(!isVisibleConfirmPass);
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
            <Modal.Body>
                <h4>Change Password</h4>
                <p>Services will be disabled for 24 hours after you make this change to protect your account.</p>
                <Form>
                    <Form.Group className="form-group mt-4">
                        <Form.Label>Old Password</Form.Label>
                        <div className="d-flex justify-content-between align-items-center">
                            <Form.Control type={!isVisibleOldPass ? "password" : "text"} placeholder="Enter old password" />
                            <span className="input-icon" onClick={toggleOldPass}>
                                {isVisibleOldPass ? <EyeIcon width="24" height="24" /> : <EyeClosedIcon width="24" height="24" />}
                            </span>
                        </div>
                    </Form.Group>
                    <Form.Group className="form-group mt-4">
                        <Form.Label>New Password</Form.Label>
                        <div className="d-flex justify-content-between align-items-center">
                            <Form.Control type={!isVisibleNewPass ? "password" : "text"} placeholder="Enter new password" />
                            <span className="input-icon" onClick={toggleNewPass}>
                                {isVisibleNewPass ? <EyeIcon width="24" height="24" /> : <EyeClosedIcon width="24" height="24" />}
                            </span>
                        </div>
                    </Form.Group>
                    <Form.Group className="form-group mt-4">
                        <Form.Label>Confirm New Password</Form.Label>
                        <div className="d-flex justify-content-between align-items-center">
                            <Form.Control type={!isVisibleConfirmPass ? "password" : "text"} placeholder="Enter new password  again" />
                            <span className="input-icon" onClick={toggleConfirmPass}>
                                {isVisibleConfirmPass ? <EyeIcon width="24" height="24" /> : <EyeClosedIcon width="24" height="24" />}
                            </span>
                        </div>
                    </Form.Group>
                    <div className="form-action-group">
                        <Button variant="primary">Confirm</Button>
                        <Button variant="secondary" onClick={props.onHide}>
                            Cancel
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ChangePasswordView;
