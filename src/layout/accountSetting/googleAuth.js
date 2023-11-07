import React, { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import googleAuth from "../../content/images/google-authenticator.png";
import TwoFactorSetup from "../../component/TwoFactorSetup";
import { useDispatch, useSelector } from "react-redux";
import { userGetData, userGetFullDetails } from "../../store/slices/AuthSlice";
import jwtAxios from "../../service/jwtAxios";
import { notificationFail, notificationSuccess } from "../../store/slices/notificationSlice";
import Swal from "sweetalert2/src/sweetalert2.js";

export const GoogleAuth = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userData = useSelector(userGetFullDetails);
  const [is2FAEnabled, setIs2FAEnabled] = useState(userData?.is_2FA_enabled);
  const dispatch = useDispatch();
  const [secret, setSecret] = useState("");
  const [qrCodeUrl, setQRCodeUrl] = useState("");
  useEffect(() => {
    setIs2FAEnabled(userData?.is_2FA_enabled);
  }, [userData?.is_2FA_enabled]);

  const openModal = async () => {
    await jwtAxios.get("users/generate2FASecret").then((res) => {
      setSecret(res.data.secret);
      setQRCodeUrl(`otpauth://totp/Middn-APP?secret=${res.data.secret}`);
      setIsModalOpen(true);
    }).catch((error) => {
      if(typeof error == "string")
      {
        dispatch(notificationFail(error));
      }else{
        dispatch(notificationFail(error?.response?.data?.message));
      }
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const disable2FA = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to deactive Google 2FA?",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "#808080",
      confirmButtonText: "Deactive",
      customClass:{
        popup:"suspend"
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        await jwtAxios
          .get("/users/disable2FA")
          .then((res) => {
            dispatch(notificationSuccess(res?.data?.message));
            setIs2FAEnabled(false);
            dispatch(userGetData(userGetData.userid)).unwrap();
          })
          .catch((error) => {
            if(typeof error == "string")
            {
              dispatch(notificationFail(error));
            }else{
              dispatch(notificationFail(error?.response?.data?.message));
            }
          });
      }
    });
  };
  return (
    <Card className="cards-dark mb-32">
      <Card.Body>
        <Card.Title as="h2">2FA</Card.Title>
        <div
          className="ul-button-row
      "
        >
          <ul className="two-fa mb-3">
            <li>
              <div className="two-fa-step">
                <img
                  src={require("../../content/images/google-authenticator.png")}
                  alt="Google Authentication"
                />
                <h4>Google Authentication</h4>
                {!is2FAEnabled ? (
                  <p>Click on Active to Start Google 2FA</p>
                ) : (
                  <p>You have successfully activated Google 2FA</p>
                )}
              </div>
              <TwoFactorSetup
                isOpen={isModalOpen}
                onClose={closeModal}
                setIs2FAEnabled={setIs2FAEnabled}
                secret={secret}
                qrCodeUrl={qrCodeUrl}
              />
            </li>
          </ul>

          <div className="button-row">
            {is2FAEnabled === null ? (
              ""
            ) : is2FAEnabled === false ? (
              <Button variant="primary" onClick={openModal}>
                Active
              </Button>
            ) : (
              <Button variant="danger" onClick={disable2FA}>
                Deactive
              </Button>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default GoogleAuth;
