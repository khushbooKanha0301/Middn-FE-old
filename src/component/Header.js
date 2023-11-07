import { useEffect, useState } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { userDetails, userGetFullDetails } from "../store/slices/AuthSlice";

import { onValue, ref } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { database, firebaseMessages } from "../layout/chat/config";
import { hideAddress } from "../utils";
import {
  BellIcon,
  LoginIcon,
  LogoutIcon,
  NotificationIcon,
  SettingIcon,
  UserIcon,
} from "./SVGIcon";

export const Header = (props) => {
  const dispatch = useDispatch();
  const [position, setPosition] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [messageCount, setMessageCount] = useState(0);
  const acAddress = useSelector(userDetails);
  let usergetdata = useSelector(userGetFullDetails);
  const userDetailsAll = useSelector(userGetFullDetails);

  useEffect(() => {
    if (acAddress.authToken) {
      findFirebaseUserList();
    }
  }, []);

  let addressLine = "";
  if(acAddress.account === "Connect Wallet" && userDetailsAll === undefined)
  {
    addressLine = "Connect Wallet";
  }else if(acAddress.account !== "Connect Wallet" && userDetailsAll === undefined)
  {
    addressLine = "";
  }else if(acAddress.account !== "Connect Wallet" && userDetailsAll?.is_2FA_login_verified !== false && (acAddress.account == userDetailsAll?.wallet_address))
  {
    addressLine = hideAddress(acAddress?.account,5);
  }else{
    addressLine = "Connect Wallet";
  }

  const findFirebaseUserList = async () => {
    if (acAddress.authToken) {
      const starCountRef = ref(database, firebaseMessages.CHAT_ROOM);
      onValue(starCountRef, (snapshot) => {
        if (snapshot.val()) {
          const allunreadCount = Object.keys(snapshot.val())
            .filter((element) => {
              return element.includes(acAddress?.account);
            })
            ?.filter((object) => {
              var name = acAddress?.account;
              return (
                name &&
                snapshot &&
                snapshot.val() &&
                snapshot.val()[object] &&
                snapshot.val()[object]?.unreadcount &&
                snapshot.val()[object]?.unreadcount[name] > 0
              );
            });

          setMessageCount(allunreadCount.length);
        }
      });
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      let moving = window.pageYOffset;
      setVisible(position > moving);
      setPosition(moving);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const cls = visible ? "visible" : "hidden";
  return (
    <div className={`header d-flex ${cls}`}>
      <Navbar.Toggle
        onClick={props.clickHandler}
        className="d-block d-md-none"
        aria-controls="basic-navbar-nav"
      />
      <Nav className="ms-auto" as="ul">
        {(acAddress.authToken && (addressLine != "" && addressLine != "Connect Wallet")) && (
          <>
            <Nav.Item as="li">
              <Nav.Link as={Link} to="/chat">
                <NotificationIcon width="26" height="24" />
                {messageCount > 0 && (
                  <span className="notification-badge">{messageCount}</span>
                )}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link as={Link} to="/notification">
                <BellIcon width="20" height="22" />
              </Nav.Link>
            </Nav.Item>
          </>
        )}
        <Nav.Item
          as="li"
          onClick={acAddress.authToken ? null : props.clickModalHandler}
          className="login-menu"
        >
          {acAddress && addressLine != "" && (
            <span className="user-name d-none d-md-block">
              {addressLine}
            </span>
          )}
          {acAddress && addressLine != "" && (
          <span className="login-btn d-flex d-md-none text-white">
              {addressLine}
          </span>
          )}
        </Nav.Item>
        {(acAddress &&
          acAddress?.authToken &&
          userDetailsAll?.is_2FA_login_verified === true && (acAddress.account == userDetailsAll.wallet_address)) && (
            <NavDropdown
              as="li"
              title={
                <img
                  className="rounded-circle"
                  style={{ width: "48px", height: "48px" }}
                  src={
                    usergetdata?.imageUrl
                      ? usergetdata?.imageUrl
                      : require("../content/images/avatar.png")
                  }
                  alt="No Profile"
                />
              }
              id="nav-dropdown"
            >
              <NavDropdown.Item as={Link} to={`/profile/${acAddress.account}`}>
                <UserIcon width="18" height="18" />
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/settings">
                <SettingIcon width="18" height="18" />
                Account settings
              </NavDropdown.Item>
              <NavDropdown.Item onClick={props.signOut}>
                <LogoutIcon width="18" height="18" />
                Sign out
              </NavDropdown.Item>
            </NavDropdown>
          )}
      </Nav>
    </div>
  );
};

export default Header;
