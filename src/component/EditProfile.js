import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { CameraIcon } from "./SVGIcon";
import { useSelector } from "react-redux";
import {
  userDetails,
  userGetData,
  userGetFullDetails,
} from "../store/slices/AuthSlice";

import "react-toastify/dist/ReactToastify.css";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import jwtAxios from "../service/jwtAxios";
import {
  notificationFail,
  notificationSuccess,
} from "../store/slices/notificationSlice";
import {
  getDatabase,
  ref,
  set,
  onValue,
  update,
  get,
  child,
} from "firebase/database";
import { database, firebaseMessages } from "../layout/chat/config";
import {
  converImageToBase64,
  sendMessage,
} from "../layout/chat/firebaseConfig";

function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

export const EditProfileView = (props) => {
  const dispatch = useDispatch();

  const [country, setCountry] = useState();
  const [errFname, setErrFname] = useState(null);
  const [errLname, setErrLname] = useState(null);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [bio, setBio] = useState("");
  const [profile, setProfile] = useState("");
  const [isProfileDeleted,setIsProfileDeleted] = useState(false);
  const [profileUrl, setProfileUrl] = useState("");
  const [location, setLocation] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const userData = useSelector(userDetails);
  const userDetailsAll = useSelector(userGetFullDetails);
  const countryDetails = useSelector((state) => state.auth.countryDetails);
  useEffect(() => {
    if (countryDetails) {
      setCountry(countryDetails?.country_name);
      setCountryCode(countryDetails?.country_code);
    }
  }, [countryDetails]);

  useEffect(() => {
    if (userDetailsAll) {
      let user = userDetailsAll;
      setFname(user?.fname_alias ? user?.fname_alias : "");
      setLname(user?.lname_alias ? user?.lname_alias : "");
      setLocation(user?.location ? user?.location : null);
      setBio(user?.bio ? user?.bio : "");
      setProfile(user?.profile ? user?.profile : null);
      setImageSrc(user?.imageUrl ? user?.imageUrl : null);
    }
  }, [userDetailsAll]);

  const onChange = (e) => {
    if (e.target.name == "fname") {
      setFname(e.target.value);
    } else if (e.target.name == "lname") {
      setLname(e.target.value);
    } else if (e.target.name == "bio") {
      setBio(e.target.value);
    } else if (e.target.name == "profile") {
      setIsProfileDeleted(false);
      const file = e.target.files[0];
      const reader = new FileReader();
      if (file && !file.type.includes("image/")) {
        dispatch(notificationFail("Please select a valid image file"));
        return;
      }
      reader.onload = () => {
        setImageSrc(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }

      setProfile(e.target.files[0]);
    }
  };

  const onDeleteImage = async (e) => {
    e.preventDefault();
    setImageSrc("");
    setProfileUrl("");
    setProfile("");
    setIsProfileDeleted(true);
  };

  const submitHandler = async () => {
    setLoading(true);

    if (!fname || !lname) {
      dispatch(notificationFail("Please Enter First & Last name"));
    }
    if (!errFname && !errLname && fname && lname) {
      let formSubmit = {
        fname_alias: fname,
        lname_alias: lname,
        bio: bio,
        profile: profile,
      };

      if (typeof profile == "string") {
        delete formSubmit.profile;
      }
      if(isProfileDeleted)
      {
        formSubmit.is_profile_deleted = true;
      }

      await jwtAxios
        .put(`/users`, formSubmit, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async (response) => {
          if (response?.status === 200) {
            dispatch(userGetData(userData.userid)).unwrap();
            let file = {};
            let updateArr = {};
            if (typeof profile != "string" && profile) {
              let base64 = await converImageToBase64(profile);
              file = {
                name: profile?.name,
                size: profile?.size,
                type: profile?.type,
                url: base64,
              };
              updateArr.imageUrl = `data:${file.type};base64,${file?.url}`;
            }
            if (fname) {
              updateArr.fname_alias = fname;
            }
            if (lname) {
              updateArr.lname_alias = lname;
            }

            const dbRef = ref(database);
            get(
              child(dbRef, firebaseMessages?.CHAT_USERS + userData?.account)
            ).then((snapshot) => {
              const data = snapshot.val();
              if (snapshot.exists()) {
                update(
                  ref(
                    database,
                    firebaseMessages.CHAT_USERS + userData?.account
                  ),
                  updateArr
                );
              }
            });

            dispatch(notificationSuccess(response?.data.message));
            props.onHide();
          }
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
  };
  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const flagUrl = countryCode
    ? `https://flagcdn.com/h40/${countryCode?.toLowerCase()}.png`
    : "";

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
        <h4>Edit Profile</h4>
        <Form className="mt-4">
          <Form.Group
            controlId="formFile"
            className="file-uploader"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Form.Label>
              <img
                src={
                  imageSrc
                    ? imageSrc
                    : profileUrl || require("../content/images/avatar.png")
                }
                id="output"
                alt={imageSrc || profile ? profile : "No Image"}
                width="135"
                height="135"
              />
              <CameraIcon width="16" height="15" />
              {profile && (
                <FaTrashAlt
                  className="remove-pro"
                  onClick={(e) => onDeleteImage(e)}
                />
              )}
            </Form.Label>
            <input
              type="file"
              className="custom-file-input"
              id="inputGroupFile01"
            />

            <Form.Control
              type="file"
              name="profile"
              accept="image/*"
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label className="mb-1">First name (required)</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              name="fname"
              value={fname}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label className="mb-1">Last name (required)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              name="lname"
              value={lname}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label className="mb-1">Location</Form.Label>
            <div className="input-flag">
              {flagUrl ? (
                <img
                  src={flagUrl}
                  alt="Flag"
                  style={{ weight: "20px", height: "20px" }}
                />
              ) : (
                "No Flag"
              )}
              <Form.Label className="form-control">{country}</Form.Label>
            </div>
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label className="mb-1">Bio</Form.Label>
            <Form.Control
              type="text"
              placeholder="Add Your Experience....."
              name="bio"
              value={bio}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <p className="help-text">
            Any details such as age, occupation or city etc.
            <br />
            Example: 21 y.o. crypto trader
          </p>
          <div className="form-action-group">
            <Button
              variant="primary"
              disabled={isLoading}
              onClick={!isLoading ? submitHandler : null}
            >
              {isLoading ? "Loading…" : "Submit"}
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

export default EditProfileView;
