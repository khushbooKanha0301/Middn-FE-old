import React, { useEffect, useState } from "react";
import { Navbar, Nav, Button, Card } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  EscrowIcon,
  HomeIcon,
  QuestionIcon,
  TradeHistoryIcon,
  PlusIcon,
} from "./SVGIcon";
import Highcharts from "highcharts/highstock";
import { userDetails } from "../store/slices/AuthSlice";
import { useSelector } from "react-redux";

const activeTrader = [
  {
    id: "1",
    name: "Dylan Hodges",
    img: require("../content/images/pic-1.png"),
  },
  {
    id: "2",
    name: "Dylan Hodges",
    img: require("../content/images/pic-1.png"),
  },
  {
    id: "3",
    name: "Dylan Hodges",
    img: require("../content/images/pic-1.png"),
  },
  {
    id: "4",
    name: "Dylan Hodges",
    img: require("../content/images/pic-1.png"),
  },
  {
    id: "5",
    name: "Dylan Hodges",
    img: require("../content/images/pic-1.png"),
  },
  {
    id: "6",
    name: "Dylan Hodges",
    img: require("../content/images/pic-1.png"),
  },
  {
    id: "7",
    name: "Dylan Hodges",
    img: require("../content/images/pic-1.png"),
  },
  {
    id: "8",
    name: "Dylan Hodges",
    img: require("../content/images/pic-1.png"),
  },
];

function getHeight() {
  return document.documentElement.clientHeight;
}

function getCount(height) {
  let userDisplayCal = 1;

  if (height > 850) {
    userDisplayCal = 3;
  } else if (height > 700) {
    userDisplayCal = 2;
  }

  return userDisplayCal;
}

let divSize = 0;

export const Sidebar = (props) => {
  let height = getHeight();
  let userDisplayCal = getCount(height);
  const location = useLocation();
  const [activeKey, setActiveKey] = useState();
  const acAddress = useSelector(userDetails);

  const [userDisplayCount, setUserDisplayCount] =
    React.useState(userDisplayCal);
  const [userList, setUserList] = React.useState(
    activeTrader.filter((item, index) => index < userDisplayCount)
  );

  const handleResize = () => {
    let height = getHeight();
    let userDisplayCal = getCount(height);

    divSize = height;

    setTimeout(() => {
      if (divSize === height) {
        setUserDisplayCount(userDisplayCal);
        setUserList(
          activeTrader.filter((item, index) => index < userDisplayCal)
        );
      }
    }, 500);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
  });
  const loadMoreData = () => {
    setUserList(activeTrader);
  };

  const handleResizePage = () => {
    if (Highcharts.charts) {
      Highcharts.charts.map((val) => {
        if (val) {
          setTimeout(() => val.reflow(), 200);
        }
        return val;
      });
    }
  };

  useEffect(() => {
    // Update the active key based on the current URL
    setActiveKey(location.pathname);
    if(props.isResponsive)
    {
      props.setIsOpen(false);
    }
  }, [location,props.isResponsive]);

  return (
    <div className="sidebar">
      <div className="d-flex nav-header">
        <Navbar.Brand className="menu-hide" as={Link} to="/">
          <img src={require("../content/images/logo.png")} alt="Middn" />
        </Navbar.Brand>
        <Navbar.Toggle
          onClick={() => {
            props.clickHandler();
            handleResizePage();
          }}
          aria-controls="basic-navbar-nav"
        />
      </div>
      <div className="sidebar-scroll">
        <PerfectScrollbar options={{ suppressScrollX: true }}>
          <div className="nav-title font-family-inter">Middn App</div>
          <Nav as="ul" activeKey={activeKey}>
            <Nav.Item as="li">
              <Nav.Link
                as={Link}
                eventKey="/"
                to="/"
                className={activeKey === "/" && "active"}
              >
                <HomeIcon width="24" height="24" />{" "}
                <span className="menu-hide">Home</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link
                as={Link}
                eventKey="escrow"
                to={acAddress.authToken && "/escrow"}
                onClick={!acAddress.authToken ? props.setModalShow :undefined}
                className={activeKey === "/escrow" && "active"}
              >
                <EscrowIcon width="24" height="24" />{" "}
                <span className="menu-hide">Escrow</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link
                as={Link}
                eventKey="trade"
                to={acAddress.authToken && "/trade"}
                onClick={!acAddress.authToken ? props.setModalShow :undefined}
                className={activeKey === "/trade" && "active"}
              >
                <TradeHistoryIcon width="24" height="24" />{" "}
                <span className="menu-hide">Trade History</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link
                as={Link}
                eventKey="help"
                to={acAddress.authToken && "/help"}
                onClick={!acAddress.authToken ? props.setModalShow :undefined}
                className={activeKey === "/help" && "active"}
              >
                <QuestionIcon width="24" height="24" />{" "}
                <span className="menu-hide">Help</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <div className="divider"></div>
          <div className="nav-title">Active Trader</div>
          {/* <ul className="active-trader">
            {userList.map((item, index) => (
            
              <li key={index}>
                <div>
                  <img
                    src={item.img}
                    alt={item.name}
                  />
                  <span className="menu-hide">{item.name}</span>
                </div>
                <i className="dot"></i>
              </li>
            ))}
          </ul> */}
          {/* {activeTrader.length === userList.length ? ( */}
          <Button variant="link" className="btn-create-escrow">
            <span className="create-new">
              <PlusIcon width="14" height="14" />
            </span>{" "}
            <span className="menu-hide">Create Escrow</span>
          </Button>
          {/* ) : (
            <Button variant="link" onClick={loadMoreData}>
              <span className="load-arrow"></span>{" "}
              <span className="menu-hide">Load more</span>
            </Button>
          )} */}
        </PerfectScrollbar>
      </div>
      <Card className="cards-dark menu-hide">
        <Card.Body>
          <Card.Title>Contact us</Card.Title>
          <Card.Text>
            For all inquiries, please email us using the form below
          </Card.Text>
          <Button variant="primary">Contact us</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Sidebar;
